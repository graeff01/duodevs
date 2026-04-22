import { useTheme } from '../context/ThemeContext';

const TABS = [
  {
    id: 'dashboard', label: 'Início',
    icon: (on) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={on ? '#5b5cf6' : 'none'}
        stroke={on ? '#5b5cf6' : 'currentColor'} strokeWidth="2">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: 'map', label: 'Mapa',
    icon: (on) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={on ? '#5b5cf6' : 'none'}
        stroke={on ? '#5b5cf6' : 'currentColor'} strokeWidth="2">
        <polygon points="3,6 9,3 15,6 21,3 21,18 15,21 9,18 3,21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    id: 'ranking', label: 'Ranking',
    icon: (on) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke={on ? '#5b5cf6' : 'currentColor'} strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6"  y1="20" x2="6"  y2="14" />
      </svg>
    ),
  },
  {
    id: 'profile', label: 'Perfil',
    icon: (on) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke={on ? '#5b5cf6' : 'currentColor'} strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

export default function BottomNav({ screen, goTo }) {
  const { t } = useTheme();
  return (
    <div className="bnav" style={{ background: t.navBg, borderTopColor: t.navBorder }}>
      {TABS.map(tab => {
        const on = screen === tab.id;
        return (
          <div key={tab.id} className={`bni${on ? ' on' : ''}`}
            style={{ color: on ? '#5b5cf6' : t.navText }}
            onClick={() => goTo(tab.id)}>
            {tab.icon(on)}
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
