'use client';

import { useEffect, useState, type CSSProperties } from 'react';

const phases = [0.94, 0.7, 0.3, -0.25, -0.7, -1];
function moonPath(phase: number) {
  const points: string[] = [];
  for (let y = -48; y <= 48; y += 2) {
    const x = Math.sqrt(48 * 48 - y * y);
    points.push(`${50 + x},${50 + y}`);
  }
  for (let y = 48; y >= -48; y -= 2) {
    const x = Math.sqrt(48 * 48 - y * y);
    points.push(`${50 + phase * x},${50 + y}`);
  }
  return `M${points.join(' L')} Z`;
}

export default function MoonLoader({ onReady }: { onReady: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let cancelled = false;
    let exitTimer: ReturnType<typeof setTimeout>;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const delay = (ms: number) => new Promise<void>(resolve => timers.push(setTimeout(resolve, ms)));
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('.hero-portrait img'));
    const lunarTexture = new window.Image();
    lunarTexture.src = '/assets/lunar-surface-nasa.jpg';
    const assets = Promise.allSettled([
      document.fonts.ready,
      lunarTexture.decode(),
      ...images.map(image => image.decode()),
    ]);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    Promise.all([delay(reduced ? 250 : 2600), Promise.race([assets, delay(8000)])]).then(() => {
      if (cancelled) return;
      onReady();
      setLeaving(true);
      exitTimer = setTimeout(() => setVisible(false), reduced ? 0 : 700);
    });
    return () => { cancelled = true; timers.forEach(clearTimeout); clearTimeout(exitTimer); };
  }, [onReady]);

  if (!visible) return null;
  return <div className={`moon-loader ${leaving ? 'moon-loader-leaving' : ''}`} role="status" aria-label="Loading Jirayu portfolio">
    <div className="lunar-orbit lunar-orbit-one" aria-hidden="true" />
    <div className="lunar-orbit lunar-orbit-two" aria-hidden="true" />
    <div className="lunar-starfield" aria-hidden="true">{Array.from({length: 30}, (_, index) => <i key={index} style={{left: `${(index * 37 + 9) % 100}%`, top: `${(index * 53 + 17) % 100}%`, '--star-delay': `${index * -0.37}s`} as CSSProperties} />)}</div>
    <div className="moon-loader-heading" aria-hidden="true"><span>JIRAYU SANGOBWAJA</span><em>A world of my own.</em></div>
    <div className="moon-sequence" aria-hidden="true">
      {phases.map((phase, index) => <div className="moon-phase" key={index} style={{ '--phase-delay': `${index * 280}ms` } as CSSProperties}>
        <svg viewBox="0 0 100 100">
          <defs>
            <clipPath id={`moon-lit-${index}`}><path d={moonPath(phase)} /></clipPath>
            <clipPath id={`moon-disc-${index}`}><circle cx="50" cy="50" r="48" /></clipPath>
            <radialGradient id={`moon-shade-${index}`} cx="70%" cy="35%" r="75%"><stop offset=".4" stopColor="#ede1c4" stopOpacity=".06" /><stop offset="1" stopColor="#080b1d" stopOpacity=".55" /></radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="#171b2c" stroke="#a69eac" strokeOpacity=".22" strokeWidth=".5" />
          <g clipPath={`url(#moon-disc-${index})`}>
            <image href="/assets/lunar-surface-nasa.jpg" x="-6" y="-6" width="112" height="112" opacity=".12" />
            <g clipPath={`url(#moon-lit-${index})`} className="moon-light">
              <circle cx="50" cy="50" r="48" fill="#e7e0cf" />
              <image href="/assets/lunar-surface-nasa.jpg" x="-6" y="-6" width="112" height="112" />
              <circle cx="50" cy="50" r="48" fill={`url(#moon-shade-${index})`} />
            </g>
          </g>
        </svg>
        <span>{'JIRAYU'[index]}</span>
      </div>)}
    </div>
    <div className="moon-loader-caption" aria-hidden="true"><i /> Preparing your view</div>
  </div>;
}

