import { useState, useEffect } from 'react';

const NODES = [
  { id: 'expertise',  label: 'Expertise'  },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'community',  label: 'Community'  },
  { id: 'contact',    label: 'Contact'    },
  { id: 'education',  label: 'Education'  },
];

function OrbitalWheel({ onSegmentClick, profileImage }) {
  const [hovered, setHovered] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const SIZE = 420;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const orbitRadius = 155; // Distance from center to orbital nodes
  const nodeRadius = 28; // Radius of each orbital node circle
  const hubRadius = 50; // Radius of center photo hub

  // Calculate angle for each node (evenly distributed around circle)
  const anglePerNode = 360 / NODES.length;

  const generateNode = (index) => {
    const angle = (index * anglePerNode - 90) * (Math.PI / 180); // Start from top
    const x = cx + orbitRadius * Math.cos(angle);
    const y = cy + orbitRadius * Math.sin(angle);
    return { x, y, angle: index * anglePerNode };
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      role="group"
      aria-label="Orbital navigation wheel with 6 sections"
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ display: 'block' }}
        role="img"
        aria-label="Click nodes to navigate to sections"
      >
        {/* Orbit track (thin circle showing the orbital path) */}
        <circle
          cx={cx}
          cy={cy}
          r={orbitRadius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Clipping path for circular photo */}
        <defs>
          <clipPath id="hubClip">
            <circle cx={cx} cy={cy} r={hubRadius - 3} />
          </clipPath>
        </defs>

        {/* Center hub background */}
        <circle
          cx={cx}
          cy={cy}
          r={hubRadius}
          fill="var(--brand)"
          stroke="var(--border)"
          strokeWidth="3"
        />

        {/* Profile image or initials */}
        {profileImage && imageLoaded ? (
          <image
            x={cx - hubRadius + 3}
            y={cy - hubRadius + 3}
            width={hubRadius * 2 - 6}
            height={hubRadius * 2 - 6}
            href={profileImage}
            clipPath="url(#hubClip)"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
        ) : (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="32"
            fontWeight="700"
            fill="var(--surface)"
            fontFamily="var(--font-serif)"
          >
            PA
          </text>
        )}

        {/* Orbital nodes */}
        {NODES.map((node, idx) => {
          const { x, y } = generateNode(idx);
          const isHovered = hovered === node.id;
          const fillColor = isHovered ? 'var(--accent)' : 'var(--surface)';
          const strokeColor = isHovered ? 'var(--accent)' : 'var(--border)';
          const strokeWidth = isHovered ? '3' : '2';

          return (
            <g key={node.id}>
              {/* Connection line from hub to node */}
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={strokeColor}
                strokeWidth="1.5"
                opacity={isHovered ? '0.8' : '0.2'}
                pointerEvents="none"
              />

              {/* Node circle */}
              <circle
                cx={x}
                cy={y}
                r={nodeRadius}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSegmentClick(node.id)}
              />

              {/* Node label (abbreviated for space) */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="700"
                fill={isHovered ? 'var(--surface)' : 'var(--brand)'}
                fontFamily="var(--font-sans)"
                style={{
                  pointerEvents: 'none',
                  transition: 'fill 0.2s ease',
                }}
              >
                {node.label.substring(0, 3).toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip below SVG */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '0.75rem',
            background: 'var(--brand)',
            color: 'var(--surface)',
            padding: '0.4rem 0.8rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {NODES.find(n => n.id === hovered)?.label}
        </div>
      )}
    </div>
  );
}

export default OrbitalWheel;
