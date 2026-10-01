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
    const assets = Promise.allSettled([
      document.fonts.ready,
      ...images.map(image => image.decode()),
    ]);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    Promise.all([delay(reduced ? 250 : 2200), Promise.race([assets, delay(8000)])]).then(() => {
      if (cancelled) return;
      onReady();
      setLeaving(true);
      exitTimer = setTimeout(() => setVisible(false), reduced ? 0 : 700);
    });
    return () => { cancelled = true; timers.forEach(clearTimeout); clearTimeout(exitTimer); };
  }, [onReady]);

  if (!visible) return null;
  return <div className={`moon-loader ${leaving ? 'moon-loader-leaving' : ''}`} role="status" aria-label="Loading Jirayu portfolio">
    <div className="moon-loader-heading" aria-hidden="true">A little closer to my universe</div>
    <div className="moon-sequence" aria-hidden="true">
      {phases.map((phase, index) => <div className="moon-phase" key={index} style={{ '--phase-delay': `${index * 280}ms` } as CSSProperties}>
        <svg viewBox="0 0 100 100">
          <defs><clipPath id={`moon-lit-${index}`}><path d={moonPath(phase)} /></clipPath></defs>
          <circle cx="50" cy="50" r="48" fill="#171b2c" stroke="#a69eac" strokeOpacity=".22" strokeWidth=".5" />
          <g clipPath={`url(#moon-lit-${index})`}>
            <circle cx="50" cy="50" r="48" fill="#e7e0cf" />
            <ellipse cx="64" cy="31" rx="13" ry="10" fill="#8d8990" opacity=".22" />
            <ellipse cx="40" cy="56" rx="18" ry="23" fill="#aaa4a0" opacity=".23" />
            <circle cx="71" cy="65" r="8" fill="#928d91" opacity=".2" />
            <circle cx="56" cy="80" r="4" fill="none" stroke="#aea8a1" strokeWidth="2" opacity=".5" />
            <circle cx="77" cy="44" r="3" fill="#fff7e4" opacity=".5" />
          </g>
        </svg>
        <span>{'JIRAYU'[index]}</span>
      </div>)}
    </div>
    <div className="moon-loader-caption" aria-hidden="true">Personal portfolio <span> / </span> Jirayu Sangobwaja</div>
  </div>;
}
