import { useState } from 'react';

const SEGMENTS = [
  { id: 'expertise',  label: 'Expertise'  },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'community',  label: 'Community'  },
  { id: 'contact',    label: 'Contact'    },
  { id: 'education',  label: 'Education'  },
];

// Converts degrees (0° = top, clockwise) to SVG x/y
function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

// Donut wedge path: outer arc → inner arc (reversed)
function wedgePath(cx, cy, rOuter, rInner, a1, a2) {
  const [ox1, oy1] = polar(cx, cy, rOuter, a1);
  const [ox2, oy2] = polar(cx, cy, rOuter, a2);
  const [ix1, iy1] = polar(cx, cy, rInner, a2);
  const [ix2, iy2] = polar(cx, cy, rInner, a1);
  const large = a2 - a1 > 180 ? 1 : 0;
  return [
    `M ${f(ox1)} ${f(oy1)}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${f(ox2)} ${f(oy2)}`,
    `L ${f(ix1)} ${f(iy1)}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${f(ix2)} ${f(iy2)}`,
    'Z',
  ].join(' ');
}

const f = (n) => n.toFixed(2);

export default function NexusWheel({ onSegmentClick }) {
  const [hovered, setHovered] = useState(null);

  const SIZE   = 300;
  const cx     = SIZE / 2;
  const cy     = SIZE / 2;
  const rOuter = 132;
  const rInner = 50;
  const GAP    = 3; // degrees of gap between segments

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-label="Navigate to a section"
      style={{ display: 'block' }}
    >
      {SEGMENTS.map((seg, i) => {
        const a1      = i * 60 + GAP / 2;
        const a2      = (i + 1) * 60 - GAP / 2;
        const midDeg  = (a1 + a2) / 2;
        const [lx, ly] = polar(cx, cy, (rOuter + rInner) / 2, midDeg);
        const isActive = hovered === seg.id;

        return (
          <g
            key={seg.id}
            onClick={() => onSegmentClick(seg.id)}
            onMouseEnter={() => setHovered(seg.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'pointer' }}
            role="button"
            aria-label={`Go to ${seg.label}`}
          >
            <path
              d={wedgePath(cx, cy, rOuter, rInner, a1, a2)}
              fill={isActive ? '#c45c00' : '#1a1a1a'}
              style={{ transition: 'fill 0.18s ease' }}
            />
            {/* Label text */}
            <text
              x={f(lx)}
              y={f(ly)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#f8f6f1"
              fontSize="9"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="700"
              letterSpacing="0.1"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {seg.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Center hub */}
      <circle
        cx={cx}
        cy={cy}
        r={rInner - 3}
        fill="#f8f6f1"
        stroke="#1a1a1a"
        strokeWidth="2.5"
      />
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontFamily="'Noto Serif', serif"
        fontWeight="700"
        fill="#1a1a1a"
        style={{ userSelect: 'none' }}
      >
        PA
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="6"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="600"
        fill="#767676"
        letterSpacing="1.5"
        style={{ userSelect: 'none' }}
      >
        NAVIGATE
      </text>
    </svg>
  );
}
