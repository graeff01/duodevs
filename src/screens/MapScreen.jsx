import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import BottomNav from '../components/BottomNav';
import { LANGS, NODES_BY_TRACK, NODE_OFFSETS, TRACKS } from '../data';

/* Build dynamic node list from gs progress */
function buildNodes(gs) {
  const base = NODES_BY_TRACK[gs.track] ?? NODES_BY_TRACK.frontend;
  const completed = gs.completedNodes ?? [];
  const active = gs.activeNode ?? 0;
  return base.map((n, idx) => {
    let state = 'locked';
    if (completed.includes(n.id)) state = 'done';
    else if (n.id === active)     state = 'active';
    return { ...n, state, stars: state === 'done' ? 3 : 0, offset: NODE_OFFSETS[idx] ?? 0 };
  });
}

/* Node color/gradient by state — 145deg for 3D light-from-top-left */
const nodeStyle = (node) => {
  if (node.boss)               return { bg: 'linear-gradient(145deg,#fb923c,#ef4444,#b91c1c)', shadow: 'rgba(239,68,68,.6)',  border: '#ef4444' };
  if (node.state === 'done')   return { bg: 'linear-gradient(145deg,#34d399,#10b981,#065f46)', shadow: 'rgba(16,185,129,.55)', border: '#10b981' };
  if (node.state === 'active') return { bg: 'linear-gradient(145deg,#818cf8,#5b5cf6,#3730a3)', shadow: 'rgba(91,92,246,.65)', border: '#5b5cf6' };
  return                              { bg: 'linear-gradient(145deg,#2d2b52,#1e1c3a,#151230)', shadow: 'rgba(0,0,0,.35)',      border: '#2d2b52' };
};

/* Connector state between nodes i → i+1 */
const connState = (nodes, i) => {
  const a = nodes[i].state;
  if (a === 'done')   return 'done';
  if (a === 'active') return 'active';
  return 'locked';
};

/* ─── SVG Curved Connector ─── */
function Connector({ fromOffset, toOffset, state }) {
  const W = 300, H = 88;
  const cx = W / 2;
  const x0 = cx + fromOffset * 0.72;
  const x1 = cx + toOffset * 0.72;
  const my = H / 2;

  const color   = state === 'done' ? '#10b981' : state === 'active' ? '#5b5cf6' : '#2a2750';
  const opacity = state === 'locked' ? 0.35 : 1;
  const dash    = state === 'done' ? '' : '10 7';
  const glow    = state === 'active' || state === 'done';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={W} height={H} style={{ overflow: 'visible', display: 'block' }}>
        {/* Glow layer */}
        {glow && (
          <path
            d={`M ${x0} 0 C ${x0} ${my} ${x1} ${my} ${x1} ${H}`}
            stroke={color} strokeWidth="10" fill="none" opacity="0.15"
            strokeLinecap="round"
          />
        )}
        {/* Main line */}
        <path
          d={`M ${x0} 0 C ${x0} ${my} ${x1} ${my} ${x1} ${H}`}
          stroke={color} strokeWidth={state === 'done' ? 4 : 3} fill="none"
          strokeDasharray={dash} strokeLinecap="round" opacity={opacity}
          style={state === 'active' ? { animation: 'dashFlow 1.5s linear infinite' } : {}}
        />
      </svg>
    </div>
  );
}

/* ─── Single Map Node — 3D style ─── */
function MapNode({ node, onPress, t }) {
  const [pressed, setPressed] = useState(false);
  const ns = nodeStyle(node);
  const size = node.boss ? 82 : node.state === 'active' ? 78 : 70;
  const isLocked = node.state === 'locked';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

      <div style={{ position: 'relative' }}>

        {/* Pulse rings */}
        {node.state === 'active' && (
          <>
            <div style={{
              position: 'absolute', inset: -16, borderRadius: '50%',
              border: '2px solid rgba(91,92,246,.28)',
              animation: 'ringPulse 2s ease-out infinite',
            }} />
            <div style={{
              position: 'absolute', inset: -9, borderRadius: '50%',
              border: '2px solid rgba(91,92,246,.45)',
              animation: 'ringPulse 2s .55s ease-out infinite',
            }} />
          </>
        )}

        {/* Boss glow */}
        {node.boss && (
          <div style={{
            position: 'absolute', inset: -14, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,.28) 0%, transparent 70%)',
            animation: 'pulse2 2s ease-in-out infinite',
          }} />
        )}

        {/* 3D ground shadow ellipse */}
        <div style={{
          position: 'absolute', bottom: -10, left: '50%',
          transform: 'translateX(-50%)',
          width: size * 0.76, height: 14, borderRadius: '50%',
          background: isLocked ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.55)',
          filter: 'blur(7px)', zIndex: 0,
        }} />

        {/* Node button */}
        <div
          onMouseDown={() => !isLocked && setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          onTouchStart={() => !isLocked && setPressed(true)}
          onTouchEnd={() => { setPressed(false); if (!isLocked) onPress(); }}
          onClick={() => !isLocked && onPress()}
          style={{
            width: size, height: size, borderRadius: '50%',
            background: ns.bg,
            border: `2.5px solid ${ns.border}`,
            boxShadow: isLocked ? 'none' : [
              `0 12px 32px ${ns.shadow}`,
              `0 5px 0 rgba(0,0,0,.42)`,
              `inset 0 1px 0 rgba(255,255,255,.22)`,
              `0 0 0 1px rgba(255,255,255,.06)`,
            ].join(', '),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: isLocked ? 'default' : 'pointer',
            transition: 'transform .14s, box-shadow .14s',
            transform: pressed ? 'scale(.91) translateY(4px)' : 'scale(1)',
            opacity: isLocked ? 0.48 : 1,
            position: 'relative', zIndex: 2, flexShrink: 0,
          }}
        >
          {/* Inner specular highlight */}
          {!isLocked && (
            <div style={{
              position: 'absolute', top: '11%', left: '14%',
              width: '44%', height: '36%', borderRadius: '50%',
              background: 'rgba(255,255,255,.18)',
              filter: 'blur(4px)', pointerEvents: 'none',
            }} />
          )}

          {node.state === 'done'
            ? <span style={{ fontSize: 26, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.5))' }}>✓</span>
            : node.state === 'locked' && !node.boss
            ? <span style={{ fontSize: 22, opacity: 0.6 }}>🔒</span>
            : <span style={{ fontSize: node.boss ? 32 : 26, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.55))' }}>{node.emoji}</span>
          }
        </div>

        {/* "AQUI" badge */}
        {node.state === 'active' && (
          <div style={{
            position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
            background: '#f59e0b', color: '#1a1740',
            borderRadius: 8, padding: '3px 9px',
            fontSize: 9, fontWeight: 900, letterSpacing: '.06em',
            whiteSpace: 'nowrap', boxShadow: '0 3px 12px rgba(245,158,11,.55)',
            animation: 'fadeIn .3s ease',
          }}>VOCÊ ESTÁ AQUI ▼</div>
        )}
      </div>

      {/* Label + stars */}
      <div style={{ marginTop: 14, textAlign: 'center', minWidth: 80, maxWidth: 90 }}>
        <div style={{
          fontSize: 12, fontWeight: 800,
          color: node.state === 'active' ? '#a5b4fc'
               : node.state === 'done'   ? '#6ee7b7'
               : node.boss               ? '#fb923c'
               : '#4b4a6b',
          lineHeight: 1.3,
        }}>{node.label}</div>

        {node.state === 'done' && (
          <div style={{ display: 'flex', gap: 1, justifyContent: 'center', marginTop: 3 }}>
            {[0,1,2].map(s => (
              <span key={s} style={{ fontSize: 10, color: s < node.stars ? '#f59e0b' : '#2a2750' }}>★</span>
            ))}
          </div>
        )}

        {node.state !== 'done' && (
          <div style={{
            fontSize: 10, fontWeight: 700, marginTop: 4,
            color: node.state === 'active' ? '#a5b4fc' : '#3d3b5e',
          }}>+{node.xp} XP</div>
        )}
      </div>

      {/* Active CTA card */}
      {node.state === 'active' && (
        <div
          onClick={onPress}
          style={{
            marginTop: 12, background: 'linear-gradient(135deg,#5b5cf6,#7c3aed)',
            borderRadius: 14, padding: '10px 20px',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 8px 24px rgba(91,92,246,.5), 0 3px 0 rgba(0,0,0,.35)',
            cursor: 'pointer', animation: 'fadeUp .4s ease',
            border: '1px solid rgba(255,255,255,.14)',
          }}
        >
          <span style={{ fontSize: 16 }}>▶</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>Jogar agora</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.6)' }}>{node.lessons} lições · +{node.xp} XP</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Animated cloud layer ─── */
function CloudLayer({ isDark }) {
  const clouds = [
    { w: 190, h: 58, top: '6%',  left: '2%',  op: 0.062, dur: 20, delay: 0 },
    { w: 130, h: 44, top: '19%', left: '57%', op: 0.048, dur: 27, delay: -7 },
    { w: 230, h: 74, top: '34%', left: '-7%', op: 0.068, dur: 17, delay: -4 },
    { w: 105, h: 36, top: '52%', left: '63%', op: 0.042, dur: 31, delay: -13 },
    { w: 175, h: 60, top: '68%', left: '7%',  op: 0.058, dur: 23, delay: -9 },
    { w: 95,  h: 32, top: '83%', left: '51%', op: 0.05,  dur: 19, delay: -3 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      <style>{`
        @keyframes cldA { 0%,100%{transform:translate(0,0)} 33%{transform:translate(14px,-5px)} 66%{transform:translate(-9px,6px)} }
        @keyframes cldB { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-12px,8px)} 66%{transform:translate(10px,-4px)} }
        @keyframes cldC { 0%,100%{transform:translate(0,0)} 50%{transform:translate(9px,9px)} }
      `}</style>
      {clouds.map((c, i) => (
        <div key={i} style={{
          position: 'absolute', top: c.top, left: c.left,
          width: c.w, height: c.h, borderRadius: '50%',
          background: isDark ? 'rgba(180,180,255,1)' : 'rgba(255,255,255,1)',
          filter: `blur(${isDark ? 26 : 20}px)`,
          opacity: c.op,
          animation: `${['cldA','cldB','cldC'][i % 3]} ${c.dur}s ${c.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

/* ─── Cartographic background ─── */

// Pre-compute topographic contour paths (module-level, no re-computation on render)
const _topo = (cx, cy, rx, ry, level, total, seed) => {
  const scale = 1 - (level / total) * 0.68;
  const amp   = rx * 0.17 * (1 - level / total) + rx * 0.045;
  const pts   = 72;
  let d = '';
  for (let i = 0; i <= pts; i++) {
    const a = (i / pts) * Math.PI * 2;
    const n = amp * Math.sin(4 * a + seed)
            + amp * 0.44 * Math.sin(8 * a + seed * 1.7)
            + amp * 0.22 * Math.sin(13 * a + seed * 2.3)
            + amp * 0.11 * Math.sin(2 * a + seed * 0.6);
    d += `${i === 0 ? 'M' : 'L'} ${(cx + (rx * scale + n) * Math.cos(a)).toFixed(1)} ${(cy + (ry * scale + n * 0.72) * Math.sin(a)).toFixed(1)} `;
  }
  return d + 'Z';
};

const TOPO_HILLS = [
  { cx: 160, cy: 125, rx: 108, ry: 82, levels: 5, seed: 1.2 },
  { cx: 315, cy: 305, rx: 88,  ry: 70, levels: 4, seed: 2.5 },
  { cx: 72,  cy: 395, rx: 74,  ry: 58, levels: 4, seed: 3.8 },
  { cx: 330, cy: 525, rx: 96,  ry: 76, levels: 5, seed: 0.7 },
  { cx: 155, cy: 645, rx: 80,  ry: 62, levels: 4, seed: 1.9 },
  { cx: 235, cy: 765, rx: 68,  ry: 52, levels: 3, seed: 4.5 },
];
const CONTOURS = TOPO_HILLS.map(h =>
  Array.from({ length: h.levels }, (_, l) => ({ d: _topo(h.cx, h.cy, h.rx, h.ry, l, h.levels, h.seed), l }))
);

const MAP_LABELS = [
  { x: 158, y: 112, text: 'TERRA DO CÓDIGO' },
  { x: 304, y: 292, text: 'VALE DOS BUGS' },
  { x: 68,  y: 382, text: 'FLORESTA TS' },
  { x: 322, y: 512, text: 'PICO C++' },
  { x: 148, y: 630, text: 'CAVERNA DARK' },
];

function CompassRose({ isDark }) {
  const c = isDark ? '#a5b4fc' : '#8b5a2b';
  const r = isDark ? '#f87171' : '#c0392b';
  return (
    <svg width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="27" fill="none" stroke={c} strokeWidth="1"   opacity="0.5" />
      <circle cx="30" cy="30" r="21" fill="none" stroke={c} strokeWidth="0.6" opacity="0.3" />
      {/* Cardinal points */}
      <path d="M 30 3  L 34 24 L 30 20 L 26 24 Z" fill={r} opacity="0.9" />
      <path d="M 30 57 L 34 36 L 30 40 L 26 36 Z" fill={c} opacity="0.65" />
      <path d="M 57 30 L 36 34 L 40 30 L 36 26 Z" fill={c} opacity="0.65" />
      <path d="M 3  30 L 24 34 L 20 30 L 24 26 Z" fill={c} opacity="0.65" />
      {/* Ordinal points */}
      <path d="M 51 9  L 35 26 L 34 23 L 37 22 Z" fill={c} opacity="0.35" />
      <path d="M 51 51 L 35 34 L 38 33 L 37 36 Z" fill={c} opacity="0.35" />
      <path d="M 9  51 L 25 34 L 26 37 L 23 36 Z" fill={c} opacity="0.35" />
      <path d="M 9  9  L 25 26 L 22 27 L 23 24 Z" fill={c} opacity="0.35" />
      {/* Center */}
      <circle cx="30" cy="30" r="4.5" fill={c} opacity="0.85" />
      <circle cx="30" cy="30" r="2.2" fill="white" opacity="0.7" />
      {/* Labels */}
      <text x="30" y="9"  textAnchor="middle" fontSize="7"   fontWeight="900" fill={r} fontFamily="Georgia,serif">N</text>
      <text x="30" y="57" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={c} fontFamily="Georgia,serif">S</text>
      <text x="55" y="33" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={c} fontFamily="Georgia,serif">L</text>
      <text x="5"  y="33" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={c} fontFamily="Georgia,serif">O</text>
    </svg>
  );
}

function MapBg({ isDark }) {
  const stroke = isDark ? 'rgba(147,112,219,0.22)' : 'rgba(110,75,28,0.2)';

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 400 900" preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none"
              stroke={isDark ? 'rgba(100,80,200,0.07)' : 'rgba(100,70,30,0.06)'}
              strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Grid */}
        <rect width="400" height="900" fill="url(#mapgrid)" />

        {/* Topographic contours */}
        {CONTOURS.map((hillLevels, hi) =>
          hillLevels.map(({ d, l }) => (
            <path key={`${hi}-${l}`} d={d}
              fill={isDark
                ? `rgba(91,92,246,${Math.max(0.005, 0.048 - l * 0.009)})`
                : `rgba(148,102,32,${Math.max(0.005, 0.056 - l * 0.01)})`}
              stroke={stroke}
              strokeWidth={l === 0 ? 1.4 : 0.9}
            />
          ))
        )}

        {/* Coordinate dots */}
        {Array.from({ length: 10 }, (_, i) =>
          Array.from({ length: 5 }, (_, j) => (
            <circle key={`dot-${i}-${j}`}
              cx={40 + j * 80} cy={40 + i * 88} r="1.8"
              fill={isDark ? 'rgba(147,112,219,0.25)' : 'rgba(110,75,28,0.22)'}
            />
          ))
        )}

        {/* Map labels */}
        {MAP_LABELS.map(({ x, y, text }) => (
          <text key={text} x={x} y={y} textAnchor="middle"
            fontSize="7.5" fontWeight="700" letterSpacing="0.14em"
            fontFamily="Georgia, serif"
            fill={isDark ? 'rgba(147,112,219,0.25)' : 'rgba(110,75,28,0.22)'}
          >{text}</text>
        ))}

        {/* Scale bar */}
        <g transform="translate(18, 858)" opacity={isDark ? 0.32 : 0.26}>
          <rect x="0"  y="0" width="60" height="4" rx="2"
            fill={isDark ? '#a5b4fc' : '#8b5a2b'} />
          <rect x="0"  y="0" width="30" height="4" rx="2"
            fill={isDark ? '#6366f1' : '#5a3a1a'} />
          <text y="13" fontSize="6" fill={isDark ? '#a5b4fc' : '#8b5a2b'} fontFamily="Georgia,serif">0</text>
          <text x="25" y="13" fontSize="6" fill={isDark ? '#a5b4fc' : '#8b5a2b'} fontFamily="Georgia,serif">500m</text>
          <text x="55" y="13" fontSize="6" fill={isDark ? '#a5b4fc' : '#8b5a2b'} fontFamily="Georgia,serif">1km</text>
        </g>
      </svg>

      {/* Compass rose */}
      <div style={{ position: 'absolute', bottom: 80, right: 10, opacity: isDark ? 0.38 : 0.3 }}>
        <CompassRose isDark={isDark} />
      </div>

      {/* Edge vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isDark
          ? 'radial-gradient(ellipse 90% 80% at 50% 45%, transparent 55%, rgba(10,8,32,0.55) 100%)'
          : 'radial-gradient(ellipse 90% 80% at 50% 45%, transparent 55%, rgba(220,200,150,0.45) 100%)',
      }} />
    </div>
  );
}

/* ─── Main MapScreen ─── */
export default function MapScreen({ goTo, gs }) {
  const { t } = useTheme();
  const NODES = buildNodes(gs);
  const track = TRACKS.find(tr => tr.id === gs.track);
  const lang  = LANGS.find(l => l.id === gs.language) || LANGS[0];
  const headerLabel = track ? track.label : lang.label;
  const done  = NODES.filter(n => n.state === 'done').length;
  const total = NODES.length;
  const pct   = Math.round((done / total) * 100);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: t.isDark ? '#0a0820' : '#ece5cf', position: 'relative' }}>

      {/* Map texture — fixed behind everything, does NOT scroll */}
      <MapBg isDark={t.isDark} />
      <CloudLayer isDark={t.isDark} />

      {/* Status bar */}
      <div className="sbar" style={{ color: t.statusBar, flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <span className="sbar-time">9:41</span>
        <div style={{ color: t.statusBar, fontSize: 11 }}>▪▪▪ 100%</div>
      </div>

      {/* Header */}
      <div style={{ padding: '2px 20px 14px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <button onClick={() => goTo('dashboard', 'left')} style={{
            width: 36, height: 36, border: 'none',
            background: t.isDark ? 'rgba(91,92,246,.15)' : 'rgba(91,92,246,.1)',
            borderRadius: 10, cursor: 'pointer', fontSize: 18, color: '#5b5cf6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: t.text }}>{headerLabel}</div>
            <div style={{ fontSize: 11, color: t.textMuted }}>{done} de {total} tópicos · {pct}% completo</div>
          </div>
          <span className="tag tag-xp">⚡ {gs.xp} XP</span>
        </div>
        {/* Progress bar */}
        <div className="xptrack" style={{ height: 6 }}>
          <div className="xpfill" style={{ width: pct + '%', transition: 'width 1s ease' }} />
        </div>
      </div>

      {/* Scrollable map area */}
      <div
        className="scroll"
        style={{ flex: 1, minHeight: 0, position: 'relative', zIndex: 1 }}
      >

        {/* Add keyframes for map-specific animations */}
        <style>{`
          @keyframes ringPulse {
            0%   { transform: scale(1);   opacity: .7 }
            100% { transform: scale(1.6); opacity: 0  }
          }
          @keyframes dashFlow {
            to { stroke-dashoffset: -34; }
          }
        `}</style>

        {/* Node trail */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '24px 0 40px', position: 'relative', zIndex: 1,
        }}>
          {NODES.map((node, idx) => (
            <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Node itself, shifted horizontally */}
              <div style={{ transform: `translateX(${node.offset}px)`, transition: 'transform .3s' }}>
                <MapNode
                  node={node}
                  t={t}
                  onPress={() => node.state === 'active' && goTo('lesson', 'right')}
                />
              </div>

              {/* Curved connector to next node */}
              {idx < NODES.length - 1 && (
                <Connector
                  fromOffset={node.offset}
                  toOffset={NODES[idx + 1].offset}
                  state={connState(NODES, idx)}
                />
              )}
            </div>
          ))}

          {/* Bottom XP summary */}
          <div style={{
            marginTop: 24, padding: '14px 24px',
            background: t.isDark ? 'rgba(91,92,246,.1)' : 'rgba(91,92,246,.06)',
            borderRadius: 16, border: `1px solid ${t.isDark ? 'rgba(91,92,246,.2)' : 'rgba(91,92,246,.15)'}`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>🏆</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: t.text }}>Complete todos os tópicos</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>+2.010 XP no total</div>
          </div>
        </div>
      </div>

      <BottomNav screen="map" goTo={goTo} />
    </div>
  );
}
