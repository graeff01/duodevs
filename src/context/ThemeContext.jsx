import { createContext, useContext, useState, useEffect } from 'react';

const light = {
  bg:          '#f7f7ff',
  bgAlt:       '#f0efff',
  surface:     '#ffffff',
  surfaceAlt:  '#f7f7ff',
  text:        '#1a1740',
  textMuted:   '#6b7280',
  textFaint:   '#9ca3af',
  border:      '#e4e3f7',
  borderSoft:  'rgba(0,0,0,.06)',
  navBg:       '#ffffff',
  navBorder:   'rgba(0,0,0,.07)',
  navText:     '#9ca3af',
  statusBar:   '#1a1740',
  sbarIcons:   '#1a1740',
  card:        '#ffffff',
  cardShadow:  '0 4px 18px rgba(0,0,0,.06)',
  codeBg:      '#12102a',
  xpTrack:     '#e4e3f7',
  optBg:       '#ffffff',
  optBorder:   '#e4e3f7',
  optText:     '#1a1740',
  inputBg:     '#f0efff',
  divider:     '#e4e3f7',
  isDark:      false,
};

const dark = {
  bg:          '#0d0b1e',
  bgAlt:       '#100e24',
  surface:     '#1c1940',
  surfaceAlt:  '#13112a',
  text:        '#f0efff',
  textMuted:   '#a5b4fc',
  textFaint:   '#6b7280',
  border:      'rgba(255,255,255,.08)',
  borderSoft:  'rgba(255,255,255,.04)',
  navBg:       '#12102a',
  navBorder:   'rgba(255,255,255,.08)',
  navText:     '#4b5563',
  statusBar:   '#f0efff',
  sbarIcons:   '#f0efff',
  card:        '#1c1940',
  cardShadow:  '0 4px 18px rgba(0,0,0,.3)',
  codeBg:      '#07061a',
  xpTrack:     'rgba(255,255,255,.1)',
  optBg:       '#1c1940',
  optBorder:   'rgba(255,255,255,.1)',
  optText:     '#f0efff',
  inputBg:     'rgba(255,255,255,.06)',
  divider:     'rgba(255,255,255,.07)',
  isDark:      true,
};

const ThemeContext = createContext({ t: light, toggle: () => {} });

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('su_dark') === '1'; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('su_dark', isDark ? '1' : '0'); } catch {}
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ t: isDark ? dark : light, toggle: () => setIsDark(d => !d), isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
