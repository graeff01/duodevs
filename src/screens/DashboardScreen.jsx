import { useState, useEffect } from 'react';
import Stax from '../components/Stax';
import BottomNav from '../components/BottomNav';
import { useTheme } from '../context/ThemeContext';
import { LANGS } from '../data';

const WEEK_LABELS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
const WEEK_XP     = [55, 80, 35, 100, 70, 90, 0];
const TODAY       = 5;

export default function DashboardScreen({ goTo, gs }) {
  const { t } = useTheme();
  const [xpW,  setXpW]  = useState(0);
  const [bars, setBars] = useState(WEEK_XP.map(() => 0));
  const pct  = Math.round((gs.xp / gs.xpMax) * 100);
  const lang = LANGS.find(l => l.id === gs.language) ?? LANGS[0];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  useEffect(() => {
    const t1 = setTimeout(() => setXpW(pct), 300);
    const t2 = setTimeout(() => setBars(WEEK_XP), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const weekTotal = WEEK_XP.filter(Boolean).reduce((a, b) => a + b, 0);
  const weekDays  = WEEK_XP.filter(Boolean).length;

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: t.bg }}>

      {/* Status bar */}
      <div className="sbar" style={{ color: t.statusBar }}>
        <span className="sbar-time">9:41</span>
        <div style={{ fontSize: 11 }}>▪▪▪ 100%</div>
      </div>

      <div className="scroll" style={{ padding: '8px 16px 16px' }}>

        {/* ═══════════════════════════════
            HEADER — avatar + greeting + badges
        ═══════════════════════════════ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{
              width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
              background: t.isDark ? 'rgba(91,92,246,0.2)' : '#eef2ff',
              border: '2.5px solid #5b5cf6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <Stax size={34} mood="happy" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{greeting} 👋</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: t.text, lineHeight: 1.15 }}>Ana!</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {/* Streak badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'linear-gradient(135deg,#fb923c,#ef4444)',
              borderRadius: 12, padding: '7px 13px',
              boxShadow: '0 4px 14px rgba(239,68,68,0.38)',
            }}>
              <span style={{ fontSize: 16, animation: 'streakFlame 1.2s ease-in-out infinite' }}>🔥</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>{gs.streak}</span>
            </div>
            {/* Coins badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: t.isDark ? 'rgba(245,158,11,0.14)' : '#fffbeb',
              border: `1.5px solid ${t.isDark ? 'rgba(245,158,11,0.3)' : '#fde68a'}`,
              borderRadius: 12, padding: '7px 13px',
            }}>
              <span style={{ fontSize: 15 }}>🪙</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#d97706' }}>{gs.coins}</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════
            XP / LEVEL CARD
        ═══════════════════════════════ */}
        <div style={{
          background: t.surface, borderRadius: 20,
          padding: '16px 18px', marginBottom: 14,
          border: `1px solid ${t.border}`, boxShadow: t.cardShadow,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: t.textMuted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Progresso</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: '#5b5cf6', lineHeight: 1 }}>Nível {gs.level}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>{gs.xp} / {gs.xpMax} XP</div>
              <div style={{ fontSize: 10, color: '#5b5cf6', fontWeight: 700, marginTop: 2 }}>faltam {gs.xpMax - gs.xp} XP</div>
            </div>
          </div>
          <div style={{ height: 10, background: t.isDark ? 'rgba(255,255,255,0.08)' : '#f0efff', borderRadius: 5, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 5,
              background: 'linear-gradient(90deg,#5b5cf6,#7c3aed)',
              width: `${xpW}%`, transition: 'width 1.2s ease',
              boxShadow: '0 0 10px rgba(91,92,246,0.55)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 10, color: t.textMuted }}>Nível {gs.level}</span>
            <span style={{ fontSize: 10, color: t.textMuted }}>Nível {gs.level + 1}</span>
          </div>
        </div>

        {/* ═══════════════════════════════
            HERO CTA — continue lesson
        ═══════════════════════════════ */}
        <div
          onClick={() => goTo('map', 'right')}
          style={{
            background: 'linear-gradient(140deg,#4338ca,#5b5cf6 45%,#7c3aed)',
            borderRadius: 22, padding: '20px 20px 18px', marginBottom: 14,
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
            boxShadow: '0 14px 36px rgba(91,92,246,.42)',
            transition: 'transform .15s, box-shadow .15s',
          }}
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(.98)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(91,92,246,.4)'; }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(91,92,246,.42)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(91,92,246,.42)'; }}
        >
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', top: -25, right: -25, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -30, right: 55, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '3px 10px',
                fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10,
              }}>⚡ Próxima aula</div>

              <div style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 6, lineHeight: 1.2 }}>
                {lang.label} · Arrays
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                {[['📖', 'Lição 3 de 5'], ['⏱️', '~8 min'], ['⚡', '+210 XP']].map(([ic, tx]) => (
                  <span key={tx} style={{
                    fontSize: 11, color: 'rgba(255,255,255,0.7)',
                    background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '3px 9px',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>{ic} {tx}</span>
                ))}
              </div>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'white', borderRadius: 13, padding: '10px 24px',
                fontSize: 14, fontWeight: 800, color: '#5b5cf6',
                boxShadow: '0 4px 16px rgba(0,0,0,0.22)',
              }}>▶ Continuar</div>
            </div>

            <div style={{ marginLeft: 8 }}>
              <Stax size={64} mood="excited" float />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════
            STATS ROW — 3 cards
        ═══════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { icon: '✅', label: 'Lições',  value: '47',             grad: 'linear-gradient(145deg,#34d399,#059669)', glow: '#10b981' },
            { icon: '🔥', label: 'Streak',  value: `${gs.streak}d`, grad: 'linear-gradient(145deg,#fb923c,#ef4444)', glow: '#f97316' },
            { icon: '⚡', label: 'XP Total', value: gs.xp,           grad: 'linear-gradient(145deg,#818cf8,#4f46e5)', glow: '#6366f1' },
          ].map(s => (
            <div key={s.label} style={{
              background: s.grad, borderRadius: 18,
              padding: '16px 10px', textAlign: 'center',
              boxShadow: `0 8px 20px ${s.glow}45`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              <div style={{ fontSize: 24, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'white', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)', fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════
            WEEKLY ACTIVITY CHART
        ═══════════════════════════════ */}
        <div style={{
          background: t.surface, borderRadius: 20,
          padding: '16px 16px 14px', marginBottom: 14,
          border: `1px solid ${t.border}`, boxShadow: t.cardShadow,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>Esta semana</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#5b5cf6' }}>{weekTotal} XP</div>
                <div style={{ fontSize: 9, color: t.textMuted, marginTop: 1 }}>{weekDays} dias ativos</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 72 }}>
            {WEEK_LABELS.map((d, i) => {
              const h = bars[i];
              const maxH = 56;
              const barH = Math.max((h / 100) * maxH, h > 0 ? 8 : 4);
              const isToday = i === TODAY;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{
                    width: '72%', height: barH, borderRadius: 6,
                    background: h === 0
                      ? (t.isDark ? 'rgba(255,255,255,0.06)' : '#e5e7eb')
                      : isToday
                      ? 'linear-gradient(180deg,#7c3aed,#5b5cf6)'
                      : t.isDark ? 'rgba(91,92,246,0.4)' : '#c4b5fd',
                    boxShadow: isToday && h > 0 ? '0 4px 12px rgba(91,92,246,0.55)' : 'none',
                    transition: 'height 0.9s cubic-bezier(.34,1.4,.64,1)',
                    position: 'relative',
                  }}>
                    {isToday && h > 0 && (
                      <div style={{
                        position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
                        width: 7, height: 7, borderRadius: '50%',
                        background: 'white', boxShadow: '0 0 6px rgba(91,92,246,0.8)',
                      }} />
                    )}
                  </div>
                  <div style={{
                    fontSize: 9, fontWeight: isToday ? 800 : 500,
                    color: isToday ? '#5b5cf6' : t.textFaint,
                  }}>{d}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════
            MAP TEASER CARD
        ═══════════════════════════════ */}
        <div
          onClick={() => goTo('map', 'right')}
          style={{
            background: t.surface, borderRadius: 20,
            padding: '14px 16px', cursor: 'pointer',
            border: `1px solid ${t.border}`, boxShadow: t.cardShadow,
            display: 'flex', alignItems: 'center', gap: 14,
            transition: 'transform .15s',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(.99)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: 50, height: 50, borderRadius: 16, flexShrink: 0,
            background: 'linear-gradient(135deg,#10b981,#059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, boxShadow: '0 6px 16px rgba(16,185,129,0.4)',
          }}>🗺️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 3 }}>
              Ver trilha completa
            </div>
            <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 8 }}>
              2 de 7 tópicos · 29% completo
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1, 1, 0, 0, 0, 0, 0].map((done, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: done ? '#10b981' : t.isDark ? 'rgba(255,255,255,0.08)' : '#e5e7eb',
                  transition: `width 0.8s ${i * 0.1}s ease`,
                }} />
              ))}
            </div>
          </div>
          <span style={{ color: t.textFaint, fontSize: 20 }}>›</span>
        </div>

        <div style={{ height: 8 }} />
      </div>

      <BottomNav screen="dashboard" goTo={goTo} />
    </div>
  );
}
