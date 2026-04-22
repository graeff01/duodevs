import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import BottomNav from '../components/BottomNav';

const WEEKLY = [
  { rank: 1, name: 'Lucas Silva',   avatar: '🦁', xp: 2840, streak: 21, lang: 'JS' },
  { rank: 2, name: 'Maria Clara',   avatar: '🦊', xp: 2310, streak: 18, lang: 'Py' },
  { rank: 3, name: 'Pedro Alves',   avatar: '🐯', xp: 1990, streak: 15, lang: 'JS' },
  { rank: 4, name: 'Ana',           avatar: '🤖', xp: 1420, streak: 14, lang: 'JS', isMe: true },
  { rank: 5, name: 'Fernanda Lima', avatar: '🐸', xp: 1280, streak: 10, lang: 'HTML' },
  { rank: 6, name: 'Rafael Costa', avatar: '🦝', xp:  980, streak:  8, lang: 'Py' },
  { rank: 7, name: 'Julia Santos',  avatar: '🐼', xp:  870, streak:  7, lang: 'JS' },
  { rank: 8, name: 'Bruno Martins', avatar: '🦅', xp:  640, streak:  5, lang: 'HTML' },
  { rank: 9, name: 'Camila Rocha',  avatar: '🐝', xp:  520, streak:  3, lang: 'Py' },
  { rank: 10,name: 'Diego Nunes',   avatar: '🦈', xp:  310, streak:  2, lang: 'JS' },
];

const ALL_TIME = [
  { rank: 1, name: 'Maria Clara',   avatar: '🦊', xp: 48200, streak: 120, lang: 'Py' },
  { rank: 2, name: 'Lucas Silva',   avatar: '🦁', xp: 41600, streak: 98,  lang: 'JS' },
  { rank: 3, name: 'Julia Santos',  avatar: '🐼', xp: 38900, streak: 85,  lang: 'JS' },
  { rank: 4, name: 'Fernanda Lima', avatar: '🐸', xp: 31200, streak: 72,  lang: 'HTML' },
  { rank: 5, name: 'Rafael Costa',  avatar: '🦝', xp: 27400, streak: 61,  lang: 'Py' },
  { rank: 6, name: 'Pedro Alves',   avatar: '🐯', xp: 22100, streak: 54,  lang: 'JS' },
  { rank: 7, name: 'Ana',           avatar: '🤖', xp: 18600, streak: 44,  lang: 'JS', isMe: true },
  { rank: 8, name: 'Bruno Martins', avatar: '🦅', xp: 14300, streak: 31,  lang: 'HTML' },
  { rank: 9, name: 'Camila Rocha',  avatar: '🐝', xp:  9800, streak: 22,  lang: 'Py' },
  { rank: 10,name: 'Diego Nunes',   avatar: '🦈', xp:  5200, streak: 12,  lang: 'JS' },
];

const podiumColors = ['#f59e0b', '#9ca3af', '#cd7c3e'];
const podiumLabels = ['🥇', '🥈', '🥉'];

export default function RankingScreen({ goTo, gs }) {
  const { t } = useTheme();
  const [tab, setTab] = useState('weekly');
  const list = tab === 'weekly' ? WEEKLY : ALL_TIME;
  const podium = list.slice(0, 3);
  const rest   = list.slice(3);
  const me     = list.find(u => u.isMe);

  const fmtXP = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: t.bg }}>
      <div className="sbar" style={{ color: t.statusBar }}>
        <span className="sbar-time">9:41</span>
        <div style={{ color: t.statusBar, fontSize: 11 }}>▪▪▪ 100%</div>
      </div>

      {/* Header */}
      <div style={{ padding: '4px 20px 0', flexShrink: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 14 }}>
          Ranking 🏆
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          {[['weekly','Semanal'],['alltime','Todos os tempos']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              padding: '7px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700,
              background: tab === id ? '#5b5cf6' : t.surface,
              color: tab === id ? 'white' : t.textMuted,
              transition: 'all .2s',
              boxShadow: tab === id ? '0 4px 14px rgba(91,92,246,.35)' : 'none',
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div className="scroll" style={{ padding: '12px 16px 16px' }}>

        {/* Podium */}
        <div style={{
          background: t.isDark
            ? 'linear-gradient(160deg,#1d1065,#12102a)'
            : 'linear-gradient(160deg,#eef2ff,#f0efff)',
          borderRadius: 22, padding: '20px 12px 16px', marginBottom: 14,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8,
        }}>
          {[podium[1], podium[0], podium[2]].map((u, i) => {
            const isCenter = i === 1;
            const origRank = isCenter ? 0 : i === 0 ? 1 : 2;
            return (
              <div key={u.rank} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                flex: isCenter ? 1.2 : 1,
              }}>
                <div style={{ fontSize: isCenter ? 42 : 32, animation: isCenter ? 'pulse2 3s ease-in-out infinite' : 'none' }}>
                  {u.avatar}
                </div>
                {isCenter && (
                  <div style={{ fontSize: 22, animation: 'staxFloat 3s ease-in-out infinite' }}>👑</div>
                )}
                <div style={{
                  fontSize: 11, fontWeight: 800, color: t.text, textAlign: 'center',
                  maxWidth: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{u.name}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: podiumColors[origRank] }}>
                  {fmtXP(u.xp)} XP
                </div>
                <div style={{
                  width: '100%',
                  height: isCenter ? 80 : origRank === 1 ? 60 : 48,
                  background: t.isDark
                    ? `rgba(${origRank===0?'245,158,11':origRank===1?'156,163,175':'205,124,62'},.18)`
                    : `rgba(${origRank===0?'245,158,11':origRank===1?'156,163,175':'205,124,62'},.12)`,
                  borderRadius: '8px 8px 0 0',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6,
                  fontSize: 18,
                }}>{podiumLabels[origRank]}</div>
              </div>
            );
          })}
        </div>

        {/* My position banner */}
        {me && me.rank > 3 && (
          <div style={{
            background: 'linear-gradient(135deg,#5b5cf6,#7c3aed)',
            borderRadius: 14, padding: '12px 16px', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 6px 20px rgba(91,92,246,.3)',
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'rgba(255,255,255,.6)', minWidth: 24 }}>#{me.rank}</div>
            <div style={{ fontSize: 24 }}>{me.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>Você • {me.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)' }}>🔥 {gs.streak} streak</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{fmtXP(me.xp)} XP</div>
          </div>
        )}

        {/* Rest of list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rest.map(u => (
            <div key={u.rank} style={{
              background: u.isMe
                ? t.isDark ? 'rgba(91,92,246,.15)' : '#eef2ff'
                : t.surface,
              borderRadius: 14, padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
              border: u.isMe ? '2px solid rgba(91,92,246,.4)' : `1px solid ${t.border}`,
              boxShadow: t.cardShadow,
            }}>
              <div style={{
                fontSize: 13, fontWeight: 800, minWidth: 24, textAlign: 'center',
                color: u.isMe ? '#5b5cf6' : t.textFaint,
              }}>#{u.rank}</div>
              <div style={{ fontSize: 26 }}>{u.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: u.isMe ? '#5b5cf6' : t.text }}>
                  {u.name}{u.isMe ? ' (você)' : ''}
                </div>
                <div style={{ fontSize: 11, color: t.textMuted }}>🔥 {u.streak}d • {u.lang}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: t.text }}>{fmtXP(u.xp)} XP</div>
            </div>
          ))}
        </div>

        <div style={{ height: 8 }} />
      </div>

      <BottomNav screen="ranking" goTo={goTo} />
    </div>
  );
}
