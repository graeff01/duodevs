import { useState, useEffect } from 'react';
import Stax from '../components/Stax';
import Confetti from '../components/Confetti';

export default function CompletionScreen({ goTo, gs }) {
  const [xpDisplay, setXpDisplay] = useState(0);
  const target = 125;

  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      const ease = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setXpDisplay(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(160deg,#12102a,#1d1065)',
      alignItems: 'center', justifyContent: 'center', padding: '32px 24px',
      position: 'relative', gap: 20,
    }}>
      <Confetti />
      <div style={{
        textAlign: 'center', zIndex: 10, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 18, animation: 'fadeUp .5s ease', width: '100%',
      }}>
        <Stax size={88} mood="celebrating" float />

        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 4 }}>Lição Completa! 🎊</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.5)' }}>Arrays · JavaScript</div>
        </div>

        <div style={{
          width: '100%', background: 'rgba(255,255,255,.09)', borderRadius: 22,
          padding: '20px 24px', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,.13)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>XP Ganho</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: '#5b5cf6', lineHeight: 1, animation: 'xpCount .5s cubic-bezier(.34,1.56,.64,1)' }}>
            +{xpDisplay}
          </div>
          <div className="xptrack" style={{ marginTop: 12 }}>
            <div className="xpfill" style={{ width: Math.round((gs.xp / gs.xpMax) * 100) + '%' }} />
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginTop: 6 }}>
            Nível {gs.level} · {gs.xp}/{gs.xpMax} XP
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          {[
            { icon: '🔥', label: 'Streak',  val: `${gs.streak}d` },
            { icon: '🪙', label: 'Moedas',  val: '+60' },
            { icon: '⭐', label: 'Precisão', val: '100%' },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, background: 'rgba(255,255,255,.07)',
              borderRadius: 16, padding: '14px 10px', textAlign: 'center',
              border: '1px solid rgba(255,255,255,.08)',
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <button className="btn btn-primary" onClick={() => goTo('map', 'left')}>Ver mapa ✦</button>
          <button className="btn btn-ghost"   onClick={() => goTo('dashboard', 'left')}>Ir para início</button>
        </div>
      </div>
    </div>
  );
}
