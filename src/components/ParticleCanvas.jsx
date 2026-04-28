import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ParticleCanvas() {
  const { vrn } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect if on mobile
    const isMobile = window.innerWidth < 900;
    if (isMobile) return;

    const ctx = canvas.getContext('2d');
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const N = 120;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      r: Math.random() * 1.8 + 0.6,
    }));

    const dark = vrn === 'B';
    const dotColor = dark
      ? 'rgba(224,106,26,0.32)'
      : 'rgba(196,92,0,0.28)';
    const lineBase = dark ? '255,255,255' : '26,26,26';
    let raf;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) {
          p.vx *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
        }
        if (p.y < 0 || p.y > h) {
          p.vy *= -1;
          p.y = Math.max(0, Math.min(h, p.y));
        }
      }

      // Draw lines first
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${lineBase},${0.07 * (1 - d / 100)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    // Handle resize
    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [vrn]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
