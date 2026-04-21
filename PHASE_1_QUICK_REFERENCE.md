# Phase 1 Quick Reference Checklist

**Print this out or keep it open while coding.**

---

## Sprint 1: Layout Foundation (Days 1–5)

### Task 1.1: Update Fonts ✓
- [ ] Replace Google Fonts import in `index.html`
- [ ] Add: Playfair Display (700, 900) + DM Sans (400, 600)
- [ ] Include `display=swap` and preconnect links
- [ ] Test: DevTools → Network → Google Fonts loads
- **Estimated**: 30 min | **Status**: Not Started

### Task 1.2: Two-Panel CSS ✓
- [ ] Create `.panel-wrapper`: `display: grid; grid-template-columns: 50vw 50vw`
- [ ] Create `.left-panel`: sticky, hidden overflow, 50vw width
- [ ] Create `.right-panel`: overflow-y auto, scrollable
- [ ] Add mobile breakpoint: `@media (max-width: 899px)` → single column
- [ ] Test: 375px (single), 900px (transition), 1920px (two-panel)
- **Estimated**: 1–2 hours | **Status**: Not Started

### Task 1.3: Refactor App.jsx ✓
- [ ] Wrap content in `<div className="panel-wrapper">`
- [ ] Move NavBar inside left panel
- [ ] Restructure: left panel (hero text + photo) + right panel (scrollable sections)
- [ ] Update IntersectionObserver: `root: document.querySelector('.right-panel')`
- [ ] Test: Click nav → scroll works, active section highlights
- **Estimated**: 2–3 hours | **Status**: Not Started

### Task 1.4: Update App.css ✓
- [ ] Update `.hero-grid`: single column in left panel
- [ ] Remove navbar padding from sections
- [ ] Update media queries for two-panel context
- [ ] Test: Visual alignment, spacing on desktop + mobile
- **Estimated**: 1 hour | **Status**: Not Started

**Sprint 1 Done?** ✓ Two-panel layout working, responsive at 900px

---

## Sprint 2: Components (Days 6–12)

### Task 2.1: ThemeContext ✓
- [ ] Create `src/context/ThemeContext.jsx`
- [ ] Define 3 themes: Warm Organicist, Dark Technician, Clean Modernist
- [ ] Implement localStorage persistence
- [ ] Add theme switcher UI (3 radio buttons in top-right)
- [ ] Test: Switch theme, reload page, theme persists
- **Estimated**: 2–3 hours | **Status**: Not Started

### Task 2.2: OrbitalWheel ✓
- [ ] Create `src/components/OrbitalWheel.jsx`
- [ ] SVG: 420px × 420px, hub (profile photo, 64px radius), 6 nodes at 60° spacing
- [ ] Nodes: 30px radius, positioned on 150px track
- [ ] Hover: fill color changes to theme.accent
- [ ] Click: `onNodeClick(sectionId)` callback
- [ ] Accessibility: ARIA labels, keyboard support (Tab + Enter/Space)
- [ ] Test: Renders 6 nodes, hover works, click navigates, theme change updates colors
- **Estimated**: 3–4 hours | **Status**: Not Started

### Task 2.3: ParticleCanvas ✓
- [ ] Create `src/components/ParticleCanvas.jsx`
- [ ] Canvas 2D: 40–50 particles, 2–4px radius each
- [ ] Physics: Brownian motion, bounce off edges, optional gravity/damping
- [ ] Colors: theme.accent + theme.muted blend, 0.3–0.7 opacity
- [ ] Animation: `requestAnimationFrame`, 30fps target
- [ ] Disable on mobile: `disabled={viewport < 900px}`
- [ ] Test: Particles visible, smooth animation (>25fps), theme change works
- **Estimated**: 3–4 hours | **Status**: Not Started

### Task 2.4: Replace NexusWheel ✓
- [ ] In `HeroSection`, replace `<NexusWheel />` with `<OrbitalWheel />`
- [ ] Remove `src/components/NexusWheel.jsx` (not used anymore)
- [ ] Test: Wheel displays, click works, sizing correct on mobile
- **Estimated**: 1 hour | **Status**: Not Started

**Sprint 2 Done?** ✓ OrbitalWheel + ParticleCanvas working, theme system live

---

## Sprint 3: Polish & QA (Days 13–18)

### Task 3.1: Data Refactor ✓
- [ ] Skills: 6 categories → 5 (Software Engineering, AI Orchestration, Data Systems, Quality & DevOps, Enablement)
- [ ] Add AI Enablement Specialist role (2025–present)
- [ ] Add AI Governance card in expertise
- [ ] Update profile: "AI Enablement Specialist | Agentic AI Champion"
- [ ] Test: Data renders, no layout breakage
- **Estimated**: 1–2 hours | **Status**: Not Started

### Task 3.2: Theme Tuning ✓
- [ ] Refine 3 theme palettes (color harmony, contrast)
- [ ] Verify WCAG AA contrast (4.5:1) for all text
- [ ] Test: All 3 themes readable, focus visible in all themes
- **Estimated**: 1 hour | **Status**: Not Started

### Task 3.3: Mobile Testing ✓
- [ ] Test viewports: 375px, 414px, 768px, 900px, 1024px, 1920px
- [ ] Test devices: iPhone (Safari), Android (Chrome), iPad (landscape)
- [ ] Touch: 44px+ hit targets, smooth scrolling, no jank
- [ ] Theme: Switching works on mobile
- [ ] Modal: Opens/closes smoothly
- [ ] Lighthouse: 85+ performance, 90+ accessibility
- **Estimated**: 2–3 hours | **Status**: Not Started

### Task 3.4: Micro-interactions ✓
- [ ] Button hover: shadow lift, smooth transition
- [ ] Theme switch: color transition 0.2s
- [ ] Modal: slide-up animation on desktop, bottom sheet on mobile
- [ ] Nav dot: highlight + color change on section scroll
- [ ] Test: No stutters, 60fps on desktop, 30fps on mobile
- **Estimated**: 1–2 hours | **Status**: Not Started

### Task 3.5: Final Audit ✓
- [ ] No console errors/warnings
- [ ] No unused imports or dead code
- [ ] Keyboard navigation: Tab → Enter works on all buttons
- [ ] Screen reader: Major sections announced correctly
- [ ] Lighthouse: 85+ performance, 90+ accessibility, 90+ best practices
- [ ] Browsers: Chrome, Firefox, Safari, Edge all working
- [ ] Base URLs: All links use `/ViteResumePage/` correctly
- **Estimated**: 1–2 hours | **Status**: Not Started

**Sprint 3 Done?** ✓ Production-ready, all devices tested, all themes polished

---

## Critical Test Cases by Viewport

### Mobile (375px)
- [ ] Left panel hidden
- [ ] Right panel 100% width
- [ ] Single column scrolling works
- [ ] Touch targets 44px+ (nav dots, buttons)
- [ ] Lighthouse 85+ performance

### Tablet (768px)
- [ ] Still single column
- [ ] Scrolling smooth
- [ ] Modal full-screen or centered

### Desktop Breakpoint (900px)
- [ ] **CRITICAL**: Both layouts work (test both 899px and 900px)
- [ ] No horizontal scroll at either width
- [ ] Left panel sticky, right panel scrolls

### Desktop (1920px)
- [ ] Two panels visible, 50vw each
- [ ] No layout shift
- [ ] Wheel sized appropriately

---

## Theme System Checklist

### Warm Organicist (A) — Default
- [ ] `--accent: #c45c00` (orange)
- [ ] `--brand: #1a1a1a` (black)
- [ ] `--surface: #f8f6f1` (cream)
- [ ] Contrast ratio ≥4.5:1

### Dark Technician (B)
- [ ] `--accent: #00d9ff` (cyan)
- [ ] `--brand: #0a0e27` (dark blue)
- [ ] `--surface: #0f1423` (dark)
- [ ] Contrast ratio ≥4.5:1

### Clean Modernist (C)
- [ ] `--accent: #3b82f6` (blue)
- [ ] `--brand: #1f2937` (dark gray)
- [ ] `--surface: #ffffff` (white)
- [ ] Contrast ratio ≥4.5:1

**Check with**: https://webaim.org/resources/contrastchecker/

---

## Git Commit Messages

Use conventional commits format:

```
feat: establish two-panel layout with CSS grid (Task 1.2)
feat: refactor App.jsx for two-panel structure (Task 1.3)
feat: implement orbital wheel navigation component (Task 2.2)
feat: add particle canvas background animation (Task 2.3)
feat: create theme context with localStorage (Task 2.1)
feat: refactor skills and experience data (Task 3.1)
fix: correct IntersectionObserver scroll container (if needed)
docs: update CSS for two-panel layout (Task 1.4)
```

---

## Performance Targets

| Metric | Target | How to Check |
|--------|--------|--------------|
| LCP (Largest Contentful Paint) | <2.5s | Lighthouse |
| FID (First Input Delay) | <100ms | Lighthouse |
| CLS (Cumulative Layout Shift) | <0.1 | Lighthouse |
| Performance Score | 85+ | Lighthouse |
| Accessibility Score | 90+ | Lighthouse |
| ParticleCanvas FPS | 30+ | DevTools → Performance |

---

## Accessibility Checklist

- [ ] **Contrast**: All text ≥4.5:1 (WCAG AA)
- [ ] **Keyboard**: Tab through page, all buttons reachable
- [ ] **Focus**: Visible focus indicator on all interactive elements
- [ ] **Screen Reader**: Use NVDA (Windows) or VoiceOver (Mac) to test
- [ ] **Alt Text**: Profile photo has `alt="Phillip Asiimwe"`
- [ ] **ARIA**: Nav dots have `aria-label="Go to expertise"` etc.
- [ ] **Color**: Don't use color alone to convey info (use text + color)

**Tools**:
- Lighthouse (DevTools)
- WAVE browser extension
- WebAIM Contrast Checker
- NVDA screen reader (free, Windows)

---

## Troubleshooting

### Layout Issues
- **Horizontal scroll on mobile?** → Check `.right-panel` has `overflow-x: hidden`
- **Left panel overlapping right?** → Verify `grid-template-columns: 50vw 50vw`
- **Breakpoint not switching?** → Test at exactly 899px and 900px in DevTools

### Navigation Issues
- **Nav doesn't highlight?** → Check IntersectionObserver `root` is `.right-panel`, not window
- **Scroll doesn't work?** → Verify sections have `id` attributes matching NAV_SECTIONS
- **Click doesn't scroll?** → Check `scrollTo` uses right-panel position, not window

### Theme Issues
- **Colors don't update?** → Verify CSS variables are defined in `:root` and theme rule
- **localStorage not persisting?** → Check browser allows localStorage (not private mode)
- **Theme flashing on reload?** → Read theme from localStorage before render

### Performance Issues
- **Jank on scroll?** → Check ParticleCanvas is disabled on mobile
- **Font FOUT/FLIT?** → Verify `font-display: swap` in Google Fonts link
- **Lighthouse red?** → Check for unused JavaScript, optimize images, minify CSS

---

## Done Checklist

### Sprint 1
- [ ] Task 1.1 complete (fonts)
- [ ] Task 1.2 complete (CSS layout)
- [ ] Task 1.3 complete (App.jsx)
- [ ] Task 1.4 complete (App.css)
- [ ] Commit: `feat: establish two-panel layout`
- [ ] Test: 375px, 900px, 1920px all working

### Sprint 2
- [ ] Task 2.1 complete (ThemeContext)
- [ ] Task 2.2 complete (OrbitalWheel)
- [ ] Task 2.3 complete (ParticleCanvas)
- [ ] Task 2.4 complete (replace wheel)
- [ ] Commit: `feat: add orbital wheel and particle canvas`
- [ ] Test: All 3 themes working, animations smooth

### Sprint 3
- [ ] Task 3.1 complete (data refactor)
- [ ] Task 3.2 complete (theme tuning)
- [ ] Task 3.3 complete (mobile testing)
- [ ] Task 3.4 complete (micro-interactions)
- [ ] Task 3.5 complete (final audit)
- [ ] Commit: `feat: polish and accessibility improvements`
- [ ] Test: Lighthouse 85+, all browsers, real devices

### Final
- [ ] Create pull request
- [ ] Code review passed
- [ ] Merge to main
- [ ] Verify GitHub Pages deployment
- [ ] 🎉 Ship it!

---

## Links & Resources

**Local**:
- `PHASE_1_IMPLEMENTATION_PLAN.md` — Detailed task breakdown
- `PHASE_1_TECHNICAL_SPECS.md` — API and component details
- `PHASE_1_SUMMARY.md` — Overview and decisions

**External**:
- [CSS Grid MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Canvas API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [WCAG 2.1 Quick Ref](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)

---

**Print this checklist. Keep it nearby. Check off items as you go. You got this.** 🚀

