import { useState } from 'react';
import Stax from '../components/Stax';
import { useTheme } from '../context/ThemeContext';
import { GOALS, TIMES, LANGS, TRACKS } from '../data';

export default function OnboardingScreen({ goTo, setGs }) {
  const { t } = useTheme();
  const [step, setStep]       = useState(0);
  const [goal, setGoal]       = useState(null);
  const [track, setTrack]     = useState(null);
  const [lang, setLang]       = useState(null);
  const [time, setTime]       = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const TOTAL = 4;
  const next = () => {
    if (step < TOTAL - 1) { setStep(s => s + 1); setAnimKey(k => k + 1); }
    else {
      setGs(s => ({ ...s, goal, track, dailyTime: time, language: lang, completedNodes: [], activeNode: 0 }));
      goTo('dashboard', 'right');
    }
  };

  const canNext =
    (step === 0 && goal)  ||
    (step === 1 && track) ||
    (step === 2 && lang)  ||
    (step === 3 && time);

  const moods = ['happy', 'thinking', 'excited', 'celebrating'];

  const selectedTrack = TRACKS.find(tr => tr.id === track);
  const trackLangs = selectedTrack ? LANGS.filter(l => selectedTrack.langs.includes(l.id)) : [];

  const goalCard = (active, color) => ({
    border: `2.5px solid ${active ? (color || '#5b5cf6') : t.border}`,
    borderRadius: 16, padding: '13px 16px',
    background: active ? (t.isDark ? 'rgba(91,92,246,.15)' : '#eef2ff') : t.surface,
    cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center',
    transition: 'all .2s', transform: active ? 'scale(1.01)' : 'scale(1)',
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: t.bg }}>
      <div className="sbar" style={{ color: t.statusBar }}><span className="sbar-time">9:41</span></div>
      <div style={{ padding: '10px 22px 0' }}>
        <div className="odots">
          {Array.from({ length: TOTAL }, (_, i) => (
            <div key={i} className={`odot${i < step ? ' done' : i === step ? ' on' : ''}`} />
          ))}
        </div>
      </div>

      <div key={animKey} className="anim-right"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 22px 0', minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <Stax size={68} mood={moods[step]} />
        </div>

        {/* Step 0 — Goal */}
        {step === 0 && (
          <>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 }}>Qual seu objetivo?</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 18 }}>Vou personalizar sua trilha 🗺️</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {GOALS.map(g => (
                <button key={g.id} onClick={() => setGoal(g.id)} style={goalCard(goal === g.id)}>
                  <span style={{ fontSize: 28 }}>{g.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{g.title}</div>
                    <div style={{ fontSize: 12, color: t.textMuted }}>{g.sub}</div>
                  </div>
                  {goal === g.id && <span style={{ marginLeft: 'auto', color: '#5b5cf6', fontSize: 20 }}>✓</span>}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 1 — Track */}
        {step === 1 && (
          <>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 }}>Qual é sua área?</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 16 }}>Vou montar sua trilha personalizada 🧭</div>
            <div className="scroll" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
              paddingBottom: 4, alignContent: 'start',
            }}>
              {TRACKS.map(tr => {
                const active = track === tr.id;
                return (
                  <button key={tr.id} onClick={() => { setTrack(tr.id); setLang(null); }} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                    padding: '14px 14px', borderRadius: 16,
                    border: `2.5px solid ${active ? tr.color : t.border}`,
                    background: active ? (t.isDark ? `${tr.color}22` : `${tr.color}14`) : t.surface,
                    cursor: 'pointer', transition: 'all .18s', textAlign: 'left',
                    transform: active ? 'scale(1.02)' : 'scale(1)',
                  }}>
                    <span style={{ fontSize: 26, marginBottom: 6 }}>{tr.icon}</span>
                    <div style={{ fontSize: 14, fontWeight: 800, color: active ? tr.color : t.text, marginBottom: 3 }}>
                      {tr.label}
                    </div>
                    <div style={{ fontSize: 10, color: t.textMuted, lineHeight: 1.4 }}>{tr.sub}</div>
                    {active && <div style={{ marginTop: 6, fontSize: 11, fontWeight: 700, color: tr.color }}>✓ Selecionado</div>}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Step 2 — Language (filtered by track) */}
        {step === 2 && selectedTrack && (
          <>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 2 }}>Escolha seu foco</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 14 }}>Pode mudar depois nas configurações ✨</div>
            <div className="scroll" style={{ paddingBottom: 4 }}>
              {/* Trilha Completa */}
              {(() => {
                const fullId = `${track}_full`;
                const active = lang === fullId;
                return (
                  <button onClick={() => setLang(fullId)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '13px 16px', borderRadius: 16, marginBottom: 10,
                    border: `2.5px solid ${active ? selectedTrack.color : t.border}`,
                    background: active
                      ? (t.isDark ? `${selectedTrack.color}22` : `${selectedTrack.color}14`)
                      : t.surface,
                    cursor: 'pointer', transition: 'all .18s',
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: active ? selectedTrack.color : (t.isDark ? 'rgba(255,255,255,.08)' : '#f0efff'),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, flexShrink: 0, transition: 'all .18s',
                      boxShadow: active ? `0 4px 14px ${selectedTrack.color}55` : 'none',
                    }}>🎯</div>
                    <div style={{ textAlign: 'left', flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: active ? selectedTrack.color : t.text }}>
                        Trilha Completa
                      </div>
                      <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1 }}>
                        Percurso guiado · Todas as tecnologias
                      </div>
                    </div>
                    {active && <span style={{ color: selectedTrack.color, fontSize: 18 }}>✓</span>}
                  </button>
                );
              })()}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {trackLangs.map(l => {
                  const active = lang === l.id;
                  return (
                    <button key={l.id} onClick={() => setLang(l.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px', borderRadius: 14,
                      border: `2px solid ${active ? l.color : t.border}`,
                      background: active ? (t.isDark ? `${l.color}22` : `${l.color}12`) : t.surface,
                      cursor: 'pointer', transition: 'all .18s',
                      transform: active ? 'scale(1.02)' : 'scale(1)',
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, background: l.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 900, color: 'white',
                        fontFamily: "'JetBrains Mono',monospace", flexShrink: 0,
                        boxShadow: active ? `0 4px 12px ${l.color}55` : 'none',
                      }}>{l.icon}</div>
                      <div style={{ textAlign: 'left', minWidth: 0 }}>
                        <div style={{
                          fontSize: 13, fontWeight: 700, color: active ? l.color : t.text,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>{l.label}</div>
                        <div style={{ fontSize: 10, color: t.textMuted, marginTop: 1 }}>
                          {l.badge.replace(/^[^\s]+\s/, '')}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Step 3 — Time */}
        {step === 3 && (
          <>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, marginBottom: 4 }}>Quanto tempo por dia?</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 18 }}>Sessões curtas = mais retenção 🧠</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {TIMES.map(tm => (
                <button key={tm.id} onClick={() => setTime(tm.id)} style={{
                  ...goalCard(time === tm.id),
                  justifyContent: 'space-between',
                  padding: '15px 18px',
                }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>{tm.label}</div>
                    <div style={{ fontSize: 12, color: t.textMuted }}>{tm.sub}</div>
                  </div>
                  {time === tm.id && <span style={{ color: '#5b5cf6', fontSize: 22 }}>✓</span>}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ padding: '18px 22px 32px', flexShrink: 0 }}>
        <button className="btn btn-primary" disabled={!canNext} onClick={next}>
          {step < TOTAL - 1 ? 'Continuar →' : 'Começar agora! ⚡'}
        </button>
      </div>
    </div>
  );
}
