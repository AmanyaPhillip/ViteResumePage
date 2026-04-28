import { useEffect, useRef, useCallback } from 'react';

// ─── Shared style primitives (mirrors S object in App.jsx) ────────────────────
const label = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.65rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
};

const mono = { fontFamily: 'var(--font-sans)' };
const serif = { fontFamily: 'var(--font-serif)' };

// ─── Status badge ─────────────────────────────────────────────────────────────
// Maps a project status string to a CSS class defined in index.css.
// Adding a new status only requires a new entry here + a matching CSS class.
const STATUS_CLASS = {
  LIVE:       'status-badge-live',
  PORTFOLIO:  'status-badge-portfolio',
  INITIATIVE: 'status-badge-initiative',
};

function StatusBadge({ status }) {
  const cls = STATUS_CLASS[status] ?? 'status-badge-portfolio';
  return (
    <span
      className={cls}
      style={{ ...label, fontSize: '0.62rem', padding: '0.2rem 0.65rem', whiteSpace: 'nowrap' }}
    >
      {status}
    </span>
  );
}

// ─── Stack tag ────────────────────────────────────────────────────────────────
function StackTag({ tech, th }) {
  return (
    <span style={{
      border: `1.5px solid ${th?.muted}`,
      padding: '0.2rem 0.6rem',
      ...label, fontSize: '0.62rem',
      color: th?.muted,
      fontWeight: 600,
      background: th?.panelBg,
    }}>
      {tech}
    </span>
  );
}

// ─── ProjectModal ─────────────────────────────────────────────────────────────
/**
 * Props:
 *   project  — the project object from D.projects (may be null when closed)
 *   isOpen   — boolean controlling open state
 *   onClose  — () => void
 *   th       — theme object with colors (bg, text, accent, muted, etc.)
 *
 * Technique:
 *   Uses a native <dialog> element, which the browser places on its top-layer.
 *   This means z-index stacking contexts from the fixed left panel, navbar, etc.
 *   are completely bypassed — no portal needed.
 *
 *   showModal() / close() are called imperatively via a ref whenever isOpen
 *   changes. This keeps React state as the single source of truth while still
 *   leveraging the browser's built-in dialog accessibility (focus trap, Escape
 *   key, ::backdrop pseudo-element).
 */
export default function ProjectModal({ project, isOpen, onClose, th }) {
  const dialogRef = useRef(null);

  // Open / close the native dialog imperatively when isOpen changes
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      // Prevent body scroll while modal is open
      document.body.style.overflow = 'hidden';
    } else if (!isOpen && dialog.open) {
      dialog.close();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Cleanup on unmount — restore scroll if component is removed while open
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  // The native dialog fires a 'cancel' event on Escape key press.
  // We wire it to onClose so React state stays in sync.
  const handleCancel = useCallback((e) => {
    e.preventDefault(); // prevent the browser from closing without our knowledge
    onClose();
  }, [onClose]);

  // Click-outside: the ::backdrop is part of the dialog, so a click directly
  // on the <dialog> element (not its children) means the user clicked outside.
  const handleDialogClick = useCallback((e) => {
    if (e.target === dialogRef.current) onClose();
  }, [onClose]);

  // Don't render modal content at all if there's no project selected.
  // The <dialog> element itself always stays mounted so the ref is stable.
  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      onCancel={handleCancel}
      onClick={handleDialogClick}
      aria-label={project ? `${project.title} — project details` : 'Project details'}
      aria-modal="true"
    >
      {/* Inner card — click here does NOT bubble to the backdrop handler */}
      <div className="project-modal-inner" style={{
        background: th?.bg,
        border: `2px solid ${th?.text}`,
        boxShadow: `6px 6px 0px ${th?.text}`,
      }} onClick={e => e.stopPropagation()}>

        {/* ── Sticky header ── */}
        <div className="project-modal-header" style={{
          background: th?.bg,
          borderBottomColor: th?.text,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>

            {/* Left: title + status + stack */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Status badge sits above the title */}
              {project && <StatusBadge status={project.status} />}

              <h2 style={{
                ...serif,
                fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                margin: '0.55rem 0 0.9rem',
                letterSpacing: '-0.01em',
                color: th?.text,
              }}>
                {project?.title}
              </h2>

              {/* Stack tags */}
              {project?.stack && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.stack.map(tech => (
                    <StackTag key={tech} tech={tech} th={th} />
                  ))}
                </div>
              )}
            </div>

            {/* Right: close button */}
            <button
              onClick={onClose}
              aria-label="Close project details"
              style={{
                background: 'none',
                border: 'none',
                color: th?.text,
                width: '2rem',
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.5rem',
                opacity: 0.6,
                transition: 'opacity 0.2s ease',
                padding: 0,
              }}
              onMouseEnter={(e) => { e.target.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '0.6'; }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="project-modal-body" style={{
          background: th?.bg,
          color: th?.text,
        }}>

          {/* Short description (teaser) — acts as a lead-in to the personal statement */}
          {project?.description && (
            <p style={{
              ...mono,
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: th?.muted,
              fontStyle: 'italic',
              margin: '0 0 1.75rem',
              paddingBottom: '1.5rem',
              borderBottom: `1.5px solid ${th?.muted}`,
            }}>
              {project.description}
            </p>
          )}

          {/* Personal Statement — full narrative, shown only when it exists */}
          {project?.personalStatement ? (
            <div>
              <div style={{ ...label, fontSize: '0.6rem', color: th?.accent, marginBottom: '0.85rem' }}>
                Personal Statement
              </div>
              {/*
               * Split on double-newlines so multi-paragraph statements render
               * as proper <p> elements rather than one large block of text.
               */}
              {project.personalStatement.split('\n\n').map((para, i) => (
                <p key={i} style={{
                  ...mono,
                  fontSize: '0.92rem',
                  lineHeight: 1.85,
                  color: th?.text,
                  margin: i === 0 ? '0 0 1rem' : '0 0 1rem',
                }}>
                  {para.trim()}
                </p>
              ))}
            </div>
          ) : (
            /* Fallback for projects without a personalStatement */
            project?.bullets && project.bullets.length > 0 && (
              <div>
                <div style={{ ...label, fontSize: '0.6rem', color: th?.accent, marginBottom: '0.85rem' }}>
                  Highlights
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {project.bullets.map((b, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <span style={{ color: th?.accent, fontSize: '0.6rem', marginTop: '0.45rem', flexShrink: 0 }}>▸</span>
                      <span style={{ ...mono, fontSize: '0.88rem', lineHeight: 1.65, color: th?.muted }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          {/* GitHub link — shown if present */}
          {project?.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '1.75rem',
                ...label, fontSize: '0.65rem',
                color: th?.text,
                textDecoration: 'none',
                borderBottom: `2px solid ${th?.text}`,
                paddingBottom: '1px',
              }}
            >
              View on GitHub →
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}
