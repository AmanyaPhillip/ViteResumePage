# Phase 1 Technical Specifications

**Document Version**: 1.0  
**Last Updated**: 2026-04-21  
**Target Audience**: Developers implementing Phase 1

---

## Table of Contents
1. [Layout Specifications](#layout-specifications)
2. [Component Specifications](#component-specifications)
3. [Theme System](#theme-system)
4. [Typography System](#typography-system)
5. [CSS Architecture](#css-architecture)
6. [JavaScript Patterns](#javascript-patterns)
7. [Performance Budgets](#performance-budgets)
8. [Browser Support](#browser-support)

---

## Layout Specifications

### Two-Panel Container Structure

```
HTML Structure:
<div class="panel-wrapper">
  <div class="left-panel">
    <!-- Hero text, photo, navigation -->
  </div>
  <div class="right-panel">
    <!-- All scrollable content -->
  </div>
</div>
```

### CSS Grid Layout

```css
.panel-wrapper {
  display: grid;
  grid-template-columns: 50vw 50vw;
  height: 100vh;
  gap: 0;
  margin: 0;
  padding: 0;
}

@media (max-width: 899px) {
  .panel-wrapper {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .left-panel {
    display: none; /* Hide left panel entirely on mobile */
  }
  
  .right-panel {
    width: 100%;
  }
}
```

### Left Panel Specification

**Role**: Static hero section + navigation hub  
**Width**: 50vw (fixed, sticky position)  
**Height**: 100vh (full viewport height)  
**Overflow**: `hidden` (no scrolling)  
**Background**: Theme surface color  
**z-index**: 10 (above content)  
**Padding**: 2rem (internal spacing)  
**Layout**: Flexbox column, center aligned

```css
.left-panel {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 50vw;
  overflow: hidden;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
}
```

**Content Order** (top to bottom):
1. Minimal top nav bar (logo + theme switcher, 50px height)
2. Hero text section (name, title, summary, contact)
3. Profile photo (160px circular, centered)
4. OrbitalWheel navigation (420px SVG)
5. Navigation dots (6 small indicators)

**Spacing Guide**:
- Top nav: 50px fixed height
- Hero text to photo: 2rem gap
- Photo to wheel: 1.5rem gap
- Wheel to dots: 1rem gap
- Total vertical: ~50px + (200px text) + 160px + 420px + 50px + gaps ≈ 900px min

### Right Panel Specification

**Role**: Scrollable content container  
**Width**: 50vw (fixed, or 100% on mobile)  
**Height**: 100vh  
**Overflow**: `overflow-y: auto` (vertical scroll only)  
**Overflow-x**: `hidden` (prevent horizontal scroll)  
**Background**: White or section-specific  
**Scrollbar**: Custom styled, thin

```css
.right-panel {
  width: 50vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: var(--brand) transparent;
}

.right-panel::-webkit-scrollbar {
  width: 8px;
}
.right-panel::-webkit-scrollbar-track {
  background: transparent;
}
.right-panel::-webkit-scrollbar-thumb {
  background: var(--brand);
  border-radius: 4px;
}
```

### Scroll Container for IntersectionObserver

**CRITICAL CHANGE**: IntersectionObserver must use right-panel as root, not window.

```js
const rightPanel = document.querySelector('.right-panel');
const sections = ['hero', 'expertise', 'experience', 'projects', 'community', 'contact', 'education'];

sections.forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        updateActiveSection(id);
        updateNavDots(id);
      }
    },
    {
      root: rightPanel,       // <-- KEY: scroll container, not window
      threshold: 0.25,        // Trigger when 25% visible
      rootMargin: '0px 0px 0px 0px',
    }
  );
  
  obs.observe(el);
});
```

### Responsive Breakpoints

| Breakpoint | Layout | Behavior |
|----------|--------|----------|
| 0–899px | Single Column | Left panel hidden; right panel 100% width |
| 900px+ | Two Panel | Both panels 50vw; side-by-side |
| 1920px+ | Two Panel (wide) | Grid maintains 50vw constraint; may have max-width |

**Breakpoint Definition**:
```css
@media (max-width: 899px) {
  /* Mobile/tablet: single column */
}

@media (min-width: 900px) {
  /* Desktop: two panel */
}
```

---

## Component Specifications

### OrbitalWheel Component

**File**: `src/components/OrbitalWheel.jsx`  
**Type**: Functional React component  
**Props**:
```ts
interface OrbitalWheelProps {
  onNodeClick: (sectionId: string) => void;
  theme: ThemeObject;
  disabled?: boolean;
}
```

**SVG Dimensions**:
- Canvas: 420px × 420px
- Center: (210px, 210px)
- Hub (profile photo): 64px radius
- Track radius (node centers): 150px
- Node radius: 30px (diameter 60px)
- Nodes: 6, equally spaced (60° apart)

**Node Positions** (polar coordinates):
```
Node 0: 0°    (top)
Node 1: 60°   (upper right)
Node 2: 120°  (lower right)
Node 3: 180°  (bottom)
Node 4: 240°  (lower left)
Node 5: 300°  (upper left)
```

**SVG Structure**:
```jsx
<svg width={420} height={420} viewBox="0 0 420 420">
  <defs>
    <clipPath id="hubClip">
      <circle cx={210} cy={210} r={58} /> {/* 64 - 6 padding */}
    </clipPath>
  </defs>
  
  {/* Optional: track background circle (stroke only) */}
  <circle cx={210} cy={210} r={150} stroke={theme.muted} opacity={0.15} />
  
  {/* 6 nodes */}
  {nodes.map(node => (
    <g key={node.id} role="button" onClick={...}>
      <circle cx={x} cy={y} r={30} fill={isHovered ? theme.accent : theme.brand} />
      <text text-anchor="middle" dominant-baseline="middle" fontSize="12" fill="white">
        {node.label}
      </text>
    </g>
  ))}
  
  {/* Hub: photo + border */}
  <circle cx={210} cy={210} r={64} fill="white" stroke={theme.brand} strokeWidth={2.5} />
  <image href="/ViteResumePage/profile.jpg" clipPath="url(#hubClip)" ... />
</svg>
```

**Interactions**:
- **Hover**: Node fill changes from `theme.brand` to `theme.accent`; smooth transition (0.18s)
- **Click**: Trigger `onNodeClick(sectionId)` callback
- **Keyboard**: Tab to node, Enter/Space to activate

**Accessibility**:
```jsx
<g
  role="button"
  tabIndex={0}
  aria-label={`Go to ${section.label}`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNodeClick(section.id);
    }
  }}
>
```

**Animation** (optional):
Slow rotation of entire orbital system:
```css
@keyframes orbitRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orbital-wheel {
  animation: orbitRotate 20s linear infinite;
}

.orbital-wheel:hover {
  animation-play-state: paused;
}
```

**Styling**:
```css
.orbital-wheel {
  display: block;
  max-width: 420px;
  margin: 0 auto;
}

.orbital-wheel circle {
  transition: fill 0.18s ease;
}

.orbital-wheel text {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.1em;
  pointer-events: none;
  user-select: none;
}
```

**Test Cases**:
- [ ] Renders 6 nodes in hexagon arrangement
- [ ] Hover highlights node
- [ ] Click navigates to section
- [ ] Photo displays in center
- [ ] Theme colors update on prop change
- [ ] Keyboard: tab reaches node, Space/Enter activates

---

### ParticleCanvas Component

**File**: `src/components/ParticleCanvas.jsx`  
**Type**: Functional React component with Canvas 2D  
**Props**:
```ts
interface ParticleCanvasProps {
  theme: ThemeObject;
  disabled?: boolean;
  width?: number;
  height?: number;
  particleCount?: number;
}
```

**Canvas Dimensions**:
- Width: 50vw (width of left panel) or 500px (fallback)
- Height: 100vh (full viewport) or 800px (fallback)
- DPI: Standard (not high-DPI for performance)

**Particle Specifications**:
- **Count**: 40–50 particles
- **Radius**: 2–4px (random per particle)
- **Velocity**: ±1 to ±2 px/frame (random)
- **Colors**: Blend of `theme.accent` + `theme.muted` (50% each)
- **Opacity**: 0.3–0.7 (slightly transparent)

**Physics**:
```js
class Particle {
  constructor(x, y, r, vx, vy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.opacity = 0.3 + Math.random() * 0.4;
  }
  
  update(width, height) {
    // Position update
    this.x += this.vx;
    this.y += this.vy;
    
    // Boundary bounce (elastic)
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.vx *= -1;
      this.x = Math.max(this.r, Math.min(width - this.r, this.x));
    }
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.vy *= -1;
      this.y = Math.max(this.r, Math.min(height - this.r, this.y));
    }
    
    // Optional: very slight gravity/damping
    this.vy += 0.05; // gravity
    this.vy *= 0.99; // damping
  }
  
  draw(ctx, theme) {
    ctx.fillStyle = `rgba(${hexToRgb(theme.accent)}, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}
```

**Animation Loop**:
```js
useEffect(() => {
  if (disabled) return;
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  let animationId;
  
  const animate = () => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw all particles
    particles.forEach(p => {
      p.update(canvas.width, canvas.height);
      p.draw(ctx, theme);
    });
    
    animationId = requestAnimationFrame(animate);
  };
  
  animate();
  
  return () => cancelAnimationFrame(animationId);
}, [disabled, theme]);
```

**Performance Optimization**:
- Use `requestAnimationFrame` (browser-optimized, ~60fps)
- Consider frame-skip if needed: only draw every Nth frame
- Use `canvas.width = canvas.width` to clear instead of `clearRect` (sometimes faster)
- Disable on mobile (`disabled={viewport < 900px}`)

**Load Animation** (optional):
```js
// Fade particles in on mount
particles.forEach(p => {
  p.opacity = 0;
  let elapsed = 0;
  const fadeIn = setInterval(() => {
    elapsed += 16; // ~60fps
    if (elapsed >= 500) {
      p.opacity = 0.3 + Math.random() * 0.4;
      clearInterval(fadeIn);
    } else {
      p.opacity = (elapsed / 500) * (0.3 + Math.random() * 0.4);
    }
  }, 16);
});
```

**CSS Styling**:
```css
.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
```

**Positioning in Left Panel**:
```jsx
<div class="left-panel" style={{ position: 'relative' }}>
  <canvas class="particle-canvas" ref={canvasRef} />
  <div style={{ position: 'relative', zIndex: 2 }}>
    {/* Hero content, wheel, etc. */}
  </div>
</div>
```

**Test Cases**:
- [ ] Canvas renders particles
- [ ] Animation smooth (no visible stutter)
- [ ] Particles bounce off edges
- [ ] Theme change updates colors
- [ ] Mobile (< 900px): disabled (no canvas)
- [ ] Performance: >25fps on low-end mobile
- [ ] Load: particles fade in smoothly

---

## Theme System

### Theme Object Structure

```ts
interface Theme {
  name: string;
  accent: string;           // Primary action color (#c45c00, #00d9ff, #3b82f6)
  brand: string;            // Dark text/borders (#1a1a1a, #0a0e27, #1f2937)
  surface: string;          // Light backgrounds (#f8f6f1, #0f1423, #ffffff)
  muted: string;            // Secondary text (#767676, #6b7280, #9ca3af)
  forest: string;           // Green accent (#1a5c3a, #064e3b, #059669)
  gradientFrom: string;     // Gradient start (lighter accent)
  gradientTo: string;       // Gradient end (darker accent)
}
```

### Three Themes

#### Theme A: Warm Organicist (Default)
```js
{
  name: 'Warm Organicist',
  accent: '#c45c00',       // Warm orange
  brand: '#1a1a1a',        // Black
  surface: '#f8f6f1',      // Cream
  muted: '#767676',        // Gray
  forest: '#1a5c3a',       // Dark green
  gradientFrom: '#ff8a4d',
  gradientTo: '#c45c00',
}
```

#### Theme B: Dark Technician
```js
{
  name: 'Dark Technician',
  accent: '#00d9ff',       // Cyan
  brand: '#0a0e27',        // Very dark blue
  surface: '#0f1423',      // Dark blue-gray
  muted: '#6b7280',        // Medium gray
  forest: '#064e3b',       // Dark teal
  gradientFrom: '#00d9ff',
  gradientTo: '#0080ff',   // Blue
}
```

#### Theme C: Clean Modernist
```js
{
  name: 'Clean Modernist',
  accent: '#3b82f6',       // Bright blue
  brand: '#1f2937',        // Dark gray
  surface: '#ffffff',      // White
  muted: '#9ca3af',        // Light gray
  forest: '#059669',       // Green
  gradientFrom: '#3b82f6',
  gradientTo: '#8b5cf6',   // Purple
}
```

### CSS Variable Mapping

```css
:root {
  /* Default: Warm Organicist */
  --accent: #c45c00;
  --brand: #1a1a1a;
  --surface: #f8f6f1;
  --muted: #767676;
  --forest: #1a5c3a;
  --gradient-from: #ff8a4d;
  --gradient-to: #c45c00;
}

html[data-theme="dark"] {
  /* Dark Technician */
  --accent: #00d9ff;
  --brand: #0a0e27;
  --surface: #0f1423;
  --muted: #6b7280;
  --forest: #064e3b;
  --gradient-from: #00d9ff;
  --gradient-to: #0080ff;
}

html[data-theme="modern"] {
  /* Clean Modernist */
  --accent: #3b82f6;
  --brand: #1f2937;
  --surface: #ffffff;
  --muted: #9ca3af;
  --forest: #059669;
  --gradient-from: #3b82f6;
  --gradient-to: #8b5cf6;
}
```

### ThemeContext Implementation

```jsx
import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Read from localStorage or default to 'warm'
    return localStorage.getItem('theme') || 'warm';
  });
  
  useEffect(() => {
    // Apply theme to DOM
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const switchTheme = (newTheme) => {
    if (['warm', 'dark', 'modern'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

### Theme Switcher UI

```jsx
function ThemeSwitcher() {
  const { theme, switchTheme } = useTheme();
  
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {['warm', 'dark', 'modern'].map(t => (
        <button
          key={t}
          onClick={() => switchTheme(t)}
          style={{
            padding: '0.4rem 0.8rem',
            background: theme === t ? 'var(--accent)' : 'transparent',
            color: theme === t ? 'white' : 'var(--muted)',
            border: `2px solid ${theme === t ? 'var(--accent)' : 'var(--muted)'}`,
            cursor: 'pointer',
            fontSize: '0.65rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
            borderRadius: '4px',
          }}
        >
          {t[0].toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

---

## Typography System

### Font Stack Updates

**OLD**:
```css
--font-serif: 'Noto Serif', Georgia, serif;
--font-sans: 'Space Grotesk', system-ui, sans-serif;
```

**NEW**:
```css
--font-serif: 'Playfair Display', Georgia, serif;
--font-sans: 'DM Sans', system-ui, sans-serif;
```

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

**Font Loading Strategy**:
- `display=swap`: Immediately show fallback font, swap to Playfair/DM Sans when loaded
- Preconnect: Speed up DNS/TLS for Google Fonts
- Weights limited to what's needed: Playfair 700/900 only; DM Sans 400/600 only

### Font Usage Rules

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Page title (h1) | Playfair | 900 | 3–5.5rem |
| Section heading (h2) | Playfair | 700 | 2–3.5rem |
| Card title (h3) | Playfair | 700 | 1rem–1.5rem |
| Body text | DM Sans | 400 | 0.8–0.95rem |
| Labels | DM Sans | 600 | 0.6–0.75rem |
| Links | DM Sans | 600 | 0.8–0.85rem |

### Line Height Guide

- Headings: 1.0–1.2 (tight)
- Body text: 1.6–1.75 (readable)
- Labels: 1.0 (compact)

### Letter Spacing

- Headings: -0.02em (tight)
- Labels: 0.2em (expanded)
- Body: default (0)

---

## CSS Architecture

### Design Tokens (in `:root`)

```css
:root {
  /* Colors */
  --accent: #c45c00;
  --brand: #1a1a1a;
  --surface: #f8f6f1;
  --surface-alt: #f0ede6;
  --surface-dark: #222222;
  --muted: #767676;
  --border: #1a1a1a;
  --forest: #1a5c3a;
  
  /* Typography */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'DM Sans', system-ui, sans-serif;
  
  /* Layout */
  --panel-width: 50vw;
  --gutter: 1.5rem;
  --radius: 0; /* No border-radius; design uses sharp corners */
  
  /* Shadows */
  --shadow-sm: 2px 2px 0px var(--brand);
  --shadow-md: 4px 4px 0px var(--brand);
  --shadow-lg: 8px 8px 0px var(--brand);
  
  /* Transitions */
  --transition-fast: 0.12s ease;
  --transition-normal: 0.18s ease;
  --transition-slow: 0.3s ease;
}
```

### Utility Classes

**Never use inline styles for critical visual properties; define utility classes instead.**

```css
/* Typography utilities */
.text-serif { font-family: var(--font-serif); }
.text-sans { font-family: var(--font-sans); }
.text-label {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* Spacing utilities */
.gap-sm { gap: 0.5rem; }
.gap-md { gap: 1rem; }
.gap-lg { gap: 1.5rem; }

/* Shadow utilities */
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }

/* Transition utilities */
.transition-fast { transition: all var(--transition-fast); }
.transition-normal { transition: all var(--transition-normal); }
.transition-slow { transition: all var(--transition-slow); }

/* Bento card (existing, keep) */
.bento-card {
  background: #fff;
  border: 2px solid var(--border);
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
}
.bento-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-lg);
}
```

### Component-Scoped Styles

Keep component styles scoped to `.component-name` classes:

```css
/* OrbitalWheel.css */
.orbital-wheel {
  display: block;
  max-width: 420px;
  margin: 0 auto;
}
.orbital-wheel circle {
  transition: fill var(--transition-normal);
}

/* ParticleCanvas.css */
.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
```

### Layout Utilities

```css
/* Flexbox utilities */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-col { flex-direction: column; }

/* Grid utilities */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--gutter);
}
```

---

## JavaScript Patterns

### React Hooks Usage

**Recommended**:
- `useState` for component-local state (theme ref, modal open)
- `useEffect` for side effects (IntersectionObserver, theme sync)
- `useCallback` for memoized callbacks (nav click handlers)
- `useRef` for DOM refs (canvas, scroll container)

**Avoid**:
- `useMemo` (premature optimization)
- Complex Redux (not needed for Phase 1)
- Multiple top-level state (keep it simple)

### Event Handlers

**Pattern**:
```jsx
const handleNavClick = useCallback((sectionId) => {
  const rightPanel = document.querySelector('.right-panel');
  const section = document.getElementById(sectionId);
  if (section) {
    rightPanel.scrollTo({
      top: section.offsetTop - rightPanel.offsetTop,
      behavior: 'smooth',
    });
  }
}, []);
```

**Not**:
```jsx
// Avoid: direct onClick with anonymous function
onClick={() => { /* complex logic */ }}
```

### IntersectionObserver Pattern

**Correct for right-panel scroll**:
```js
const rightPanel = document.querySelector('.right-panel');

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveSection(entry.target.id);
      }
    });
  },
  {
    root: rightPanel,  // <-- Critical
    threshold: 0.25,
  }
);

document.querySelectorAll('.scroll-section').forEach(el => {
  obs.observe(el);
});
```

### localStorage Usage

**Pattern**:
```js
// Read
const savedTheme = localStorage.getItem('theme') || 'warm';

// Write
localStorage.setItem('theme', 'dark');

// Delete (optional)
localStorage.removeItem('theme');
```

**Keys**:
- `theme`: Current theme name (warm|dark|modern)

---

## Performance Budgets

### Metrics

| Metric | Budget | Target |
|--------|--------|--------|
| Largest Contentful Paint (LCP) | 2.5s | 1.8s |
| First Input Delay (FID) | 100ms | <50ms |
| Cumulative Layout Shift (CLS) | 0.1 | 0.05 |
| Performance Score | 85+ | 90+ |
| Accessibility Score | 90+ | 95+ |

### Font Loading Strategy

- Use `display=swap` to avoid FOUT (Flash Of Unstyled Text)
- Preconnect to Google Fonts CDN
- Monitor CLS: ensure font swap doesn't cause layout shift
- Fallback fonts: serif for Playfair, sans for DM Sans

### ParticleCanvas Performance

- **Target**: 30fps on mobile, 60fps on desktop
- **Limit**: 50 particles max
- **Disable**: Below 900px viewport
- **Monitor**: Log frame count to console (dev only)

### Bundle Size

- React 19: ~42KB gzipped
- All components: <200KB gzipped
- CSS: <50KB uncompressed

---

## Browser Support

### Supported Browsers

| Browser | Min Version | Support |
|---------|-------------|---------|
| Chrome | 90+ | Full |
| Firefox | 88+ | Full |
| Safari | 14+ | Full |
| Edge | 90+ | Full |
| iOS Safari | 14+ | Full |

### Feature Detection

**Required Features**:
- CSS Grid: all modern browsers
- CSS Variables: all modern browsers
- IntersectionObserver: all modern browsers
- Canvas 2D: all modern browsers
- localStorage: all modern browsers

**No Polyfills Needed** for Phase 1.

### CSS Fallbacks

For older browsers (graceful degradation):

```css
/* Fallback for CSS Grid (IE 11 not supported) */
@supports (display: grid) {
  .panel-wrapper { display: grid; }
}

/* Fallback for CSS variables */
html {
  --accent: #c45c00; /* Will work on all browsers */
}
```

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

**Color Contrast**:
- Text vs background: 4.5:1 minimum (normal text)
- Large text (18pt+): 3:1 minimum
- Use WebAIM contrast checker: https://webaim.org/resources/contrastchecker/

**Keyboard Navigation**:
- All interactive elements must be focusable
- Focus order: left to right, top to bottom
- Focus visible: outline or color change visible

**Screen Reader**:
- Semantic HTML: `<button>`, `<a>`, `<h1>`, etc.
- Alt text for images: `alt="Phillip Asiimwe"` for profile photo
- ARIA labels: `aria-label="Go to expertise"` for nav dots
- Avoid redundant labels: don't say "link" in anchor text

**Mobile Accessibility**:
- Touch targets: 44px × 44px minimum
- Readable text: 16px minimum (prevents zoom on iOS)
- Avoid auto-playing media

---

## Testing Checklist

### Unit Tests (Recommended)

```js
// OrbitalWheel.test.jsx
import { render, screen } from '@testing-library/react';
import OrbitalWheel from './OrbitalWheel';

describe('OrbitalWheel', () => {
  it('renders 6 nodes', () => {
    render(<OrbitalWheel onNodeClick={jest.fn()} theme={MOCK_THEME} />);
    // Assert SVG renders with 6 circles
  });
  
  it('calls onNodeClick when node is clicked', () => {
    const onClick = jest.fn();
    render(<OrbitalWheel onNodeClick={onClick} theme={MOCK_THEME} />);
    // Click a node, assert onClick called with correct sectionId
  });
  
  it('updates colors on theme change', () => {
    const { rerender } = render(
      <OrbitalWheel onNodeClick={jest.fn()} theme={WARM_THEME} />
    );
    rerender(
      <OrbitalWheel onNodeClick={jest.fn()} theme={DARK_THEME} />
    );
    // Assert node colors changed
  });
});
```

### Integration Tests (Manual)

- [ ] Scroll right-panel; active section highlight updates
- [ ] Click nav dot; right-panel scrolls to section
- [ ] Switch theme; all colors update instantly
- [ ] Mobile (375px): single column, left panel hidden
- [ ] Desktop (1920px): two panels visible side-by-side

### E2E Tests (Recommended: Cypress or Playwright)

```js
// e2e.cy.js
describe('Phase 1 Redesign', () => {
  beforeEach(() => {
    cy.visit('/ViteResumePage/');
  });
  
  it('renders two-panel layout on desktop', () => {
    cy.viewport(1920, 1080);
    cy.get('.left-panel').should('be.visible');
    cy.get('.right-panel').should('be.visible');
  });
  
  it('renders single-column on mobile', () => {
    cy.viewport(375, 667);
    cy.get('.left-panel').should('not.be.visible');
    cy.get('.right-panel').should('have.css', 'width', '375px');
  });
  
  it('navigates via orbital wheel', () => {
    cy.get('.orbital-wheel circle').first().click();
    cy.get('.right-panel').should('have.scrollTop').greaterThan(0);
  });
  
  it('switches theme', () => {
    cy.get('[data-testid="theme-dark"]').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
  });
});
```

---

## Deployment Checklist

Before pushing to GitHub Pages:

- [ ] No console errors/warnings
- [ ] All fonts loaded (no FOUT)
- [ ] ParticleCanvas FPS acceptable
- [ ] Accessibility audit: 90+ score
- [ ] Performance audit: 85+ score
- [ ] Mobile tested on real devices (iPhone, Android)
- [ ] Browser tested: Chrome, Firefox, Safari
- [ ] Theme switching works in all browsers
- [ ] Scroll tracking (active section) works
- [ ] PDF download works (if applicable)
- [ ] Base URL paths correct (`/ViteResumePage/`)

---

## Resources

- [MDN: CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [MDN: IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Web.dev: Core Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

