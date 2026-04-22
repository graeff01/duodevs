import { useState, useCallback, useEffect, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useSwipeBack } from './hooks/useSwipeBack';
import { DEFAULT_STATE } from './data';
import SplashScreen     from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import DashboardScreen  from './screens/DashboardScreen';
import MapScreen        from './screens/MapScreen';
import LessonScreen     from './screens/LessonScreen';
import CompletionScreen from './screens/CompletionScreen';
import RankingScreen    from './screens/RankingScreen';
import ProfileScreen    from './screens/ProfileScreen';

/* ─── Floating background code ─── */
const BG_SNIPPETS = [
  'const arr = [1, 2, 3];', 'function hello() {', '  return "world";',
  'arr.push(4);', 'console.log(arr);', 'if (x > 0) {',
  'for (let i=0;i<arr.length;i++)', 'const sum = arr.reduce((a,b)=>a+b,0);',
  'arr.map(x => x * 2)', '// arrays são incríveis!', 'let nums = [];',
  'typeof undefined', 'arr.filter(x => x > 2)', 'const [a,b,...rest] = arr;',
];

function FloatingCode() {
  const items = BG_SNIPPETS.map((text, i) => ({
    text, left: (i * 7.3) % 95,
    dur:   22 + (i * 3.7) % 18,
    delay: -((i * 2.1) % (22 + (i * 3.7) % 18)),
  }));
  return (
    <div className="bg-code">
      {items.map((it, i) => (
        <span key={i} style={{ left: `${it.left}%`, animationDuration: `${it.dur}s`, animationDelay: `${it.delay}s` }}>
          {it.text}
        </span>
      ))}
    </div>
  );
}

/* ─── PWA install prompt ─── */
function InstallBanner({ onInstall, onDismiss }) {
  return (
    <div className="install-banner">
      <div style={{ fontSize: 28 }}>📲</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>Instalar StackUp</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>Adicione à tela inicial para usar offline</div>
      </div>
      <button onClick={onInstall} style={{
        background: '#5b5cf6', color: 'white', border: 'none', borderRadius: 10,
        padding: '8px 14px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
        fontSize: 13, cursor: 'pointer', flexShrink: 0,
      }}>Instalar</button>
      <button onClick={onDismiss} style={{
        background: 'transparent', color: 'rgba(255,255,255,.4)', border: 'none',
        fontSize: 20, cursor: 'pointer', padding: '0 6px', flexShrink: 0,
      }}>✕</button>
    </div>
  );
}

/* ─── Navigation constants ─── */
const TAB_ORDER   = ['dashboard', 'map', 'ranking', 'profile'];
const TAB_SCREENS = new Set(TAB_ORDER);

function AppInner() {
  // navStack drives which screen renders; top of stack = current screen
  const [navStack, setNavStack] = useState(['splash']);
  const [animDir,  setAnimDir]  = useState('right');
  const [animKey,  setAnimKey]  = useState(0);

  // Ref to always read current screen without stale closures
  const currentScreenRef = useRef('splash');

  const screen    = navStack[navStack.length - 1];
  const canGoBack = navStack.length > 1 && !TAB_SCREENS.has(screen);

  const [gs, setGs] = useState(() => {
    try { const s = localStorage.getItem('su_gs'); if (s) return { ...DEFAULT_STATE, ...JSON.parse(s) }; } catch {}
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try { localStorage.setItem('su_gs', JSON.stringify(gs)); } catch {}
  }, [gs]);

  /* ── goTo: the single navigation function ── */
  const goTo = useCallback((newScreen, explicitDir) => {
    const current = currentScreenRef.current;
    if (current === newScreen) return; // already here, do nothing

    // Determine animation direction
    let dir = explicitDir;
    if (!dir) {
      if (TAB_SCREENS.has(newScreen) && TAB_SCREENS.has(current)) {
        // Tab order: slide left when going to a later tab, right when going back
        dir = TAB_ORDER.indexOf(newScreen) > TAB_ORDER.indexOf(current) ? 'right' : 'left';
      } else {
        dir = 'right';
      }
    }

    setAnimDir(dir);
    setAnimKey(k => k + 1);
    currentScreenRef.current = newScreen;
    window.history.pushState({ screen: newScreen }, '');

    if (TAB_SCREENS.has(newScreen)) {
      // Tab switch: flat replace — no stacking between tabs
      setNavStack([newScreen]);
    } else {
      // Flow screen (lesson, completion, onboarding): push on top
      setNavStack(prev => [...prev, newScreen]);
    }
  }, []);

  /* ── goBack ── */
  const goBack = useCallback(() => {
    setNavStack(prev => {
      if (prev.length <= 1) return prev;
      const target = prev[prev.length - 2];
      setAnimDir('left');
      setAnimKey(k => k + 1);
      currentScreenRef.current = target;
      return prev.slice(0, -1);
    });
  }, []);

  /* Hardware / browser back button */
  useEffect(() => {
    window.history.replaceState({ screen: 'splash' }, '');
    const handler = () => { if (navStack.length > 1) goBack(); };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [navStack.length, goBack]);

  /* PWA install prompt */
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall,   setShowInstall]   = useState(false);
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); setShowInstall(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  const handleInstall = async () => {
    if (installPrompt) { installPrompt.prompt(); await installPrompt.userChoice; setInstallPrompt(null); }
    setShowInstall(false);
  };

  /* Swipe-back gesture */
  const swipeHandlers = useSwipeBack(goBack, canGoBack);

  const props = { goTo, gs, setGs };

  const screens = {
    splash:     <SplashScreen     {...props} />,
    onboarding: <OnboardingScreen {...props} />,
    dashboard:  <DashboardScreen  {...props} />,
    map:        <MapScreen        {...props} />,
    lesson:     <LessonScreen     {...props} />,
    completion: <CompletionScreen {...props} />,
    ranking:    <RankingScreen    {...props} />,
    profile:    <ProfileScreen    {...props} />,
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FloatingCode />
      <div className="phone" {...swipeHandlers}>
        <div className="phone-notch" />
        <div className="phone-inner">
          <div
            key={animKey}
            className={`anim-${animDir}`}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            {screens[screen] || screens.splash}
          </div>
        </div>
        {showInstall && <InstallBanner onInstall={handleInstall} onDismiss={() => setShowInstall(false)} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
