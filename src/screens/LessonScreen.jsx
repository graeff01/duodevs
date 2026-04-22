import { useState } from 'react';
import Stax from '../components/Stax';
import CodeBlock from '../components/CodeBlock';
import { useTheme } from '../context/ThemeContext';
import { QUESTIONS } from '../data';

export default function LessonScreen({ goTo, gs, setGs }) {
  const { t } = useTheme();
  const [qIdx, setQIdx]       = useState(0);
  const [sel, setSel]         = useState(null);
  const [showFb, setShowFb]   = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore]     = useState(0);
  const [qKey, setQKey]       = useState(0);
  const [hearts, setHearts]   = useState(5);

  const q = QUESTIONS[qIdx];
  const isLast = qIdx === QUESTIONS.length - 1;
  const progress = (qIdx / QUESTIONS.length) * 100;

  const pick = (i) => {
    if (sel !== null) return;
    const ok = i === q.answer;
    setSel(i); setCorrect(ok); setShowFb(true);
    if (ok) setScore(s => s + 1);
    else setHearts(h => Math.max(0, h - 1));
  };

  const cont = () => {
    if (isLast) {
      const earned = (score + (correct ? 1 : 0)) * 22 + 10;
      setGs(s => ({ ...s, xp: Math.min(s.xp + earned, s.xpMax), coins: s.coins + Math.round(earned / 2) }));
      goTo('completion', 'right');
    } else {
      setQIdx(q => q + 1); setSel(null); setShowFb(false); setCorrect(false); setQKey(k => k + 1);
    }
  };

  const fillWord = sel !== null && q.type === 'fill' ? q.opts[q.answer] : null;

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: t.bg, position: 'relative' }}>
      <div className="sbar" style={{ color: t.statusBar }}>
        <span className="sbar-time">9:41</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ fontSize: 12, opacity: i < hearts ? 1 : .2, transition: 'opacity .3s' }}>❤️</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '4px 20px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => goTo('map', 'left')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, color: t.textFaint, padding: 0, lineHeight: 1 }}>✕</button>
          <div style={{ flex: 1, height: 8, background: t.xpTrack, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg,#5b5cf6,#8b5cf6)', borderRadius: 4, width: progress + '%', transition: 'width .5s ease' }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.textMuted, minWidth: 28, textAlign: 'right' }}>
            {qIdx + 1}/{QUESTIONS.length}
          </span>
        </div>
      </div>

      <div key={qKey} className="anim-right scroll" style={{ padding: '2px 20px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: t.text, lineHeight: 1.4, marginBottom: 14 }}>{q.q}</div>
        {q.code && <CodeBlock lines={q.code} fillWord={fillWord} />}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          {q.opts.map((opt, i) => {
            let cls = 'opt';
            if (sel === i)               cls += correct ? ' correct' : ' wrong';
            else if (showFb && i === q.answer) cls += ' reveal';
            return (
              <button key={i} className={cls} onClick={() => pick(i)} disabled={sel !== null}>
                <span style={{
                  width: 26, height: 26, borderRadius: 8,
                  background: t.isDark ? 'rgba(91,92,246,.2)' : '#f0efff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: '#5b5cf6', flexShrink: 0,
                }}>{String.fromCharCode(65 + i)}</span>
                {opt}
                {showFb && i === q.answer && <span style={{ marginLeft: 'auto', fontSize: 16 }}>✓</span>}
                {showFb && sel === i && !correct && i !== q.answer && <span style={{ marginLeft: 'auto', fontSize: 16 }}>✗</span>}
              </button>
            );
          })}
        </div>
      </div>

      {showFb && (
        <div className={`fb-panel ${correct ? 'fb-correct' : 'fb-wrong'}`}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ flexShrink: 0, marginTop: 2 }}>
              <Stax size={44} mood={correct ? 'excited' : 'sad'} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: correct ? '#065f46' : '#991b1b', marginBottom: 4 }}>
                {correct ? 'Perfeito! 🎉' : 'Quase lá!'}
              </div>
              <div style={{ fontSize: 13, color: correct ? '#065f46' : '#7f1d1d', lineHeight: 1.55 }}>{q.fb}</div>
            </div>
          </div>
          <button className={`btn ${correct ? 'btn-green' : 'btn-primary'}`} onClick={cont}>
            {isLast ? 'Ver resultado! 🏆' : 'Continuar →'}
          </button>
        </div>
      )}
    </div>
  );
}
