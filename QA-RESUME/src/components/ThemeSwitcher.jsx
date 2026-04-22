import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { vrn, setVrn } = useTheme();

  const options = [
    { key: 'A', icon: '☀', label: 'Light Organicist' },
    { key: 'B', icon: '●', label: 'Dark Technician' },
  ];

  return (
    <div role="group" aria-label="Theme switcher" style={{ display: 'flex', gap: '0.25rem' }}>
      {options.map(({ key, icon, label }) => (
        <button
          key={key}
          onClick={() => setVrn(key)}
          title={label}
          aria-label={`Switch to ${label}`}
          aria-pressed={vrn === key}
          style={{
            width: 32,
            height: 32,
            border: vrn === key ? '2px solid var(--accent)' : '1.5px solid var(--border)',
            background: vrn === key ? 'var(--accent)' : 'transparent',
            color: vrn === key ? '#fff' : 'var(--brand)',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
            outline: 'none',
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
