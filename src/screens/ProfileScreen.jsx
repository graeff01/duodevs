import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Stax from '../components/Stax';
import BottomNav from '../components/BottomNav';

const ACHIEVEMENTS = [
  { id: 'first',     icon: '🎯', label: 'Primeira lição',   earned: true,  color: '#f97316' },
  { id: 'streak7',   icon: '🔥', label: '7 dias',           earned: true,  color: '#ef4444' },
  { id: 'streak14',  icon: '🔥', label: '14 dias',          earned: true,  color: '#ef4444' },
  { id: 'lessons10', icon: '✅', label: '10 lições',        earned: true,  color: '#10b981' },
  { id: 'lessons50', icon: '📚', label: '50 lições',        earned: false, color: '#10b981' },
  { id: 'perfect',   icon: '⭐', label: 'Perfeito',         earned: true,  color: '#f59e0b' },
  { id: 'coder',     icon: '💻', label: 'Coder',            earned: true,  color: '#3b82f6' },
  { id: 'boss',      icon: '👑', label: 'Boss',             earned: false, color: '#8b5cf6' },
];

function Toggle({ value, onToggle }) {
  return (
    <div className="toggle-track" style={{ background: value ? '#5b5cf6' : '#d1d5db' }} onClick={onToggle}>
      <div className="toggle-thumb" style={{ left: value ? 27 : 3 }} />
    </div>
  );
}

function SettingRow({ icon, label, value, onClick, danger, last, t, toggle }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '13px 16px',
        borderBottom: last ? 'none' : `1px solid ${t.divider}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background .15s',
      }}
      onMouseDown={e => onClick && (e.currentTarget.style.background = t.isDark ? 'rgba(255,255,255,.04)' : '#f7f7ff')}
      onMouseUp={e => onClick && (e.currentTarget.style.background = 'transparent')}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: danger ? 'rgba(239,68,68,0.12)' : t.isDark ? 'rgba(91,92,246,0.12)' : '#f0efff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
      }}>{icon}</div>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: danger ? '#ef4444' : t.text }}>{label}</span>
      {toggle !== undefined ? (
        <Toggle value={toggle} onToggle={onClick} />
      ) : value !== undefined ? (
        <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>{value}</span>
      ) : null}
      {onClick && toggle === undefined && (
        <span style={{ color: t.textFaint, fontSize: 14, marginLeft: 4 }}>›</span>
      )}
    </div>
  );
}

export default function ProfileScreen({ goTo, gs, setGs }) {
  const { t, toggle, isDark } = useTheme();
  const [xpW, setXpW] = useState(0);
  const pct = Math.round((gs.xp / gs.xpMax) * 100);

  useEffect(() => {
    const tm = setTimeout(() => setXpW(pct), 350);
    return () => clearTimeout(tm);
  }, [pct]);

  const handleReset = () => setGs(s => ({ ...s, xp: 0, coins: 0, streak: 0 }));

  const stats = [
    { icon: '⚡', label: 'XP',     value: gs.xp,           grad: 'linear-gradient(145deg,#6366f1,#7c3aed)', glow: '#6366f1' },
    { icon: '🔥', label: 'Streak', value: `${gs.streak}d`, grad: 'linear-gradient(145deg,#fb923c,#ef4444)', glow: '#f97316' },
    { icon: '✅', label: 'Lições', value: '47',            grad: 'linear-gradient(145deg,#34d399,#059669)', glow: '#10b981' },
    { icon: '🪙', label: 'Moedas', value: gs.coins,        grad: 'linear-gradient(145deg,#fcd34d,#d97706)', glow: '#f59e0b' },
  ];

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: t.bg }}>
      <style>{`
        @keyframes avatarRing {
          0%,100% { transform: scale(1);   opacity: .5 }
          50%      { transform: scale(1.12); opacity: .15 }
        }
        @keyframes heroBubble {
          0%,100% { transform: scale(1) translate(0,0) }
          50%      { transform: scale(1.06) translate(4px,-4px) }
        }
      `}</style>

      {/* ── Status bar ── */}
      <div className="sbar" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'white', position: 'relative', zIndex: 1 }}>
        <span className="sbar-time">9:41</span>
        <div style={{ fontSize: 11 }}>▪▪▪ 100%</div>
      </div>

      <div className="scroll" style={{ padding: 0 }}>

        {/* ══════════════════════════════════════
            HERO BANNER
        ══════════════════════════════════════ */}
        <div style={{
          background: 'linear-gradient(150deg, #2d27b0 0%, #5b5cf6 50%, #7c3aed 100%)',
          padding: '0 20px 36px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative blobs */}
          <div style={{
            position: 'absolute', top: -45, right: -30,
            width: 160, height: 160, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            animation: 'heroBubble 6s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', top: 10, right: 50,
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(255,255,255,0.09)',
            animation: 'heroBubble 4s 1s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: -40, left: -40,
            width: 150, height: 150, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            animation: 'heroBubble 7s 2s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: 20, left: '55%',
            width: 60, height: 60, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }} />

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1, paddingTop: 8 }}>

            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: -10, borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.2)',
                animation: 'avatarRing 2.5s ease-in-out infinite',
              }} />
              <div style={{
                position: 'absolute', inset: -5, borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.35)',
              }} />
              <div style={{
                width: 100, height: 100, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '3px solid rgba(255,255,255,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <Stax size={72} mood="excited" />
              </div>
              <div style={{
                position: 'absolute', bottom: 3, right: -2,
                width: 28, height: 28, borderRadius: '50%',
                background: '#f59e0b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, border: '2.5px solid rgba(93,92,246,0.9)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}>✏️</div>
            </div>

            {/* Name */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'white', letterSpacing: '-0.4px' }}>Ana</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>@ana_dev</div>
            </div>

            {/* Badges row */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { emoji: '🏆', text: 'Liga Ouro' },
                { emoji: '⚡', text: `Nível ${gs.level}` },
                { emoji: '🔥', text: `${gs.streak} dias` },
              ].map(b => (
                <div key={b.text} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 20, padding: '5px 13px',
                  fontSize: 12, fontWeight: 700, color: 'white',
                }}>
                  <span>{b.emoji}</span> {b.text}
                </div>
              ))}
            </div>

            {/* XP Progress bar */}
            <div style={{ width: '100%', maxWidth: 280, marginTop: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>
                  {gs.xp} XP
                </span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                  Nível {gs.level + 1} → {gs.xpMax} XP
                </span>
              </div>
              <div style={{ height: 10, background: 'rgba(255,255,255,0.18)', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 5,
                  background: 'linear-gradient(90deg, #a5f3fc, #fff)',
                  width: `${xpW}%`, transition: 'width 1.2s ease',
                  boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                }} />
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 5, textAlign: 'right' }}>
                faltam {gs.xpMax - gs.xp} XP
              </div>
            </div>
          </div>

          {/* Bottom wave clip */}
          <svg viewBox="0 0 390 28" style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', display: 'block' }} preserveAspectRatio="none">
            <path d="M0 28 L0 14 Q98 0 195 14 Q292 28 390 14 L390 28 Z" fill={t.bg} />
          </svg>
        </div>

        {/* ══════════════════════════════════════
            STATS ROW
        ══════════════════════════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, padding: '20px 16px 0' }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background: s.grad, borderRadius: 18,
              padding: '14px 8px', textAlign: 'center',
              boxShadow: `0 8px 20px ${s.glow}45`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              <div style={{ fontSize: 22, lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>{s.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'white', lineHeight: 1, marginTop: 2 }}>{s.value}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)', fontWeight: 700, letterSpacing: '0.02em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════
            ACHIEVEMENTS
        ══════════════════════════════════════ */}
        <div style={{ padding: '22px 16px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>Conquistas</div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#5b5cf6',
              background: isDark ? 'rgba(91,92,246,0.12)' : '#eef2ff',
              borderRadius: 8, padding: '3px 10px',
            }}>
              {ACHIEVEMENTS.filter(a => a.earned).length} / {ACHIEVEMENTS.length}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 9 }}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.id} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: '13px 6px 10px',
                borderRadius: 18,
                background: a.earned
                  ? isDark ? `${a.color}1e` : `${a.color}14`
                  : t.surface,
                border: `1.5px solid ${a.earned ? `${a.color}60` : t.border}`,
                opacity: a.earned ? 1 : 0.42,
                filter: a.earned ? 'none' : 'grayscale(1)',
                boxShadow: a.earned ? `0 4px 14px ${a.color}28` : t.cardShadow,
                transition: 'transform .18s',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 13,
                  background: a.earned ? a.color : (isDark ? '#2a2750' : '#e5e7eb'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                  boxShadow: a.earned ? `0 4px 12px ${a.color}55` : 'none',
                }}>{a.icon}</div>
                <span style={{
                  fontSize: 9, fontWeight: 700, textAlign: 'center', lineHeight: 1.3,
                  color: a.earned ? (isDark ? '#e0e0ff' : '#1a1740') : t.textFaint,
                }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            SETTINGS
        ══════════════════════════════════════ */}
        <div style={{ padding: '22px 16px 0' }}>

          {/* Appearance */}
          <div style={{ fontSize: 11, fontWeight: 800, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8, paddingLeft: 2 }}>Aparência</div>
          <div style={{ background: t.surface, borderRadius: 18, overflow: 'hidden', boxShadow: t.cardShadow, marginBottom: 16 }}>
            <SettingRow icon={isDark ? '🌙' : '☀️'} label="Modo escuro" toggle={isDark} onClick={toggle} last t={t} />
          </div>

          {/* Learning */}
          <div style={{ fontSize: 11, fontWeight: 800, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8, paddingLeft: 2 }}>Aprendizado</div>
          <div style={{ background: t.surface, borderRadius: 18, overflow: 'hidden', boxShadow: t.cardShadow, marginBottom: 16 }}>
            <SettingRow icon="🎯" label="Objetivo"    value="Trabalhar com tech"   t={t} />
            <SettingRow icon="⏱️" label="Meta diária" value={`${gs.dailyTime || 10} min`} t={t} />
            <SettingRow icon="💻" label="Linguagem"   value="JavaScript"           t={t} last />
          </div>

          {/* Notifications */}
          <div style={{ fontSize: 11, fontWeight: 800, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8, paddingLeft: 2 }}>Notificações</div>
          <div style={{ background: t.surface, borderRadius: 18, overflow: 'hidden', boxShadow: t.cardShadow, marginBottom: 16 }}>
            <SettingRow icon="🔔" label="Lembrete diário"  value="20:00"   t={t} />
            <SettingRow icon="📊" label="Relatório semanal" value="Ativado" t={t} last />
          </div>

          {/* Account */}
          <div style={{ fontSize: 11, fontWeight: 800, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8, paddingLeft: 2 }}>Conta</div>
          <div style={{ background: t.surface, borderRadius: 18, overflow: 'hidden', boxShadow: t.cardShadow, marginBottom: 16 }}>
            <SettingRow icon="👤" label="Editar perfil"     t={t} onClick={() => {}} />
            <SettingRow icon="🔒" label="Privacidade"       t={t} onClick={() => {}} />
            <SettingRow icon="🆘" label="Ajuda e suporte"   t={t} onClick={() => {}} />
            <SettingRow icon="🗑️" label="Resetar progresso" t={t} onClick={handleReset} danger last />
          </div>

          {/* Showcase */}
          <div style={{ fontSize: 11, fontWeight: 800, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8, paddingLeft: 2, marginTop: 6 }}>App</div>
          <div style={{ background: t.surface, borderRadius: 18, overflow: 'hidden', boxShadow: t.cardShadow, marginBottom: 16 }}>
            <SettingRow icon="🖼️" label="Ver todas as telas" t={t} onClick={() => goTo('showcase', 'right')} last />
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', padding: '4px 0 8px' }}>
            <div style={{ fontSize: 11, color: t.textFaint }}>StackUp v1.0.0</div>
          </div>
        </div>

        <div style={{ height: 12 }} />
      </div>

      <BottomNav screen="profile" goTo={goTo} />
    </div>
  );
}
