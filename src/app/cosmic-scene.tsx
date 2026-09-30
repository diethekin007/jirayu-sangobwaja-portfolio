'use client';

import { useEffect, useRef } from 'react';

const vertex = `attribute vec2 position;
void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `precision mediump float;
uniform vec2 resolution;
uniform float time;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
float fbm(vec2 p){float a=.5,v=0.;for(int i=0;i<5;i++){v+=a*noise(p);p=mat2(.8,-.6,.6,.8)*p*2.05+3.7;a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;
 vec2 p=(uv-vec2(.69,.49))*vec2(resolution.x/resolution.y,1.);
 float t=time*.012;
 vec2 q=vec2(fbm(p*3.+vec2(t,0.)),fbm(p*3.+vec2(4.2,-t)));
 float cloud=fbm(p*4.+q*3.+vec2(t,-t));
 float detail=fbm(p*13.+q*4.-t*.5);
 float arc=abs(length(p*vec2(.78,1.15))-.43);
 float band=exp(-arc*8.)*(.35+cloud*.9);
 float mist=smoothstep(.32,.83,cloud)*band;
 vec3 color=vec3(.012,.016,.052);
 color+=vec3(.12,.035,.26)*band*cloud;
 color+=mix(vec3(.16,.10,.56),vec3(.58,.14,.44),q.x)*mist*(.3+detail);
 color+=vec3(.42,.32,.72)*pow(detail,3.)*band*.9;
 float streak=pow(max(0.,1.-abs(cloud-.55)*9.),5.)*band;
 color+=vec3(.16,.09,.24)*streak;
 color+=vec3(.04,.11,.23)*exp(-length(p-vec2(.42,-.22))*3.);
 color*=.5+.5*smoothstep(0.,.58,uv.x);
 gl_FragColor=vec4(color,1.);
}`;

export default function CosmicScene({ paused }: { paused: boolean }) {
  const cloudRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const cloud = cloudRef.current;
    const canvas = starsRef.current;
    if (!canvas || !cloud) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const gl = cloud.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let program: WebGLProgram | null = null;
    const shaders: WebGLShader[] = [];
    let buffer: WebGLBuffer | null = null;
    if (gl) {
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source); gl.compileShader(shader);
        shaders.push(shader); return shader;
      };
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
      gl.linkProgram(program);
      if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.useProgram(program);
        buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      } else { gl.deleteProgram(program); program = null; }
    }
    const resolution = gl && program ? gl.getUniformLocation(program, 'resolution') : null;
    const clock = gl && program ? gl.getUniformLocation(program, 'time') : null;
    let width = 0, height = 0, elapsed = 0, previous = 0, frame = 0;
    let stars: Array<{ x: number; y: number; r: number; depth: number; phase: number }> = [];
    let dust: Array<{ angle: number; spread: number; phase: number; r: number }> = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const resize = () => {
      width = canvas.clientWidth; height = canvas.clientHeight;
      const ratio = Math.min(devicePixelRatio, 1.5);
      canvas.width = width * ratio; canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      cloud.width = Math.round(width * .65); cloud.height = Math.round(height * .65);
      if (gl) gl.viewport(0, 0, cloud.width, cloud.height);
      // Seeded placement prevents a resize from replacing the entire sky.
      let seed = 19;
      const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      stars = Array.from({ length: width < 700 ? 230 : 640 }, () => ({ x: random(), y: random(), r: random() * 1.1 + .25, depth: random(), phase: random() * 6.28 }));
      dust = Array.from({ length: width < 700 ? 180 : 460 }, () => ({ angle: random() * 6.28, spread: (random() - .5) * .2, phase: random() * 6.28, r: random() * 1.1 + .3 }));
    };
    const move = (event: PointerEvent) => { pointer.tx = (event.clientX / innerWidth - .5) * 16; pointer.ty = (event.clientY / innerHeight - .5) * 12; };
    const draw = (now: number) => {
      // The background can run at 30fps while orbit input stays at display rate.
      if (previous && now - previous < 32) { frame = requestAnimationFrame(draw); return; }
      const dt = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (!pausedRef.current && !document.hidden && !motion.matches) elapsed += dt;
      if (!document.hidden) {
        const seconds = elapsed / 1000;
        if (!motion.matches && !pausedRef.current) {
          pointer.x += (pointer.tx - pointer.x) * .05;
          pointer.y += (pointer.ty - pointer.y) * .05;
        }
        if (gl && program) {
          gl.uniform2f(resolution, cloud.width, cloud.height);
          gl.uniform1f(clock, seconds); gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        context.clearRect(0, 0, width, height);
        stars.forEach((star, index) => {
          const drift = seconds * (1 + star.depth * 3);
          const x = ((star.x * width + drift + pointer.x * star.depth) % (width + 24)) - 12;
          const y = ((star.y * height - drift * .22 + pointer.y * star.depth + height) % height);
          const alpha = .2 + star.depth * .28 + Math.pow((Math.sin(seconds * .7 + star.phase) + 1) * .5, 4) * .45;
          context.fillStyle = `rgba(${index % 4 === 0 ? '183,164,255' : '238,229,255'},${alpha})`;
          context.beginPath(); context.arc(x,y,star.r,0,Math.PI*2); context.fill();
          if (index % 43 === 0) {
            const size = 3 + star.r * 3;
            const glow = context.createRadialGradient(x,y,0,x,y,size*3);
            glow.addColorStop(0,`rgba(218,191,255,${alpha*.4})`); glow.addColorStop(1,'rgba(218,191,255,0)');
            context.fillStyle=glow; context.fillRect(x-size*3,y-size*3,size*6,size*6);
            context.strokeStyle=`rgba(241,224,255,${alpha*.7})`; context.lineWidth=.6;
            context.beginPath(); context.moveTo(x-size,y); context.lineTo(x+size,y); context.moveTo(x,y-size); context.lineTo(x,y+size); context.stroke();
          }
        });
        const mobile = width < 700;
        const cx = width * (mobile ? .5 : .71), cy = height * (mobile ? .63 : .55);
        const radius = Math.min(width * (mobile ? .44 : .26), 410);
        context.save(); context.translate(cx,cy); context.rotate(-.19);
        dust.forEach((particle) => {
          const angle = particle.angle + seconds * .045;
          const r = radius * (1 + particle.spread);
          const x = Math.cos(angle) * r, y = Math.sin(angle) * r * .42;
          const alpha = (.12 + .42 * Math.pow((Math.sin(seconds + particle.phase)+1)*.5,2)) * (.45 + (Math.sin(angle)+1)*.25);
          context.fillStyle=`rgba(219,177,255,${alpha})`;
          context.beginPath(); context.arc(x,y,particle.r,0,6.28); context.fill();
        });
        // A few bright travellers trace the same ellipse as the fine dust.
        for (let i=0;i<3;i++) {
          const angle=seconds*.16+i*2.094;
          const x=Math.cos(angle)*radius,y=Math.sin(angle)*radius*.42;
          const glow=context.createRadialGradient(x,y,0,x,y,18);
          glow.addColorStop(0,'rgba(255,239,255,.9)'); glow.addColorStop(.15,'rgba(219,162,255,.4)'); glow.addColorStop(1,'rgba(180,111,255,0)');
          context.fillStyle=glow; context.fillRect(x-18,y-18,36,36);
        }
        context.restore();
      }
      frame = requestAnimationFrame(draw);
    };
    resize(); frame = requestAnimationFrame(draw);
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    window.addEventListener('pointermove',move,{ passive:true });
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('pointermove',move);
      if (gl) { shaders.forEach(shader=>gl.deleteShader(shader)); if(program) gl.deleteProgram(program); if(buffer) gl.deleteBuffer(buffer); }
    };
  }, []);
  return <div className="cosmic-scene" aria-hidden="true"><canvas ref={cloudRef} className="cosmic-cloud" /><canvas ref={starsRef} className="cosmic-stars" /></div>;
}
