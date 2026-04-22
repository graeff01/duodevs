import { useMemo } from 'react';

export default function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * .9,
      color: ['#5b5cf6','#10b981','#f97316','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899'][i % 8],
      size: 6 + Math.random() * 8,
      drift: (Math.random() - .5) * 90,
      round: Math.random() > .5,
    }))
  , []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 60 }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.left}%`, top: -24,
          width: p.size, height: p.round ? p.size : p.size * .65,
          background: p.color, borderRadius: p.round ? '50%' : '2px',
          animation: `confettiFall 2.4s ${p.delay}s cubic-bezier(.25,.46,.45,.94) both`,
          '--drift': `${p.drift}px`,
        }} />
      ))}
    </div>
  );
}
