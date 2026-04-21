import { createContext, useContext, useState, useEffect } from 'react';

// ─── THEME DEFINITIONS ────────────────────────────────────────────────────────

const THEMES = {
  'warm-organicist': {
    name: 'Warm Organicist',
    label: 'A',
    '--accent': '#c45c00',
    '--accent-warm': '#ff6b35',
    '--brand': '#1a1a1a',
    '--surface': '#f8f6f1',
    '--surface-alt': '#f0ede6',
    '--surface-dark': '#222222',
    '--muted': '#767676',
    '--border': '#1a1a1a',
    '--forest': '#1a5c3a',
  },
  'dark-technician': {
    name: 'Dark Technician',
    label: 'B',
    '--accent': '#00d9ff',
    '--accent-warm': '#0099cc',
    '--brand': '#e8e8e8',
    '--surface': '#0a0e27',
    '--surface-alt': '#141829',
    '--surface-dark': '#1a1f3a',
    '--muted': '#888888',
    '--border': '#333366',
    '--forest': '#00aa66',
  },
  'clean-modernist': {
    name: 'Clean Modernist',
    label: 'C',
    '--accent': '#6366f1',
    '--accent-warm': '#818cf8',
    '--brand': '#1f2937',
    '--surface': '#ffffff',
    '--surface-alt': '#f3f4f6',
    '--surface-dark': '#111827',
    '--muted': '#6b7280',
    '--border': '#d1d5db',
    '--forest': '#059669',
  },
};

// ─── CONTEXT ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Load from localStorage, fallback to 'warm-organicist'
    if (typeof window === 'undefined') return 'warm-organicist';
    return localStorage.getItem('theme') || 'warm-organicist';
  });

  useEffect(() => {
    // Apply theme CSS variables to :root
    const theme = THEMES[currentTheme];
    if (!theme) return;

    Object.entries(theme).forEach(([key, value]) => {
      if (key.startsWith('--')) {
        document.documentElement.style.setProperty(key, value);
      }
    });

    // Persist to localStorage
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const switchTheme = (themeKey) => {
    if (THEMES[themeKey]) {
      setCurrentTheme(themeKey);
    }
  };

  const value = {
    currentTheme,
    currentThemeObj: THEMES[currentTheme],
    themes: THEMES,
    switchTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
