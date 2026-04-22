import { useState, useEffect } from 'react';
import Stax from '../components/Stax';

export default function SplashScreen({ goTo }) {
  const [ph, setPh] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPh(1), 80);
    const t2 = setTimeout(() => setPh(2), 550);
    const t3 = setTimeout(() => setPh(3), 1100);
    const t4 = setTimeout(() => goTo('onboarding', 'right'), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg,#12102a 0%,#1d1065 55%,#0c1835 100%)',
      gap: 28, padding: 40, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', width: '120%', height: '120%',
        background: 'radial-gradient(ellipse at 50% 60%,rgba(91,92,246,.25) 0%,transparent 65%)',
        top: '-10%', left: '-10%', pointerEvents: 'none',
      }} />

      <div style={{
        opacity: ph >= 1 ? 1 : 0,
        transform: ph >= 1 ? 'translateY(0) scale(1)' : 'translateY(50px) scale(.5)',
        transition: 'all .7s cubic-bezier(.34,1.56,.64,1)', zIndex: 1,
      }}>
        <Stax size={110} mood="excited" float={ph >= 2} />
      </div>

      <div style={{
        opacity: ph >= 2 ? 1 : 0, transform: ph >= 2 ? 'translateY(0)' : 'translateY(22px)',
        transition: 'all .55s ease .05s', textAlign: 'center', zIndex: 1,
      }}>
        <div style={{ fontSize: 52, fontWeight: 800, color: 'white', letterSpacing: -2.5, lineHeight: 1 }}>
          Stack<span style={{ color: '#5b5cf6' }}>Up</span>
        </div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,.45)', marginTop: 8, fontWeight: 500 }}>
          Aprenda programação jogando
        </div>
      </div>

      {ph >= 3 && (
        <div style={{ display: 'flex', gap: 7, zIndex: 1, animation: 'fadeIn .4s ease' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: 4,
              background: 'rgba(255,255,255,.25)',
              animation: `pulse2 1.1s ${i * .22}s ease-in-out infinite`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}
