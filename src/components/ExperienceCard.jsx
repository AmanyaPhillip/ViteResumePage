import { useState } from 'react';

const S = {
  serif: { fontFamily: 'var(--font-serif)' },
  mono: { fontFamily: 'var(--font-sans)' },
  label: { fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' },
};

export default function ExperienceCard({ job, index, th, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const pointsToShow = job.points.slice(0, 2);
  const hasMore = job.points.length > 2;
  const moreCount = job.points.length - 2;

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Timeline dot */}
      <div
        className="timeline-dot"
        style={{ background: index === 0 ? th.accent : th.text }}
      />

      {/* Card */}
      <div
        className={th.card}
        style={{
          padding: '2rem',
          cursor: 'pointer',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <h3
              style={{
                ...S.serif,
                fontSize: '1.35rem',
                fontWeight: 700,
                margin: '0 0 0.3rem',
              }}
            >
              {job.role}
            </h3>
            <div
              style={{
                ...S.mono,
                fontSize: '0.85rem',
                color: th.accent,
                fontWeight: 700,
              }}
            >
              {job.company} · {job.location}
            </div>
          </div>
          <span
            style={{
              border: `2px solid ${th.text}`,
              padding: '0.25rem 0.75rem',
              ...S.label,
              fontSize: '0.65rem',
              whiteSpace: 'nowrap',
            }}
          >
            {job.period}
          </span>
        </div>

        {/* Points - first 2 only */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {pointsToShow.map((p, j) => (
            <div
              key={j}
              style={{
                display: 'flex',
                gap: '0.65rem',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  color: '#c45c00',
                  fontSize: '0.6rem',
                  marginTop: '0.5rem',
                  flexShrink: 0,
                }}
              >
                ▸
              </span>
              <p
                style={{
                  ...S.mono,
                  fontSize: '0.865rem',
                  lineHeight: 1.7,
                  margin: 0,
                  color: th.text,
                }}
              >
                <strong style={{ fontWeight: 700 }}>{p.label}:</strong> {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* "More" indicator */}
        {hasMore && (
          <div
            style={{
              marginTop: '1rem',
              ...S.label,
              fontSize: '0.75rem',
              color: th.accent,
              fontWeight: 600,
            }}
          >
            +{moreCount} more {moreCount === 1 ? 'point' : 'points'} — click to expand
          </div>
        )}

        {/* View hint */}
        {isHovered && (
          <div
            style={{
              marginTop: '1rem',
              ...S.label,
              fontSize: '0.8rem',
              color: th.accent,
              fontWeight: 600,
              transition: 'opacity 0.2s ease',
              opacity: isHovered ? 1 : 0,
            }}
          >
            View →
          </div>
        )}
      </div>
    </div>
  );
}
