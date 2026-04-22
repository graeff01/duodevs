function HLText({ text }) {
  const parts = [];
  const re = /("(?:[^"]*)")|(\b(?:const|let|var|function|return|if|else|for|while)\b)|((?:console|push|log|length|pop|shift|map|filter)\b)|(\b\d+\b)/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(<span key={last}>{text.slice(last, m.index)}</span>);
    if      (m[1]) parts.push(<span key={m.index} className="str">{m[1]}</span>);
    else if (m[2]) parts.push(<span key={m.index} className="kw">{m[2]}</span>);
    else if (m[3]) parts.push(<span key={m.index} className="fn">{m[3]}</span>);
    else if (m[4]) parts.push(<span key={m.index} className="num">{m[4]}</span>);
    last = m.index + m[0].length;
  }
  parts.push(<span key="tail">{text.slice(last)}</span>);
  return <>{parts}</>;
}

function HL({ line, fillWord }) {
  if (line.includes('___')) {
    const [before, after] = line.split('___');
    return (
      <span>
        <HLText text={before} />
        <span style={{
          background: 'rgba(91,92,246,.35)', border: '1.5px dashed rgba(91,92,246,.7)',
          borderRadius: 5, padding: '1px 10px', color: fillWord ? '#86efac' : '#a5b4fc',
          transition: 'color .3s', fontWeight: 700,
        }}>{fillWord || '___'}</span>
        <HLText text={after} />
      </span>
    );
  }
  return <HLText text={line} />;
}

export default function CodeBlock({ lines, fillWord }) {
  return (
    <div className="code">
      {lines.map((line, i) => (
        <div key={i}><HL line={line} fillWord={fillWord} /></div>
      ))}
    </div>
  );
}
