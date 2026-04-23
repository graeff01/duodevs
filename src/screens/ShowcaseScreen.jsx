import { useState, useEffect } from 'react';

/* ── Mini phone frame ── */
function Phone({ children, label, accent = '#5b5cf6', delay = 0 }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity .55s ease, transform .55s ease',
    }}>
      <div style={{
        width: 148, height: 284, borderRadius: 28, background: '#0a0820',
        border: '2.5px solid rgba(255,255,255,.18)',
        boxShadow: [
          '0 28px 60px rgba(0,0,0,.65)',
          '0 0 0 1px rgba(255,255,255,.05)',
          `0 0 36px ${accent}25`,
          `inset 0 1px 0 rgba(255,255,255,.08)`,
        ].join(','),
        overflow: 'hidden', position: 'relative', flexShrink: 0,
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 44, height: 12, borderRadius: '0 0 10px 10px',
          background: '#0a0820', zIndex: 20,
          borderBottom: '1px solid rgba(255,255,255,.08)',
        }} />
        {children}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.48)', letterSpacing: '.04em' }}>{label}</div>
    </div>
  );
}

/* ── Mini screens ── */

function DashboardMini() {
  return (
    <div style={{ background: 'linear-gradient(160deg,#12102a,#1a1535)', height: '100%', padding: '15px 10px 10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 900, color: 'white', letterSpacing: -0.5 }}>
          Stack<span style={{ color: '#5b5cf6' }}>Up</span>
        </div>
        <div style={{ fontSize: 7.5, color: '#a5b4fc', background: 'rgba(91,92,246,.18)', borderRadius: 6, padding: '2px 7px', fontWeight: 700 }}>⚡ 840 XP</div>
      </div>

      <div style={{ fontSize: 8, color: 'rgba(255,255,255,.42)', marginBottom: 8 }}>Olá, Dev! 👋 14d streak 🔥</div>

      <div style={{ background: 'linear-gradient(135deg,#5b5cf6,#7c3aed)', borderRadius: 13, padding: '11px 10px', marginBottom: 7, boxShadow: '0 8px 22px rgba(91,92,246,.45)' }}>
        <div style={{ fontSize: 7, color: 'rgba(255,255,255,.6)', marginBottom: 2 }}>EM ANDAMENTO</div>
        <div style={{ fontSize: 9.5, fontWeight: 800, color: 'white', marginBottom: 7 }}>Frontend · HTML Básico</div>
        <div style={{ height: 3, background: 'rgba(255,255,255,.2)', borderRadius: 2, marginBottom: 7, overflow: 'hidden' }}>
          <div style={{ width: '40%', height: '100%', background: 'rgba(255,255,255,.9)', borderRadius: 2 }} />
        </div>
        <div style={{ background: 'rgba(255,255,255,.2)', borderRadius: 6, padding: '4px', textAlign: 'center', fontSize: 8, fontWeight: 800, color: 'white' }}>Continuar →</div>
      </div>

      <div style={{ display: 'flex', gap: 5, marginBottom: 7 }}>
        {[['🔥','14d','Streak'],['🪙','480','Moedas'],['🏆','Ouro','Liga']].map(([ic,v,lb]) => (
          <div key={lb} style={{ flex: 1, background: 'rgba(255,255,255,.07)', borderRadius: 9, padding: '6px 3px', textAlign: 'center', border: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ fontSize: 12 }}>{ic}</div>
            <div style={{ fontSize: 8, fontWeight: 800, color: 'white', marginTop: 1 }}>{v}</div>
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,.38)', marginTop: 1 }}>{lb}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,.05)', borderRadius: 9, padding: '7px 9px', border: '1px solid rgba(255,255,255,.07)' }}>
        <div style={{ fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,.38)', marginBottom: 4 }}>MAPA · 2/7 completos</div>
        <div style={{ height: 3, background: 'rgba(255,255,255,.1)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: '28%', height: '100%', background: 'linear-gradient(90deg,#5b5cf6,#8b5cf6)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

function MapMini() {
  return (
    <div style={{ background: '#091408', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <svg width="148" height="284" viewBox="0 0 148 284" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="scDone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#065f46" />
          </linearGradient>
          <linearGradient id="scActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#3730a3" />
          </linearGradient>
        </defs>

        {/* Terrain */}
        <ellipse cx="52"  cy="68"  rx="50" ry="40" fill="rgba(16,52,12,.75)" />
        <ellipse cx="54"  cy="70"  rx="36" ry="28" fill="rgba(28,72,16,.65)" />
        <ellipse cx="54"  cy="71"  rx="22" ry="17" fill="rgba(62,88,18,.55)" />
        <ellipse cx="98"  cy="158" rx="42" ry="33" fill="rgba(28,72,16,.65)" />
        <ellipse cx="100" cy="160" rx="28" ry="22" fill="rgba(98,72,28,.55)" />
        <ellipse cx="36"  cy="220" rx="36" ry="28" fill="rgba(16,52,12,.7)" />

        {/* River glow */}
        <path d="M 64 0 Q 72 82 60 158 Q 48 228 62 284" fill="none" stroke="rgba(22,105,185,.2)" strokeWidth="16" strokeLinecap="round" />
        {/* River */}
        <path d="M 64 0 Q 72 82 60 158 Q 48 228 62 284" fill="none" stroke="rgba(28,110,195,.55)" strokeWidth="5.5" strokeLinecap="round" />

        {/* Connector lines */}
        <path d="M 74 63 Q 62 92 50 110" stroke="rgba(16,185,129,.65)" strokeWidth="2.5" fill="none" />
        <path d="M 50 132 Q 64 158 78 174" stroke="rgba(91,92,246,.55)" strokeWidth="2.5" fill="none" strokeDasharray="5 3" />
        <path d="M 78 200 Q 67 225 55 241" stroke="rgba(45,43,82,.5)"  strokeWidth="2" fill="none" strokeDasharray="5 3" />

        {/* Node shadows */}
        <ellipse cx="74" cy="62"  rx="9"  ry="4"  fill="rgba(0,0,0,.5)" />
        <ellipse cx="50" cy="131" rx="9"  ry="4"  fill="rgba(0,0,0,.5)" />
        <ellipse cx="78" cy="199" rx="11" ry="5"  fill="rgba(0,0,0,.5)" />

        {/* Nodes */}
        <circle cx="74" cy="54"  r="11" fill="url(#scDone)" />
        <text x="74" y="58"  textAnchor="middle" fontSize="11" fill="white">✓</text>

        <circle cx="50" cy="123" r="11" fill="url(#scDone)" />
        <text x="50" y="127" textAnchor="middle" fontSize="11" fill="white">✓</text>

        <circle cx="78" cy="186" r="13" fill="url(#scActive)" />
        <circle cx="78" cy="186" r="17" fill="none" stroke="rgba(91,92,246,.38)" strokeWidth="2" />
        <circle cx="78" cy="186" r="21" fill="none" stroke="rgba(91,92,246,.18)" strokeWidth="2" />
        <text x="78" y="190" textAnchor="middle" fontSize="11" fill="white">⚡</text>

        <circle cx="55" cy="252" r="10" fill="rgba(20,18,46,.9)" stroke="rgba(91,92,246,.22)" strokeWidth="1.5" />
        <text x="55" y="256" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,.35)">🔒</text>
      </svg>

      <div style={{
        position: 'absolute', top: 150, left: '53%', transform: 'translateX(-50%)',
        background: '#f59e0b', color: '#1a1740', fontSize: 6, fontWeight: 900,
        borderRadius: 4, padding: '2px 6px', whiteSpace: 'nowrap', zIndex: 10,
        boxShadow: '0 2px 8px rgba(245,158,11,.5)',
      }}>VOCÊ AQUI ▼</div>
    </div>
  );
}

function LessonMini() {
  return (
    <div style={{ background: '#0d0c1d', height: '100%', padding: '15px 10px 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: '#6b6a9a', lineHeight: 1 }}>✕</div>
        <div style={{ flex: 1, height: 4, background: '#2a2750', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: '40%', height: '100%', background: 'linear-gradient(90deg,#5b5cf6,#8b5cf6)' }} />
        </div>
        <div style={{ fontSize: 7, color: '#6b6a9a', fontWeight: 700 }}>2/5</div>
      </div>

      <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
        {[1,1,1,0,0].map((h,i) => <span key={i} style={{ fontSize: 9, opacity: h ? 1 : .2 }}>❤️</span>)}
      </div>

      <div style={{ fontSize: 9.5, fontWeight: 700, color: 'white', lineHeight: 1.35, marginBottom: 9 }}>
        Qual propriedade CSS muda a cor do texto?
      </div>

      <div style={{ background: '#0a0918', borderRadius: 8, padding: '6px 8px', marginBottom: 9, border: '1px solid rgba(91,92,246,.15)' }}>
        <span style={{ fontSize: 7.5, color: '#a5b4fc', fontFamily: 'monospace' }}>{'p { ___ : red; }'}</span>
      </div>

      {[['A','color','correct'],['B','text-color',''],['C','font-color',''],['D','foreground','']].map(([l,o,s]) => (
        <div key={l} style={{
          display: 'flex', alignItems: 'center', gap: 5, padding: '5px 7px', borderRadius: 7, marginBottom: 4,
          border: `1.5px solid ${s === 'correct' ? '#10b981' : 'rgba(255,255,255,.1)'}`,
          background: s === 'correct' ? 'rgba(16,185,129,.15)' : 'rgba(255,255,255,.03)',
        }}>
          <div style={{ width: 15, height: 15, borderRadius: 4, background: '#2a2750', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7.5, fontWeight: 800, color: '#5b5cf6', flexShrink: 0 }}>{l}</div>
          <div style={{ fontSize: 8, color: s === 'correct' ? '#6ee7b7' : 'rgba(255,255,255,.62)', fontFamily: 'monospace' }}>{o}</div>
          {s === 'correct' && <div style={{ marginLeft: 'auto', fontSize: 9, color: '#10b981' }}>✓</div>}
        </div>
      ))}
    </div>
  );
}

function FeedbackMini() {
  return (
    <div style={{ background: '#0d0c1d', height: '100%', position: 'relative' }}>
      <div style={{ padding: '15px 10px 0' }}>
        <div style={{ height: 4, background: '#2a2750', borderRadius: 2, overflow: 'hidden', marginBottom: 9 }}>
          <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg,#5b5cf6,#8b5cf6)' }} />
        </div>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'white', marginBottom: 8, lineHeight: 1.3 }}>
          Qual propriedade CSS muda a cor do texto?
        </div>
        {[['A','color','correct'],['B','text-color','wrong'],['C','font-color',''],['D','foreground','']].map(([l,o,s]) => (
          <div key={l} style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '4px 6px', borderRadius: 6, marginBottom: 3,
            border: `1.5px solid ${s === 'correct' ? '#10b981' : s === 'wrong' ? '#ef4444' : 'rgba(255,255,255,.07)'}`,
            background: s === 'correct' ? 'rgba(16,185,129,.12)' : s === 'wrong' ? 'rgba(239,68,68,.1)' : 'transparent',
            opacity: !s ? 0.38 : 1,
          }}>
            <div style={{ width: 13, height: 13, borderRadius: 4, background: '#2a2750', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 800, color: '#5b5cf6', flexShrink: 0 }}>{l}</div>
            <div style={{ fontSize: 7, color: s === 'correct' ? '#6ee7b7' : s === 'wrong' ? '#fca5a5' : 'rgba(255,255,255,.45)', fontFamily: 'monospace' }}>{o}</div>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(160deg,#1c0808,#2a0f0f)',
        borderTop: '1px solid rgba(239,68,68,.28)', borderRadius: '14px 14px 0 0',
        padding: '10px 10px 12px',
      }}>
        <div style={{ fontSize: 8, fontWeight: 800, color: '#f87171', marginBottom: 4 }}>Por que "text-color" está errado:</div>
        <div style={{ fontSize: 7, color: '#fca5a5', lineHeight: 1.45, marginBottom: 6 }}>
          Não existe em CSS. A propriedade correta é só "color".
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginBottom: 7 }}>
          <span style={{ fontSize: 7, color: '#6ee7b7', fontWeight: 700 }}>✓ Correto:</span>
          <span style={{ fontSize: 7, fontWeight: 700, color: '#6ee7b7', background: 'rgba(16,185,129,.2)', borderRadius: 4, padding: '1px 5px', fontFamily: 'monospace' }}>color</span>
        </div>
        <div style={{ background: '#0a0818', borderRadius: 6, padding: '5px 7px', border: '1px solid rgba(91,92,246,.15)' }}>
          <span style={{ fontSize: 7, fontFamily: 'monospace', color: '#a5b4fc' }}>{'p { '}</span>
          <span style={{ fontSize: 7, fontFamily: 'monospace', color: '#6ee7b7', background: 'rgba(16,185,129,.2)', borderRadius: 3, padding: '0 3px' }}>color</span>
          <span style={{ fontSize: 7, fontFamily: 'monospace', color: '#a5b4fc' }}>{': red; }'}</span>
        </div>
      </div>
    </div>
  );
}

function CompletionMini() {
  return (
    <div style={{ background: 'linear-gradient(160deg,#12102a,#1d1065)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '18px 10px 12px', position: 'relative', overflow: 'hidden' }}>
      {[[14,22,'#5b5cf6'],[82,14,'#f59e0b'],[62,38,'#10b981'],[28,52,'#f97316'],[88,58,'#8b5cf6'],[45,70,'#06b6d4']].map(([x,y,c],i) => (
        <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 5, height: 5, borderRadius: '50%', background: c, opacity: .65 }} />
      ))}

      <div style={{ fontSize: 30, marginBottom: 5 }}>🤖</div>
      <div style={{ fontSize: 11, fontWeight: 900, color: 'white', marginBottom: 2 }}>Perfeito! 🏆</div>
      <div style={{ fontSize: 7, color: 'rgba(255,255,255,.42)', marginBottom: 10 }}>HTML Básico · 100% precisão</div>

      <div style={{ width: '100%', background: 'rgba(255,255,255,.09)', borderRadius: 12, padding: '8px 10px', marginBottom: 8, border: '1px solid rgba(255,255,255,.12)', textAlign: 'center' }}>
        <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,.4)', marginBottom: 2 }}>XP GANHO</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#818cf8', lineHeight: 1 }}>+125</div>
      </div>

      <div style={{ width: '100%', background: 'rgba(16,185,129,.12)', borderRadius: 9, padding: '7px 9px', marginBottom: 6, border: '1px solid rgba(16,185,129,.22)' }}>
        <div style={{ fontSize: 7.5, color: '#6ee7b7', fontWeight: 800, marginBottom: 5 }}>✅ Você dominou (5/5)</div>
        {['color','display: flex','margin'].map(s => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
            <div style={{ width: 11, height: 11, borderRadius: 3, background: 'rgba(16,185,129,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#34d399', flexShrink: 0 }}>✓</div>
            <div style={{ fontSize: 7, color: '#a7f3d0', fontFamily: 'monospace' }}>{s}</div>
          </div>
        ))}
      </div>

      <div style={{ width: '100%', background: 'rgba(245,158,11,.12)', borderRadius: 9, padding: '7px', textAlign: 'center', border: '1px solid rgba(245,158,11,.25)' }}>
        <div style={{ fontSize: 8, fontWeight: 800, color: '#fcd34d' }}>🌟 100% de precisão!</div>
      </div>
    </div>
  );
}

function RankingMini() {
  const rows = [
    { rank: '🥇', name: 'Dev King',  xp: '2.840', color: '#f59e0b', me: false },
    { rank: '🥈', name: 'Code Star', xp: '2.310', color: '#94a3b8', me: false },
    { rank: '🥉', name: 'Bug Hunt',  xp: '1.980', color: '#f97316', me: false },
    { rank: '#4', name: 'Ana Dev',   xp: '1.640', color: '#5b5cf6', me: true  },
    { rank: '#5', name: 'Node JS',   xp: '1.200', color: '#94a3b8', me: false },
  ];
  return (
    <div style={{ background: '#0d0c1d', height: '100%', padding: '15px 10px 10px' }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: 'white', marginBottom: 3 }}>🏆 Ranking</div>
      <div style={{ fontSize: 7, color: 'rgba(255,255,255,.38)', marginBottom: 10 }}>Liga Ouro · Semana atual</div>

      {rows.map((u, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 7, padding: '7px 8px', borderRadius: 9, marginBottom: 5,
          background: u.me ? 'rgba(91,92,246,.16)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${u.me ? 'rgba(91,92,246,.38)' : 'rgba(255,255,255,.06)'}`,
        }}>
          <div style={{ fontSize: i < 3 ? 13 : 8, fontWeight: 700, color: u.color, minWidth: 18, textAlign: 'center' }}>{u.rank}</div>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${u.color}28`, border: `1.5px solid ${u.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10 }}>👤</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: u.me ? '#a5b4fc' : 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</div>
          </div>
          <div style={{ fontSize: 8, fontWeight: 800, color: '#fbbf24' }}>⚡{u.xp}</div>
        </div>
      ))}
    </div>
  );
}

function ProfileMini() {
  return (
    <div style={{ background: '#0d0c1d', height: '100%', overflow: 'hidden' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(150deg,#2d27b0,#5b5cf6,#7c3aed)', padding: '14px 10px 28px', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.14)', border: '2.5px solid rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🤖</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'white' }}>Ana Dev</div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,.55)' }}>@ana_dev</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['🏆 Ouro','⚡ Nv 7','🔥 14d'].map(b => (
              <div key={b} style={{ fontSize: 6.5, fontWeight: 700, color: 'white', background: 'rgba(255,255,255,.15)', borderRadius: 10, padding: '2px 6px', border: '1px solid rgba(255,255,255,.22)' }}>{b}</div>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 148 14" style={{ position: 'absolute', bottom: -1, left: 0, width: '100%' }} preserveAspectRatio="none">
          <path d="M0 14 L0 7 Q37 0 74 7 Q111 14 148 7 L148 14 Z" fill="#0d0c1d" />
        </svg>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5, padding: '10px 8px 0' }}>
        {[['⚡','840','XP'],['🔥','14','Streak'],['✅','47','Lições'],['🪙','480','Moedas']].map(([ic,v,lb]) => (
          <div key={lb} style={{ borderRadius: 10, padding: '7px 4px', textAlign: 'center', background: 'rgba(91,92,246,.14)', border: '1px solid rgba(91,92,246,.2)' }}>
            <div style={{ fontSize: 11 }}>{ic}</div>
            <div style={{ fontSize: 8, fontWeight: 800, color: 'white', marginTop: 1 }}>{v}</div>
            <div style={{ fontSize: 6, color: 'rgba(255,255,255,.4)', marginTop: 1 }}>{lb}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div style={{ padding: '10px 8px 0' }}>
        <div style={{ fontSize: 8, fontWeight: 800, color: 'rgba(255,255,255,.5)', marginBottom: 6 }}>CONQUISTAS</div>
        <div style={{ display: 'flex', gap: 5 }}>
          {['🎯','🔥','⭐','💻','✅'].map((ic,i) => (
            <div key={i} style={{ width: 30, height: 30, borderRadius: 10, background: i < 4 ? 'rgba(91,92,246,.2)' : 'rgba(255,255,255,.05)', border: `1.5px solid ${i < 4 ? 'rgba(91,92,246,.4)' : 'rgba(255,255,255,.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, filter: i >= 4 ? 'grayscale(1)' : 'none', opacity: i >= 4 ? 0.35 : 1 }}>{ic}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main ShowcaseScreen ── */
export default function ShowcaseScreen({ goTo }) {
  const [headerVis, setHeaderVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeaderVis(true), 60); return () => clearTimeout(t); }, []);

  const screens = [
    { component: <DashboardMini />, label: 'Dashboard',   accent: '#5b5cf6', delay: 80  },
    { component: <MapMini />,       label: 'Mapa Terrain', accent: '#10b981', delay: 160 },
    { component: <LessonMini />,    label: 'Lição',        accent: '#8b5cf6', delay: 240 },
    { component: <FeedbackMini />,  label: 'Feedback',     accent: '#f97316', delay: 320 },
    { component: <CompletionMini />,label: 'Conclusão',    accent: '#f59e0b', delay: 400 },
    { component: <RankingMini />,   label: 'Ranking',      accent: '#ef4444', delay: 480 },
    { component: <ProfileMini />,   label: 'Perfil',       accent: '#a855f7', delay: 560 },
  ];

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(160deg, #07060f 0%, #0f0b2e 55%, #080f06 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes scFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes scPulse { 0%,100%{opacity:.4} 50%{opacity:.9} }
      `}</style>

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '8%',  left: '10%',  width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,92,246,.12),transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '45%', right: '5%',  width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(16,185,129,.09),transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '72%', left: '20%',  width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle,rgba(168,85,247,.08),transparent)', pointerEvents: 'none' }} />

      {/* Decorative twinkling dots */}
      {[[8,12],[88,8],[22,28],[75,35],[12,55],[92,62],[35,80],[65,88],[50,18]].map(([lf,tp],i) => (
        <div key={i} style={{
          position: 'absolute', left: `${lf}%`, top: `${tp}%`,
          width: 3, height: 3, borderRadius: '50%',
          background: 'rgba(255,255,255,.6)',
          animation: `scPulse ${2 + (i % 3) * 0.7}s ${i * 0.3}s ease-in-out infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      <div className="scroll" style={{ flex: 1, padding: '0 16px 36px', position: 'relative', zIndex: 1 }}>

        {/* Back button */}
        <div style={{ paddingTop: 18, paddingBottom: 4 }}>
          <button onClick={() => goTo('profile', 'left')} style={{
            background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)',
            borderRadius: 10, padding: '7px 14px', cursor: 'pointer',
            fontSize: 12, color: 'rgba(255,255,255,.65)', fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>← Voltar</button>
        </div>

        {/* Header */}
        <div style={{
          textAlign: 'center', padding: '16px 0 22px',
          opacity: headerVis ? 1 : 0, transform: headerVis ? 'translateY(0)' : 'translateY(18px)',
          transition: 'all .6s ease',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.38)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Preview das telas</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: 'white', letterSpacing: -2, lineHeight: 1.05, marginBottom: 8 }}>
            Stack<span style={{ color: '#5b5cf6', textShadow: '0 0 30px rgba(91,92,246,.6)' }}>Up</span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.55, maxWidth: 260, margin: '0 auto 14px' }}>
            Aprenda programação como um jogo — desafios, mapa terrain, feedback visual e muito mais.
          </div>
          <div style={{ display: 'flex', gap: 7, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['✦ Gratuito','✦ PWA','✦ Offline','✦ Dark mode'].map(tag => (
              <div key={tag} style={{
                fontSize: 10, fontWeight: 700, color: '#a5b4fc',
                background: 'rgba(91,92,246,.14)', borderRadius: 20,
                padding: '4px 11px', border: '1px solid rgba(91,92,246,.28)',
              }}>{tag}</div>
            ))}
          </div>
        </div>

        {/* Phone grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, justifyItems: 'center' }}>
          {screens.map((s, i) => (
            <Phone key={i} label={s.label} accent={s.accent} delay={s.delay}>
              {s.component}
            </Phone>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={() => goTo('dashboard', 'right')} style={{ maxWidth: 280, fontSize: 15 }}>
            Abrir o app ✦
          </button>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.25)', marginTop: 12 }}>
            StackUp v1.0.0 · Feito com ❤️ para devs
          </div>
        </div>
      </div>
    </div>
  );
}
