import { useEffect, useRef } from 'react';

export default function ParticleCanvas({ theme, width = 600, height = 600 }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect if on mobile
    const isMobile = window.innerWidth < 900;
    if (isMobile) return; // Don't render on mobile

    const ctx = canvas.getContext('2d');
    const particleCount = 45;
    const maxVelocity = 0.5;

    // Initialize particles
    const initParticles = () => {
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * maxVelocity,
          vy: (Math.random() - 0.5) * maxVelocity,
          radius: Math.random() * 2 + 1,
        });
      }
      particlesRef.current = particles;
    };

    const accentColor = theme?.accent || '#c45c00';

    // Animation loop
    const animate = () => {
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--surface').trim();
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x - p.radius <= 0 || p.x + p.radius >= width) p.vx *= -1;
        if (p.y - p.radius <= 0 || p.y + p.radius >= height) p.vy *= -1;

        // Keep in bounds (safety clamp)
        p.x = Math.max(p.radius, Math.min(width - p.radius, p.x));
        p.y = Math.max(p.radius, Math.min(height - p.radius, p.y));

        // Draw particle
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw connection lines to nearby particles
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 0.5;
        particlesRef.current.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100 && distance > 0) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [width, height, theme]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
}
