import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const S = {
  serif: { fontFamily: 'var(--font-serif)' },
  mono: { fontFamily: 'var(--font-sans)' },
  label: { fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' },
};

export default function ExperienceModal({ job, th, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        animation: 'fadeIn 0.3s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: th.bg,
          border: `2px solid ${th.text}`,
          boxShadow: `6px 6px 0px ${th.text}`,
          borderRadius: 0,
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: th.text,
            opacity: 0.6,
            transition: 'opacity 0.2s ease',
            padding: 0,
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.6';
          }}
          title="Close (Esc)"
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: '2rem', paddingRight: '2rem' }}>
          <h2
            style={{
              ...S.serif,
              fontSize: '1.75rem',
              fontWeight: 700,
              margin: '0 0 0.5rem',
            }}
          >
            {job.role}
          </h2>
          <div
            style={{
              ...S.mono,
              fontSize: '0.9rem',
              color: th.accent,
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            {job.company} · {job.location}
          </div>
          <div
            style={{
              ...S.label,
              fontSize: '0.85rem',
              color: th.muted,
            }}
          >
            {job.period}
          </div>
        </div>

        {/* All points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {job.points.map((p, j) => (
            <div
              key={j}
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                paddingBottom: '1rem',
                borderBottom: j < job.points.length - 1 ? `1px solid ${th.border || '#e0e0e0'}` : 'none',
              }}
            >
              <span
                style={{
                  color: '#c45c00',
                  fontSize: '0.7rem',
                  marginTop: '0.6rem',
                  flexShrink: 0,
                }}
              >
                ▸
              </span>
              <div>
                <h4
                  style={{
                    ...S.label,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: th.text,
                    margin: '0 0 0.4rem',
                  }}
                >
                  {p.label}
                </h4>
                <p
                  style={{
                    ...S.mono,
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    margin: 0,
                    color: th.text,
                  }}
                >
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
