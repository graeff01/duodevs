import { useState, useEffect } from 'react';
import Stax from '../components/Stax';
import Confetti from '../components/Confetti';

function trim(str, max = 34) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max) + '…' : str;
}

export default function CompletionScreen({ goTo, gs }) {
  const lesson   = gs.lastLesson ?? { results: [], earned: 0, nodeLabel: 'Lição', accuracy: 0 };
  const { results, earned, nodeLabel, accuracy } = lesson;

  const correct  = results.filter(r => r.correct);
  const wrong    = results.filter(r => !r.correct);
  const isPerfect = wrong.length === 0 && results.length > 0;
  const coins    = Math.round((earned || 0) / 2);

  const [xpDisplay, setXpDisplay] = useState(0);
  useEffect(() => {
    const target = earned || 0;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      const ease = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setXpDisplay(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [earned]);

  const mood = isPerfect ? 'celebrating' : accuracy >= 60 ? 'excited' : 'happy';
  const title = isPerfect ? 'Perfeito! 🏆' : accuracy >= 60 ? 'Muito bem! 🎊' : 'Continue! 💪';
  const titleSub = isPerfect
    ? 'Você acertou tudo nessa lição!'
    : accuracy >= 60
    ? 'Bom trabalho, revise os erros abaixo'
    : 'Pratique mais para dominar esse tópico';

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(160deg,#12102a,#1d1065)',
      position: 'relative', overflow: 'hidden',
    }}>
      <Confetti />

      <div className="scroll" style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '28px 18px 32px', gap: 14, position: 'relative', zIndex: 1,
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', animation: 'fadeUp .5s ease' }}>
          <Stax size={76} mood={mood} float />
          <div style={{ fontSize: 25, fontWeight: 800, color: 'white', marginTop: 12, marginBottom: 2 }}>{title}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>{nodeLabel} · {titleSub}</div>
        </div>

        {/* ── Stats ── */}
        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          {[
            { icon: '⚡', label: 'XP Ganho',  val: `+${xpDisplay}`, color: '#818cf8' },
            { icon: '🪙', label: 'Moedas',    val: `+${coins}`,      color: '#fbbf24' },
            { icon: '⭐', label: 'Precisão',  val: `${accuracy}%`,   color: accuracy === 100 ? '#34d399' : accuracy >= 60 ? '#fbbf24' : '#f87171' },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, background: 'rgba(255,255,255,.07)',
              borderRadius: 16, padding: '13px 6px', textAlign: 'center',
              border: '1px solid rgba(255,255,255,.1)',
            }}>
              <div style={{ fontSize: 19, marginBottom: 3 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.38)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Perfect badge ── */}
        {isPerfect && (
          <div style={{
            width: '100%', background: 'rgba(245,158,11,.12)', borderRadius: 18,
            padding: '14px 18px', border: '1px solid rgba(245,158,11,.25)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 28 }}>🌟</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#fcd34d' }}>100% de precisão!</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 2 }}>
                Você dominou todos os conceitos. Incrível!
              </div>
            </div>
          </div>
        )}

        {/* ── Correct answers ── */}
        {correct.length > 0 && (
          <div style={{
            width: '100%', background: 'rgba(16,185,129,.1)', borderRadius: 18,
            padding: '14px 16px', border: '1px solid rgba(16,185,129,.2)',
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#6ee7b7', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>✅</span>
              Você dominou <span style={{ background: 'rgba(16,185,129,.2)', borderRadius: 6, padding: '1px 7px', fontSize: 11 }}>{correct.length}/{results.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {correct.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                    background: 'rgba(16,185,129,.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: '#34d399',
                  }}>✓</div>
                  <div style={{
                    fontSize: 12, color: '#a7f3d0', lineHeight: 1.3,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{trim(r.correctOpt)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Wrong answers ── */}
        {wrong.length > 0 && (
          <div style={{
            width: '100%', background: 'rgba(239,68,68,.08)', borderRadius: 18,
            padding: '14px 16px', border: '1px solid rgba(239,68,68,.2)',
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#fca5a5', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>🎯</span>
              Foque nisso <span style={{ background: 'rgba(239,68,68,.2)', borderRadius: 6, padding: '1px 7px', fontSize: 11 }}>
                {wrong.length} {wrong.length === 1 ? 'erro' : 'erros'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {wrong.map((r, i) => (
                <div key={i} style={{
                  background: 'rgba(239,68,68,.1)', borderRadius: 12,
                  padding: '10px 12px', border: '1px solid rgba(239,68,68,.12)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 10, color: '#f87171', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✗ Você:</span>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: '#fca5a5',
                      fontFamily: "'JetBrains Mono', monospace",
                      background: 'rgba(239,68,68,.22)', borderRadius: 5,
                      padding: '1px 6px', lineHeight: 1.5,
                    }}>{trim(r.selOpt)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <span style={{ fontSize: 10, color: '#6ee7b7', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓ Certo:</span>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: '#6ee7b7',
                      fontFamily: "'JetBrains Mono', monospace",
                      background: 'rgba(16,185,129,.18)', borderRadius: 5,
                      padding: '1px 6px', lineHeight: 1.5,
                    }}>{trim(r.correctOpt)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 12, padding: '10px 12px',
              background: 'rgba(99,102,241,.12)', borderRadius: 10,
              border: '1px solid rgba(99,102,241,.2)',
              fontSize: 11, color: 'rgba(255,255,255,.55)', lineHeight: 1.5,
            }}>
              💡 Revise esses conceitos antes da próxima lição para fixar melhor.
            </div>
          </div>
        )}

        {/* ── Buttons ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 4 }}>
          <button className="btn btn-primary" onClick={() => goTo('map', 'left')}>Ver mapa ✦</button>
          <button className="btn btn-ghost"   onClick={() => goTo('dashboard', 'left')}>Ir para início</button>
        </div>
      </div>
    </div>
  );
}
