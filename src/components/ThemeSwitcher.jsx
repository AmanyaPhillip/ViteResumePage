import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher({ th }) {
  const { vrn, setVrn } = useTheme();
  const dk = vrn === 'B';

  const handleToggle = () => setVrn(dk ? 'A' : 'B');

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={(e) => {
        const b = e.currentTarget;
        b.style.background = dk ? '#f8f6f1' : th.text;
        b.style.borderColor = dk ? '#f8f6f1' : th.text;
        const label = b.querySelector('[data-label]');
        if (label) label.style.color = dk ? th.text : th.bg;
      }}
      onMouseLeave={(e) => {
        const b = e.currentTarget;
        b.style.background = dk ? '#e06a1a' : 'transparent';
        b.style.borderColor = dk ? '#e06a1a' : 'rgba(26,26,26,0.18)';
        const label = b.querySelector('[data-label]');
        if (label) label.style.color = dk ? '#fff' : th.text;
      }}
      title={dk ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={dk ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      style={{
        background: dk ? '#e06a1a' : 'transparent',
        border: `1.5px solid ${dk ? '#e06a1a' : 'rgba(26,26,26,0.18)'}`,
        borderRadius: 24,
        cursor: 'pointer',
        padding: '.32rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '.45rem',
        transition: 'background .18s, border-color .18s',
        flexShrink: 0,
        outline: 'none',
      }}
    >
      <span style={{ fontSize: '1rem', lineHeight: 1, display: 'block' }}>
        {dk ? '☀️' : '🌙'}
      </span>
      <div
        data-label
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: '.62rem',
          fontWeight: 700,
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          color: dk ? '#fff' : th.text,
          transition: 'color .18s',
        }}
      >
        {dk ? 'Light' : 'Dark'}
      </div>
    </button>
  );
}
