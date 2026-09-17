# 🎨 Antigravity Skill: Impeccable UI/UX Design Engine

> **Skill Name**: `ui-design-master`  
> **Version**: 2.0.0  
> **Target**: Antigravity AI Agent & Subagents  
> **Description**: Enforces ultra-premium aesthetic standards, dynamic modern layouts, rich color palettes, glassmorphism, fluid motion, and responsive component design across all web applications.

---

## 🚀 Core Philosophy & Principles

When this skill is active, **Antigravity must never create basic, generic, or default-looking interfaces.** Every generated UI must feel like a state-of-the-art SaaS product, award-winning agency landing page, or high-end interactive experience.

### Rule 1: The "First-Glance WOW" Standard
- Never output default browser styling, plain monochrome layouts, or unstyled controls.
- Every page must feature curated color harmonies, custom typography, subtle ambient glows, dynamic depth, and crisp visual hierarchy.

---

## 🎨 1. Color Palette & Lighting Architecture

### A. Dark Mode Base (Default Choice for High-End Aesthetic)
Avoid pure black (`#000000`) unless OLED black is explicitly requested. Use layered, rich cosmic/slate darks:
```css
:root {
    /* Primary Backgrounds */
    --bg-base: #090a0f;
    --bg-surface: #12151e;
    --bg-surface-elevated: #1a1e2b;
    --bg-glass: rgba(26, 30, 43, 0.65);

    /* Brand & Accent Harmonies */
    --primary: #6366f1;       /* Vibrant Indigo */
    --primary-glow: rgba(99, 102, 241, 0.35);
    --accent: #a855f7;        /* Electric Violet */
    --accent-glow: rgba(168, 85, 247, 0.35);
    --cyan-highlight: #06b6d4;/* Neon Cyan Accent */
    --rose-highlight: #f43f5e;/* Crimson Warning/Highlight */

    /* Typography Colors */
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --text-faint: #64748b;

    /* Borders & Outlines */
    --border-subtle: rgba(255, 255, 255, 0.08);
    --border-glow: rgba(99, 102, 241, 0.3);
}
```

### B. Glassmorphism & Depth Layers
Combine `backdrop-filter`, semi-transparent backgrounds, and inner glows:
```css
.glass-panel {
    background: var(--bg-glass);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid var(--border-subtle);
    box-shadow: 
        0 8px 32px 0 rgba(0, 0, 0, 0.37),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
    border-radius: 20px;
}
```

---

## ✒️ 2. Typography & Fluid Scaling

1. **Font Pairings**: Always import modern Google Fonts in HTML or CSS:
   - **Headings**: `Plus Jakarta Sans`, `Outfit`, or `Syne`
   - **Body**: `Inter`, `Roboto`, or `SF Pro Display` fallback
   - **Code/Monospace**: `JetBrains Mono` or `Fira Code`

2. **Fluid Typography (CSS `clamp`)**:
```css
h1, .h1 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(2.2rem, 5vw + 1rem, 4rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #ffffff 30%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

---

## ⚡ 3. Motion & Micro-Interactions

### A. Butter-Smooth Easing
Use exponential spring-like cubic-beziers instead of `ease` or `linear`:
```css
:root {
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --transition-fast: 0.2s var(--ease-out-expo);
    --transition-smooth: 0.4s var(--ease-out-expo);
}
```

### B. Interactive Buttons with Glow & Push Feedback
```css
.btn-primary {
    position: relative;
    padding: 14px 28px;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: #ffffff;
    font-weight: 600;
    font-size: 0.95rem;
    border: none;
    cursor: pointer;
    overflow: hidden;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    box-shadow: 0 4px 20px var(--primary-glow);
}

.btn-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 30px var(--accent-glow);
}

.btn-primary:active {
    transform: translateY(1px) scale(0.98);
}
```

---

## 📐 4. Layout Architecture (Bento Grids & Cards)

Use modern Bento Grid layouts for dashboards, feature showcases, and content containers:

```css
.bento-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem;
}

.bento-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    transition: border-color var(--transition-smooth), transform var(--transition-smooth);
}

.bento-card:hover {
    border-color: var(--border-glow);
    transform: translateY(-4px);
}
```

---

## 🛠️ 5. How to Activate This Skill in Antigravity

### Method A: Subagent Activation
Invoke a subagent using this skill prompt:
```json
{
  "TypeName": "ui_designer",
  "Role": "Impeccable UI/UX Specialist",
  "Prompt": "Design the user interface following all rules specified in UI_DESIGN_SKILL.md. Ensure responsive glassmorphic cards, custom cubic-bezier animations, dark mode theme with neon accent glows, and modern typography."
}
```

### Method B: Workspace Rule Integration
Add `@UI_DESIGN_SKILL.md` to your prompt or include this file in your project's workspace instructions so Antigravity reads it during every turn.

---

## ✅ Quality Checklist (Enforced by Agent)
- [ ] No raw/default browser styles or standard HTML buttons.
- [ ] Color contrast meets WCAG AA standards while looking vibrant.
- [ ] Smooth hover, active, and focus states on all interactive elements.
- [ ] Google Fonts imported with fluid scaling applied.
- [ ] Fully responsive on mobile, tablet, and widescreen.
- [ ] Micro-animations for feedback (spinners, ripples, state transitions).
