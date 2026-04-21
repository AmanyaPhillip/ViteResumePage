import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { currentTheme, themes, switchTheme } = useTheme();

  return (
    <div
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 100,
        display: 'flex',
        gap: '0.5rem',
        backgroundColor: 'var(--surface)',
        border: '2px solid var(--border)',
        padding: '0.5rem',
        boxShadow: '4px 4px 0px var(--border)',
      }}
      role="group"
      aria-label="Theme switcher"
    >
      {Object.entries(themes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => switchTheme(key)}
          title={theme.name}
          aria-label={`Switch to ${theme.name}`}
          aria-pressed={currentTheme === key}
          style={{
            width: '32px',
            height: '32px',
            border: currentTheme === key ? '3px solid var(--accent)' : '2px solid var(--border)',
            background: theme['--surface'],
            cursor: 'pointer',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: theme['--brand'],
            transition: 'all 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            if (currentTheme !== key) {
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '';
          }}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
}
