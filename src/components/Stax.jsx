export default function Stax({ size = 80, mood = 'happy', float = false }) {
  const smilePath =
    mood === 'excited' || mood === 'celebrating'
      ? 'M 34 38 Q 50 52 66 38'
      : mood === 'sad'
      ? 'M 38 44 Q 50 36 62 44'
      : 'M 38 38 Q 50 45 62 38';
  const eyeR = mood === 'excited' || mood === 'celebrating' ? 8 : 6.5;

  return (
    <svg
      viewBox="0 0 100 122"
      width={size}
      height={size * 1.22}
      style={{
        display: 'block', overflow: 'visible', flexShrink: 0,
        animation: float ? 'staxFloat 3s ease-in-out infinite' : 'none',
      }}
    >
      {/* Feet */}
      <rect x="30" y="108" width="19" height="8" rx="4" fill="#1a1740" />
      <rect x="51" y="108" width="19" height="8" rx="4" fill="#1a1740" />
      {/* Legs */}
      <rect x="35" y="91" width="11" height="20" rx="5.5" fill="#1a1740" />
      <rect x="54" y="91" width="11" height="20" rx="5.5" fill="#1a1740" />
      {/* Body blocks */}
      <rect x="20" y="73" width="60" height="22" rx="8" fill="#f97316" />
      <rect x="17" y="51" width="66" height="25" rx="8" fill="#5b5cf6" />
      <rect x="14" y="29" width="72" height="26" rx="9" fill="#10b981" />
      {/* Arms */}
      {mood === 'celebrating' ? (
        <>
          <rect x="-2" y="22" width="20" height="8" rx="4" fill="#1a1740" transform="rotate(-50 -2 22)" />
          <rect x="82" y="20" width="20" height="8" rx="4" fill="#1a1740" transform="rotate(50 82 20)" />
        </>
      ) : (
        <>
          <rect x="0"  y="52" width="18" height="8" rx="4" fill="#1a1740" transform="rotate(-8 0 52)" />
          <rect x="82" y="52" width="18" height="8" rx="4" fill="#1a1740" transform="rotate(8 82 52)" />
        </>
      )}
      {/* Head */}
      <rect x="17" y="0" width="66" height="48" rx="15" fill="#1a1740" />
      <rect x="24" y="7" width="52" height="34" rx="11" fill="#0a0820" />
      {/* Eyes */}
      <circle cx="40" cy="24" r={eyeR + 3} fill="rgba(91,92,246,.2)" />
      <circle cx="60" cy="24" r={eyeR + 3} fill="rgba(91,92,246,.2)" />
      <circle cx="40" cy="24" r={eyeR} fill="#5b5cf6" />
      <circle cx="60" cy="24" r={eyeR} fill="#5b5cf6" />
      <circle cx="43" cy="21" r="2.8" fill="white" />
      <circle cx="63" cy="21" r="2.8" fill="white" />
      {/* Mouth */}
      <path d={smilePath} stroke="#5b5cf6" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Antenna */}
      <line x1="50" y1="0" x2="50" y2="-12" stroke="#5b5cf6" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="-18" r="7" fill="#5b5cf6" style={{ animation: 'antGlow 2s ease-in-out infinite' }} />
      <circle cx="50" cy="-18" r="3.5" fill="#e0e0fd" />
      {/* Blush */}
      <ellipse cx="27" cy="34" rx="6" ry="3.5" fill="#f97316" opacity=".35" />
      <ellipse cx="73" cy="34" rx="6" ry="3.5" fill="#f97316" opacity=".35" />
      {/* Mood extras */}
      {mood === 'thinking' && (
        <text x="68" y="-8" fontSize="18" fontWeight="900" fill="white">?</text>
      )}
      {(mood === 'excited' || mood === 'celebrating') && (
        <>
          <text x="2"  y="4"  fontSize="14" style={{ animation: 'pulse2 1.5s infinite' }}>✨</text>
          <text x="82" y="2"  fontSize="12" style={{ animation: 'pulse2 1.5s .3s infinite' }}>⭐</text>
        </>
      )}
    </svg>
  );
}
