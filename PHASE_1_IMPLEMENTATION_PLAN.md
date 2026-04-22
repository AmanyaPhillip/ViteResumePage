# Phase 1 Implementation Plan: Two-Panel Redesign

**Target Completion**: 2 weeks (aggressive) | 3 weeks (comfortable)  
**Branch**: `redesign`  
**Base URL**: `/ViteResumePage/`

---

## Executive Summary

This plan sequences the visual/structural overhaul from fixed navbar to a 50vw two-panel layout. The strategy prioritizes:
1. **Fast visual transformation** — two-panel shell CSS by end of Sprint 1
2. **Content organization** — data refactoring in parallel with UI
3. **Component replacement** — wheel & animations in Sprint 2
4. **Polish & testing** — themes, mobile, accessibility in Sprint 3

---

## Critical Assumptions & Blockers

### Assumptions
- Mobile breakpoint: **900px** (below = single-column, above = two-panel)
- Profile photo available at `/ViteResumePage/profile.jpg`
- GitHub Pages base URL `/ViteResumePage/` is already set in vite.config.js
- No authentication or backend calls in this phase
- React 19 + CSS-only animations (no external animation libs)

### Known Constraints
- **IntersectionObserver** must be scoped to right-panel scroll container (not window)
- **Theme switching** stored in localStorage with manual ref/forceUpdate pattern (no Context needed for Phase 1)
- **Mobile** becomes single-column layout; skip left panel entirely below 900px
- **Fonts** require Google Fonts update (Playfair + DM Sans) — **BREAKING CHANGE**

### Risk Flags
- **HIGH**: Two-panel layout breaks all mobile UX; must test extensively at 375px, 768px, 900px
- **HIGH**: IntersectionObserver timing changes scroll tracking behavior; needs re-tuning thresholds
- **MEDIUM**: Font swap may cause layout shift; need to define `font-display: swap` or preload
- **MEDIUM**: ParticleCanvas disabled on mobile could feel jarring; consider graceful degradation

---

## Sprint Breakdown

### SPRINT 1: Two-Panel Shell + CSS Foundation (4-5 days)

**Goal**: Achieve pixel-perfect two-panel layout with no content changes.  
**Deliverable**: Working layout with Hero section visible, all nav working, responsive fallback at 900px.

#### Task 1.1: Update index.html Fonts
**Duration**: 30 min | **Effort**: Trivial  
**Dependencies**: None  
**Testing**: Visual inspection in DevTools

- [ ] Replace Google Fonts import: **Playfair Display** (700, 900 only) + **DM Sans** (400, 600)
- [ ] Add `font-display: swap` or `font-display: fallback` to prevent FOUT/FLIT
- [ ] Test font loading in Chrome/Firefox/Safari DevTools
- [ ] Verify fallback fonts are acceptable while loading

**File**: `QA-RESUME/index.html`  
**Changes**:
```html
<!-- OLD: Noto Serif + Space Grotesk -->
<!-- NEW: Playfair Display + DM Sans -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet" />
```

---

#### Task 1.2: Create Two-Panel CSS Layout
**Duration**: 1-2 hours | **Effort**: Medium  
**Dependencies**: Task 1.1 (fonts)  
**Testing**: Responsive breakpoint testing, scrollbar behavior

- [ ] Create `.panel-wrapper` container: `display: grid; grid-template-columns: 50vw 50vw; height: 100vh`
- [ ] Style `.left-panel`: `position: sticky; top: 0; overflow: hidden; background: var(--surface)`
- [ ] Style `.right-panel`: `overflow-y: auto; background: white; position: relative`
- [ ] Hide top `NavBar` (fixed) and `SideNav` — both become part of left panel
- [ ] Add mobile breakpoint: below 900px, switch to `grid-template-columns: 1fr` (single column, right panel only)
- [ ] Test scrollbar width compensation (use `scrollbar-width: thin` or custom webkit scroll)
- [ ] Verify horizontal scroll doesn't occur on any viewport

**File**: `QA-RESUME/src/index.css`  
**New CSS sections**:
- `:root` theme variables (already exist; add `--panel-width: 50vw`)
- `.panel-wrapper`, `.left-panel`, `.right-panel` layout styles
- Media query adjustment for mobile

**Critical Test Cases**:
- [ ] Desktop 1920px: two panels side-by-side, no scroll/overlap
- [ ] Laptop 1280px: two panels, left content fits without scrolling
- [ ] Tablet 900px: transition point — verify both layouts work
- [ ] Phone 375px: single column, only right panel visible, smooth scroll
- [ ] Scrollbar width: measure OS scrollbars (8-16px varies); ensure no layout shift

---

#### Task 1.3: Refactor App.jsx → Two-Panel Layout
**Duration**: 2-3 hours | **Effort**: High  
**Dependencies**: Task 1.2 (CSS)  
**Testing**: Navigation flow, section highlight, smooth scroll

- [ ] Wrap content in `<div className="panel-wrapper">`
- [ ] Create `<div className="left-panel">` housing:
  - New `TopNavBar` (static, in-panel, smaller/minimal)
  - Hero section **text-only** (left side)
  - Navigation dots (in-panel)
  - Profile photo (circular, centered, 160px)
- [ ] Create `<div className="right-panel">` housing:
  - All scrollable content sections (expertise, experience, projects, etc.)
  - Footer at bottom
- [ ] Move `NavBar` to inside left panel; strip down to logo + minimal nav
- [ ] Remove global `SideNav`; replace with in-panel navigation dots
- [ ] Update `IntersectionObserver` to use right-panel scroll container instead of window:
  ```js
  const rightPanel = document.querySelector('.right-panel');
  const obs = new IntersectionObserver(..., {
    root: rightPanel, // <-- KEY CHANGE
    threshold: 0.25,
  });
  ```
- [ ] Adjust scroll margins to account for no fixed navbar
- [ ] Verify smooth scroll to section still works

**File**: `QA-RESUME/src/App.jsx`  
**Structural Changes**:
```jsx
export default function App() {
  return (
    <div className="panel-wrapper">
      <div className="left-panel">
        <TopNavBar ... />
        <HeroSection ... /> {/* Text + photo only */}
        <NavDots ... />
      </div>
      <div className="right-panel">
        <ExpertiseSection />
        {/* ... all other sections ... */}
        <Footer />
      </div>
    </div>
  );
}
```

**Critical Test Cases**:
- [ ] Click hero text; does it navigate correctly?
- [ ] Click nav dot; does right panel scroll to section?
- [ ] Scroll right panel; do nav dots highlight correctly?
- [ ] Window resize 900px → 375px; does layout switch cleanly?
- [ ] Mobile: is left panel hidden? Only right panel visible?

---

#### Task 1.4: Update App.css for Two-Panel
**Duration**: 1 hour | **Effort**: Medium  
**Dependencies**: Task 1.3 (layout changes)  
**Testing**: Hero section alignment, spacing

- [ ] Update `.hero-grid` to single column (text + photo stack vertically in left panel)
- [ ] Update `.hero-right` positioning; photo should be below text
- [ ] Remove navbar padding from sections (no longer fixed top)
- [ ] Adjust section padding/spacing for new panel context
- [ ] Remove or repurpose `.nav-links` media query
- [ ] Update `.side-nav` to integrate into `.left-panel` navigation dots

**File**: `QA-RESUME/src/App.css`

---

### SPRINT 2: Component Replacements + Animations (5-6 days)

**Goal**: Replace NexusWheel with OrbitalWheel, add ParticleCanvas background.  
**Deliverable**: Fully animated, theme-ready design system.

#### Task 2.1: Create ThemeContext & Theme Switcher
**Duration**: 2-3 hours | **Effort**: High  
**Dependencies**: Task 1.2 (CSS variables in place)  
**Testing**: localStorage persistence, theme switching on demand

- [ ] Define theme objects:
  ```js
  const THEMES = {
    warmOrganicist: {
      name: 'Warm Organicist (A)',
      accent: '#c45c00',
      brand: '#1a1a1a',
      surface: '#f8f6f1',
      muted: '#767676',
      forest: '#1a5c3a',
      gradientFrom: '#ff8a4d',
      gradientTo: '#c45c00',
    },
    darkTechnician: {
      name: 'Dark Technician (B)',
      accent: '#00d9ff',
      brand: '#0a0e27',
      surface: '#0f1423',
      muted: '#6b7280',
      forest: '#064e3b',
      gradientFrom: '#00d9ff',
      gradientTo: '#0080ff',
    },
    cleanModernist: {
      name: 'Clean Modernist (C)',
      accent: '#3b82f6',
      brand: '#1f2937',
      surface: '#ffffff',
      muted: '#9ca3af',
      forest: '#059669',
      gradientFrom: '#3b82f6',
      gradientTo: '#8b5cf6',
    },
  };
  ```
- [ ] Create ThemeProvider with localStorage read/write
- [ ] Add theme switcher UI in top-right of left panel (compact, 3 radio buttons or tabs)
- [ ] Apply theme via CSS variables on root
- [ ] Test persistence: reload page, theme persists

**Files**:
- New: `QA-RESUME/src/context/ThemeContext.jsx`
- Update: `QA-RESUME/src/App.jsx` (wrap with ThemeProvider, add switcher UI)
- Update: `QA-RESUME/src/index.css` (add theme-specific CSS variable overrides)

**Test Cases**:
- [ ] Load app; default theme is Warm Organicist
- [ ] Click theme switcher; colors change instantly
- [ ] Reload page; theme persists
- [ ] All components respond to theme change (text, accents, shadows)

---

#### Task 2.2: Build OrbitalWheel Component
**Duration**: 3-4 hours | **Effort**: High  
**Dependencies**: Task 2.1 (theme context for colors), existing `NexusWheel.jsx`  
**Testing**: Rotation animation, click handlers, color contrast

- [ ] Create `OrbitalWheel.jsx` with orbital mechanics:
  - 6 nodes (same as wedges) on circular track
  - Hub: profile photo (160px) with circular border
  - Nodes: circular badges with labels, positioned 360°/6 = 60° apart
  - NODE SIZE: 60-70px diameter
  - TRACK RADIUS: 150-180px from center
  - Animation: **optional** slow rotation (15-20s cycle, paused on hover)
- [ ] Replace `.node:hover` fill with accent color
- [ ] SVG implementation (similar to NexusWheel wedges but simpler—just circles + text)
- [ ] Theme-aware colors (use context ref or prop drilling)
- [ ] Click node → navigate to section
- [ ] Accessibility: `role="button"`, `aria-label`, keyboard support

**File**: `QA-RESUME/src/components/OrbitalWheel.jsx`  
**Key Features**:
- SVG-based, no three.js/babylon.js
- Profile photo in center (clipped circle, 160px)
- 6 nodes arranged in hexagon
- Smooth color transitions on hover
- Optional slow rotation background animation

**Pseudo-code**:
```jsx
export default function OrbitalWheel({ onNodeClick, theme }) {
  const SIZE = 420;
  const HUB_RADIUS = 70;
  const TRACK_RADIUS = 150;
  const NODE_RADIUS = 30;
  const NODES = 6;
  
  return (
    <svg width={SIZE} height={SIZE} viewBox={...}>
      <defs>
        <clipPath id="hubClip"><circle r={HUB_RADIUS - 6} /></clipPath>
      </defs>
      
      {/* Animated orbital track (optional) */}
      <circle r={TRACK_RADIUS} stroke={theme.muted} strokeDasharray="..." opacity={0.2} />
      
      {/* 6 nodes */}
      {Array.from({length: NODES}).map((_, i) => {
        const angle = (i / NODES) * 360;
        const [x, y] = polarToCartesian(TRACK_RADIUS, angle);
        return (
          <g key={i} onClick={() => onNodeClick(SECTIONS[i])}>
            <circle cx={x} cy={y} r={NODE_RADIUS} fill={theme.accent} />
            <text>{SECTIONS[i].label}</text>
          </g>
        );
      })}
      
      {/* Hub: photo + border */}
      <circle r={HUB_RADIUS} fill="white" stroke={theme.brand} strokeWidth={2.5} />
      <image href="/ViteResumePage/profile.jpg" clipPath="url(#hubClip)" />
    </svg>
  );
}
```

**Test Cases**:
- [ ] 6 nodes arranged in perfect hexagon
- [ ] Hover node; accent color applies
- [ ] Click node; navigate to section
- [ ] Photo displays correctly in hub
- [ ] Theme change; node colors update
- [ ] Mobile (900px): scaling/sizing appropriate
- [ ] Keyboard: tab to node, Enter/Space to click

---

#### Task 2.3: Create ParticleCanvas Background
**Duration**: 3-4 hours | **Effort**: High  
**Dependencies**: Task 2.1 (theme colors), mobile detection  
**Testing**: Performance (30fps target), theme switching, disable on mobile

- [ ] Canvas element in left panel background
- [ ] 40-50 floating particles (small dots, 2-4px radius)
- [ ] Brownian motion: random velocity + gentle gravity/damping
- [ ] Collision detection: bounce off edges, possibly each other
- [ ] **Theme-aware colors**: use theme accent + muted blend
- [ ] **30fps target**: use `requestAnimationFrame` with frame-skip logic
- [ ] **Mobile disable**: set `disabled={viewport < 900px}`
- [ ] Fade particles in on load (0.5s animation)
- [ ] Smooth color transition when theme changes

**File**: `QA-RESUME/src/components/ParticleCanvas.jsx`  
**Key Features**:
- Canvas 2D, no WebGL
- Particles class with position, velocity, radius
- Animation loop: clear canvas → update particles → draw
- Theme-aware colors (get from context)
- Performance monitoring: log FPS to console (dev only)

**Pseudo-code**:
```jsx
export default function ParticleCanvas({ theme, disabled = false }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  
  useEffect(() => {
    if (disabled) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update & draw particles
      particlesRef.current.forEach(p => {
        p.update();
        p.draw(ctx, theme);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [disabled, theme]);
  
  return <canvas ref={canvasRef} width={500} height={800} />;
}
```

**Test Cases**:
- [ ] Particles visible in left panel
- [ ] Smooth animation (no stutter)
- [ ] Theme change; particle colors update
- [ ] Mobile (width < 900px); particles disabled
- [ ] Performance: DevTools shows >25fps
- [ ] Load animation: particles fade in

---

#### Task 2.4: Replace NexusWheel with OrbitalWheel in Hero
**Duration**: 1 hour | **Effort**: Low  
**Dependencies**: Task 2.2 (OrbitalWheel built)  
**Testing**: Hero section layout, click behavior

- [ ] In `HeroSection`, replace `<NexusWheel />` with `<OrbitalWheel />`
- [ ] Pass theme via context or prop
- [ ] Verify nav click still works
- [ ] Check sizing (420px) fits in left panel without overflow
- [ ] Optional: Add subtle title below wheel (like current NexusWheel hint)

**File**: `QA-RESUME/src/App.jsx` (HeroSection component)

**Test Cases**:
- [ ] OrbitalWheel displays
- [ ] Click node navigates to section
- [ ] Mobile (< 900px): sizing appropriate
- [ ] Desktop (> 900px): well-centered in left panel

---

### SPRINT 3: Data Refactor + Polish (4-5 days)

**Goal**: Update content, finalize themes, full mobile testing.  
**Deliverable**: Production-ready, all themes polished, mobile UX complete.

#### Task 3.1: Data Refactor — Skills & Experience
**Duration**: 1-2 hours | **Effort**: Medium  
**Dependencies**: None (can happen in parallel)  
**Testing**: Data validation, visual rendering

- [ ] **Skills**: Consolidate 6 categories → 5:
  - ~~Mobile~~ + Core Software → **Software Engineering** (Flutter, Next.js, React, Node.js, TypeScript)
  - **AI Orchestration** (Claude Code, LLM Orchestration, Prompt Engineering, Cursor)
  - **Data Systems** (SQLite, PostgreSQL, Firebase, Supabase)
  - **Quality & DevOps** (Selenium, Appium, Jest, Cypress, Azure CI/CD, Docker)
  - **Enablement Tools** (Git, Postman, Jira, Azure, C/C++, Python)

- [ ] **New Experience**: Add AI Enablement Specialist role:
  ```js
  {
    role: 'AI Enablement Specialist',
    company: 'Independent',
    location: 'Remote',
    period: '2025 – Present',
    points: [
      { label: 'AI Education', text: 'Teaching teams and individuals how to leverage LLMs and agentic systems in their workflows.' },
      { label: 'Agent Design', text: 'Architecting multi-step AI workflows for knowledge work automation.' },
    ],
  }
  ```

- [ ] **Add AI Governance Callout**: New bento card in expertise section highlighting governance/ethics
  ```js
  {
    category: 'AI Governance',
    items: ['Responsible AI', 'Bias Mitigation', 'Prompt Safety', 'Output Validation'],
  }
  ```

- [ ] **Update Profile Title**: Change from:
  - OLD: "Full-Stack Developer | AI Orchestration | QA Expert"
  - NEW: "AI Enablement Specialist | Agentic AI Champion"

**File**: `QA-RESUME/src/App.jsx` (data object D)

**Test Cases**:
- [ ] Skills grid renders 5 categories without layout breakage
- [ ] AI Enablement experience shows in timeline
- [ ] AI Governance appears in expertise section
- [ ] Profile title updates globally (header + hero)

---

#### Task 3.2: Finalize Theme Palette & Colors
**Duration**: 1 hour | **Effort**: Low  
**Dependencies**: Task 2.1 (ThemeContext)  
**Testing**: Color contrast (WCAG AA), visual harmony

- [ ] Refine three theme palettes:
  1. **Warm Organicist (A)**: warm oranges, natural feel
  2. **Dark Technician (B)**: cool cyans, dark mode feel
  3. **Clean Modernist (C)**: bright blues, minimalist feel
- [ ] Ensure all 5 colors in each theme (accent, brand, surface, muted, forest)
- [ ] Test contrast ratios: accent vs surface, brand vs surface (WCAG AA min 4.5:1)
- [ ] Update CSS variables in `:root` for default theme
- [ ] Test theme switcher applies all colors consistently

**Files**: `QA-RESUME/src/context/ThemeContext.jsx`, `QA-RESUME/src/index.css`

**Test Cases**:
- [ ] Each theme passes WCAG AA contrast for main text
- [ ] Accent color visible on all backgrounds
- [ ] Theme switcher updates all components atomically (no flashing)
- [ ] Focus indicators (buttons, links) visible in all themes

---

#### Task 3.3: Comprehensive Mobile Testing & Refinement
**Duration**: 2-3 hours | **Effort**: Medium  
**Dependencies**: All previous tasks  
**Testing**: Multiple devices, orientations, touch interactions

- [ ] Test viewports:
  - 375px (iPhone SE, small phone)
  - 414px (iPhone 14)
  - 768px (iPad mini, tablet)
  - 900px (breakpoint — verify both layouts)
  - 1024px (iPad, desktop)
  - 1920px (desktop)

- [ ] Touch interactions:
  - Nav dot taps (should be 44px+ minimum hit target)
  - Modal opening/closing
  - Theme switcher accessibility
  - Project card clicks

- [ ] Orientation changes:
  - Portrait to landscape on phone
  - Verify layout reflows correctly
  - No content hidden unexpectedly

- [ ] Performance:
  - Lighthouse audit (target: 85+ on performance)
  - Slow 3G simulation
  - ParticleCanvas FPS on low-end devices

- [ ] Accessibility:
  - Keyboard navigation (tab order, focus visible)
  - Screen reader testing (NVDA on Windows, VoiceOver on Mac)
  - Color contrast check with WAVE extension

**Test Results Document**:
Create `MOBILE_TEST_RESULTS.md` with screenshots/findings for each viewport.

**Test Cases**:
- [ ] 375px: single column, left panel hidden, right panel full width
- [ ] 900px: two-panel layout stable, no horizontal scroll
- [ ] 1920px: two panels properly sized, not stretched
- [ ] Touch: tap nav dots from 375px viewport
- [ ] Theme switch: works on mobile
- [ ] Modal: opens and closes smoothly on phone
- [ ] Lighthouse: Performance 85+, Accessibility 90+

---

#### Task 3.4: Polish & Micro-interactions
**Duration**: 1-2 hours | **Effort**: Low  
**Dependencies**: All previous tasks  
**Testing**: Subjective feel, visual feedback

- [ ] Add subtle hover/focus states to interactive elements
- [ ] Verify smooth transitions (0.15s standard)
- [ ] Button press feedback (shadow/scale changes)
- [ ] Loading states (if any, like PDF download)
- [ ] Scroll behavior: smooth scroll working on all browsers
- [ ] Modal animations: smooth slide-up on desktop, bottom sheet on mobile

**Test Cases**:
- [ ] Hover bento card; shadow lifts smoothly
- [ ] Click nav dot; right panel scrolls smoothly
- [ ] Theme switch; colors transition smoothly (0.2s)
- [ ] Modal open; backdrop fades in, dialog slides up
- [ ] Modal close; reverse animation smooth

---

#### Task 3.5: Final Audit & Bug Fixes
**Duration**: 1-2 hours | **Effort**: Medium  
**Dependencies**: Task 3.4 (all visual work done)  
**Testing**: Code review, QA checklist

- [ ] Code review checklist:
  - [ ] No console errors/warnings
  - [ ] No unused imports
  - [ ] Proper error boundaries if any async code
  - [ ] Accessibility: keyboard nav works
  - [ ] Mobile: no layout shift on scroll
  - [ ] Theme: all 3 themes consistent

- [ ] Browser testing (latest versions):
  - [ ] Chrome/Chromium
  - [ ] Firefox
  - [ ] Safari (macOS + iOS)
  - [ ] Edge

- [ ] Performance:
  - [ ] No jank on scroll (60fps target)
  - [ ] ParticleCanvas: 30fps on mobile
  - [ ] Font loading: no FOUT/FLIT

- [ ] Fix any blockers found

**Test Cases**:
- [ ] All browsers: no visual bugs
- [ ] Mobile (iOS Safari): touch interactions work
- [ ] Desktop: all interactions snappy
- [ ] Lighthouse: Performance 85+, Accessibility 90+, Best Practices 90+

---

## Testing Strategy

### Unit Tests (Optional for Phase 1)
- `OrbitalWheel` component: rendering, click handlers, theme colors
- `ParticleCanvas`: initialization, animation loop, frame rate
- Theme switching: localStorage persistence, CSS var updates

### Integration Tests
- Two-panel layout: responsive breakpoint switching
- Navigation: scroll-to-section, active highlight
- Theme: global color application across all components

### E2E Tests (Manual, for now)
- User flow: load → scroll → click nav → theme switch → mobile test
- See **Task 3.3** for comprehensive test matrix

### Performance Tests
- Lighthouse audit: 85+ performance, 90+ accessibility
- ParticleCanvas: 30fps min on mobile, <5% CPU
- Font loading: no layout shift (measure CLS)

### Accessibility Tests
- WAVE extension: no errors, minimal warnings
- Keyboard nav: tab order logical, all buttons focusable
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Screen reader: major sections announced correctly

---

## Dependency Graph & Critical Path

```
Task 1.1 (Fonts) → Task 1.2 (CSS Layout) → Task 1.3 (App.jsx) → Task 1.4 (App.css) ✓ SPRINT 1
                                                                           ↓
                                                                    SPRINT 2 starts
                                                                           ↓
Task 2.1 (Theme) ─┬→ Task 2.2 (OrbitalWheel) ┐
                  ├→ Task 2.3 (ParticleCanvas) ├→ Task 2.4 (Replace Wheel) ✓ SPRINT 2
                  └→ Parallel: Task 3.1 (Data) ┘                    ↓
                                                                    SPRINT 3 starts
                                                                           ↓
Task 3.2 (Colors) ─┐
                   ├→ Task 3.3 (Mobile) → Task 3.4 (Polish) → Task 3.5 (Audit) ✓ SPRINT 3
Task 3.1 (Data) ──┘
```

**Critical Path**: 1.1 → 1.2 → 1.3 → 1.4 → 2.1 → 2.4 → 3.5  
**Total Serial Time**: ~15 days (but parallelizable)  
**Recommended Approach**: 3-4 days Sprint 1, then parallel Sprints 2 & 3

---

## Commit Message Guide

Follow **Conventional Commits** format:

```
feat: establish two-panel layout with 50vw grid
feat: add orbital wheel navigation component
feat: implement theme switching with localStorage
feat: add particle canvas animation to left panel
feat: refactor skills and experience data
fix: correct IntersectionObserver scroll container
docs: update phase 1 implementation notes
```

---

## Rollback & Risk Mitigation

### If Two-Panel Layout Fails
1. Revert to single-column on all viewports
2. Keep navbar fixed, restore SideNav
3. Continue with component replacements (Wheel, ParticleCanvas) in existing layout

### If Mobile Breaks
1. Drop two-panel layout below 900px; use existing single-column
2. Disable ParticleCanvas on mobile (performance)
3. Simplify modal/overlay on mobile

### If Theme System Complexity Grows
1. Defer ThemeContext to Phase 2
2. Use fixed design system for Phase 1 (Warm Organicist only)
3. Add theme switching after core redesign is stable

---

## Success Criteria

By end of Phase 1, the site should:

✓ Display in a 50vw two-panel layout on desktop (900px+)  
✓ Fall back to single-column on mobile (< 900px)  
✓ Feature OrbitalWheel with 6 navigation nodes  
✓ Animate particle background in left panel (desktop only)  
✓ Support 3 theme palettes with instant switching  
✓ Maintain smooth scroll navigation (nav dots highlight correctly)  
✓ Pass WCAG AA accessibility (contrast, keyboard nav, screen reader)  
✓ Score 85+ on Lighthouse Performance  
✓ Load all new fonts without FOUT/FLIT  
✓ All 3 themes tested on mobile and desktop

---

## Post-Phase 1 Roadmap

**Phase 2** (optional):
- Advanced animations (Lottie/Spline for hero)
- AI Governance deepdive section
- Project showcase enhancements
- Blog/writing section integration

**Phase 3** (later):
- Dark theme refinement
- Micro-interactions (scroll parallax, reveal animations)
- PDF CV download improvements
- Analytics integration

---

## Quick Reference: File Changes Summary

| File | Change | Effort |
|------|--------|--------|
| `index.html` | Update Google Fonts | Trivial |
| `src/index.css` | Add panel layout, themes, variables | Medium |
| `src/App.jsx` | Restructure to two-panel, add ThemeProvider | High |
| `src/App.css` | Update hero grid, responsive rules | Medium |
| `src/components/OrbitalWheel.jsx` | **New** component | High |
| `src/components/ParticleCanvas.jsx` | **New** component | High |
| `src/context/ThemeContext.jsx` | **New** context | Medium |
| `src/components/NexusWheel.jsx` | **Delete** (replace with OrbitalWheel) | Trivial |

**Total New Lines**: ~1200 (layouts, themes, components)  
**Estimated Refactor**: 40-50 hrs (2-3 weeks at 15-20 hrs/week)

