import { createContext, useContext, useState, useEffect } from 'react';

// ─── THEME OBJECTS (verbatim from prototype) ───────────────────────────────────

export const T = {
  A: {
    name: 'Warm Organicist',
    bg: '#f8f6f1', panelBg: '#f8f6f1', wheelBg: '#f8f6f1',
    text: '#1a1a1a', muted: '#767676', accent: '#c45c00', green: '#1a5c3a',
    hf: { fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 700 },
    bf: { fontFamily: "'DM Sans',system-ui,sans-serif" },
    card: 'card-a', tag: 'tag-a',
    navBg: 'rgba(248,246,241,0.94)', navBorder: 'rgba(26,26,26,0.12)',
    nodeB: '#ffffff', nodeS: '#1a1a1a', spoke: '#d4cfc7', hubB: '#1a1a1a',
    divider: 'rgba(26,26,26,0.08)', lattice: true,
  },
  B: {
    name: 'Dark Technician',
    bg: '#111111', panelBg: '#111111', wheelBg: '#0e0e0e',
    text: '#f0ede6', muted: '#7a7a7a', accent: '#e06a1a', green: '#2a8a58',
    hf: { fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 800 },
    bf: { fontFamily: "'DM Sans',system-ui,sans-serif" },
    card: 'card-b', tag: 'tag-b',
    navBg: 'rgba(14,14,14,0.96)', navBorder: 'rgba(255,255,255,0.07)',
    nodeB: '#1c1c1c', nodeS: '#3a3a3a', spoke: '#282828', hubB: '#333',
    divider: 'rgba(255,255,255,0.06)', lattice: false,
  },
};

// ─── CONTEXT ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [vrn, setVrnState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pa_site') || '{}').vrn || 'A';
    } catch {
      return 'A';
    }
  });

  const th = T[vrn] || T.A;

  useEffect(() => {
    // Apply CSS vars for backward compat (ProjectModal uses var(--surface), etc.)
    const root = document.documentElement;
    root.style.setProperty('--accent', th.accent);
    root.style.setProperty('--accent-warm', th.accent);
    root.style.setProperty('--brand', th.text);
    root.style.setProperty('--surface', th.bg);
    root.style.setProperty('--surface-alt', th.panelBg);
    root.style.setProperty('--muted', th.muted);
    root.style.setProperty('--border', th.text);
    root.style.setProperty('--forest', th.green);
    root.style.setProperty('--font-serif', "'Playfair Display',Georgia,serif");
    root.style.setProperty('--font-sans', "'DM Sans',system-ui,sans-serif");
    document.body.style.background = th.bg;
  }, [th]);

  const setVrn = (v) => {
    if (!T[v]) return;
    setVrnState(v);
    try {
      const saved = JSON.parse(localStorage.getItem('pa_site') || '{}');
      localStorage.setItem('pa_site', JSON.stringify({ ...saved, vrn: v }));
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ vrn, th, setVrn }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
