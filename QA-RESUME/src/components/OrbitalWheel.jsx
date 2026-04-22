import { useState } from 'react';

const SEGS = [
  { id: 'expertise',  label: 'Expertise'  },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'community',  label: 'Community'  },
  { id: 'contact',    label: 'Contact'    },
  { id: 'education',  label: 'Education'  },
];

const SIZE = 460, CX = 230, CY = 230;
const RO = 198, RI = 80, GAP = 1.2;

function wedge(a1, a2) {
  function pt(r, deg) {
    const rad = (deg - 90) * Math.PI / 180;
    return [+(CX + r * Math.cos(rad)).toFixed(2), +(CY + r * Math.sin(rad)).toFixed(2)];
  }
  const [ox1, oy1] = pt(RO, a1), [ox2, oy2] = pt(RO, a2);
  const [ix1, iy1] = pt(RI, a2), [ix2, iy2] = pt(RI, a1);
  return `M${ox1},${oy1} A${RO},${RO} 0 0 1 ${ox2},${oy2} L${ix1},${iy1} A${RI},${RI} 0 0 0 ${ix2},${iy2} Z`;
}

function labelPos(midDeg) {
  const r = (RO + RI) / 2;
  const rad = (midDeg - 90) * Math.PI / 180;
  return [+(CX + r * Math.cos(rad)).toFixed(2), +(CY + r * Math.sin(rad)).toFixed(2)];
}

export default function OrbitalWheel({ active, onSelect, onHover, theme }) {
  const [hov, setHov] = useState(null);
  const [imgError, setImgError] = useState(false);
  const th = theme;

  const segs = SEGS.map((seg, i) => {
    const a1 = i * 60 + GAP / 2;
    const a2 = (i + 1) * 60 - GAP / 2;
    return { ...seg, a1, a2, mid: (a1 + a2) / 2 };
  });

  const altFill = ['#1a1a1a', '#212121', '#1a1a1a', '#212121', '#1a1a1a', '#212121'];

  return (
    <svg
      width={SIZE} height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
    >
      <defs>
        <clipPath id="hubC">
          <circle cx={CX} cy={CY} r={RI - 4} />
        </clipPath>
        <filter id="wglow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {segs.map((seg, i) => {
        const isA = active === seg.id;
        const isH = hov === seg.id;
        const [lx, ly] = labelPos(seg.mid);
        return (
          <g
            key={seg.id}
            onClick={() => onSelect(seg.id)}
            onMouseEnter={() => { setHov(seg.id); onHover && onHover(seg.id); }}
            onMouseLeave={() => { setHov(null); onHover && onHover(null); }}
            style={{ cursor: 'pointer' }}
          >
            <path
              d={wedge(seg.a1, seg.a2)}
              fill={isA ? th.accent : isH ? '#2c2c2c' : altFill[i]}
              filter={isA ? 'url(#wglow)' : undefined}
              style={{ transition: 'fill .22s ease' }}
            />
            <text
              x={lx} y={ly}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11.5" fontFamily="'DM Sans',sans-serif"
              fontWeight="700" letterSpacing=".09em"
              fill={isA || isH ? '#fff' : '#d8d4cc'}
              style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill .22s' }}
            >
              {seg.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {[0, 60, 120, 180, 240, 300].map(deg => {
        const [x1, y1] = [
          +(CX + RI * Math.sin(deg * Math.PI / 180)).toFixed(2),
          +(CY - RI * Math.cos(deg * Math.PI / 180)).toFixed(2),
        ];
        const [x2, y2] = [
          +(CX + RO * Math.sin(deg * Math.PI / 180)).toFixed(2),
          +(CY - RO * Math.cos(deg * Math.PI / 180)).toFixed(2),
        ];
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={th.accent} strokeWidth="1.5" opacity="0.7" />;
      })}

      <circle cx={CX} cy={CY} r={RO + 6} fill="none" stroke={th.spoke} strokeWidth="1.5" strokeDasharray="3 5" />
      <circle cx={CX} cy={CY} r={RI + 2} fill="none" stroke={th.spoke} strokeWidth="1" />
      <circle cx={CX} cy={CY} r={RI} fill={th.bg} stroke={th.hubB} strokeWidth="2.5" />

      {!imgError ? (
        <image
          href={`${import.meta.env.BASE_URL}profile.jpg`}
          x={CX - (RI - 4)} y={CY - (RI - 4)}
          width={(RI - 4) * 2} height={(RI - 4) * 2}
          clipPath="url(#hubC)"
          preserveAspectRatio="xMidYMid slice"
          onError={() => setImgError(true)}
        />
      ) : (
        <text
          x={CX} y={CY} textAnchor="middle" dominantBaseline="middle"
          fill={th.accent} fontSize="22" fontFamily="'DM Sans',sans-serif"
          fontWeight="700" style={{ pointerEvents: 'none' }}
        >PA</text>
      )}
    </svg>
  );
}
