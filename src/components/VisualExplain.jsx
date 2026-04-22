function parseCode(line) {
  const parts = [];
  const regex = /(~~[^~]+~~|!![^!]+!!)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex)
      parts.push({ text: line.slice(lastIndex, match.index), type: 'normal' });
    const isGood = match[0].startsWith('~~');
    parts.push({ text: match[0].slice(2, -2), type: isGood ? 'good' : 'bad' });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < line.length)
    parts.push({ text: line.slice(lastIndex), type: 'normal' });
  return parts;
}

export default function VisualExplain({ explain }) {
  if (!explain) return null;

  return (
    <div style={{ marginTop: 14, animation: 'fadeUp .35s .08s ease both' }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'rgba(0,0,0,.38)',
        textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 7,
      }}>
        Como funciona
      </div>

      <div style={{
        background: '#0d0c1a', borderRadius: 12, padding: '10px 14px',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        lineHeight: 1.85, boxShadow: '0 4px 18px rgba(0,0,0,.3)',
      }}>
        {explain.code.map((line, i) => (
          <div key={i}>
            {parseCode(line).map((part, j) => (
              <span key={j} style={{
                color:      part.type === 'normal' ? '#a5b4fc' : '#0d0c1a',
                background: part.type === 'good'   ? '#10b981'
                           : part.type === 'bad'   ? '#ef4444'
                           : 'transparent',
                borderRadius: part.type !== 'normal' ? 4 : 0,
                padding:      part.type !== 'normal' ? '1px 5px' : 0,
                fontWeight:   part.type !== 'normal' ? 800 : 400,
              }}>
                {part.text}
              </span>
            ))}
          </div>
        ))}
      </div>

      {explain.output !== undefined && (
        <div style={{
          marginTop: 7, background: '#12102a', borderRadius: 10,
          padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 10,
          border: '1px solid rgba(91,92,246,.25)',
        }}>
          <span style={{
            fontSize: 9, fontWeight: 700, color: '#5b5cf6',
            letterSpacing: '.06em', fontFamily: 'monospace',
          }}>OUTPUT</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14, color: '#10b981', fontWeight: 700,
          }}>{explain.output}</span>
        </div>
      )}

      {explain.tip && (
        <div style={{
          marginTop: 7, background: 'rgba(91,92,246,.13)',
          border: '1px solid rgba(91,92,246,.22)',
          borderRadius: 10, padding: '8px 12px',
          fontSize: 12, color: '#818cf8', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
          <span>{explain.tip}</span>
        </div>
      )}
    </div>
  );
}
