---
name: ui-ux-design
description: Enterprise UI/UX design patterns, micro-interactions, responsive layouts, Tailwind styling, accessibility, and visual polish guidelines.
---

# UI/UX Design & Engineering Skill

Use this skill whenever crafting user interfaces, designing layout hierarchies, adding micro-interactions, or refining visual polish.

## 🎨 Core Design Principles

### 1. Hierarchy & Contrast
- **Primary vs Secondary vs Tertiary:** Maintain clear visual weight. Only one primary call-to-action per view.
- **Surface Elevation:** Use distinct surface levels (e.g. `bg-slate-950` for canvas, `bg-slate-900/60` for cards, `bg-slate-900/90` for modals, with subtle borders `border-slate-800/80`).
- **Typography Scaling:** Always pair strong font weights with subtle contrast (`text-white font-bold` for titles, `text-slate-400` for subtitles/labels, `font-mono text-xs` for IDs and timestamps).

### 2. Micro-Interactions & State Polish
- **Hover & Active States:** Every clickable element must have an active/hover feedback (`hover:bg-slate-800 transition-colors duration-150`, `hover:scale-[1.02]`).
- **Loading Skeletons & Stream Animations:** Never leave empty space while data is loading. Use pulse indicators or skeleton blocks.
- **Feedback & Confirmation:** Immediate visual confirmation on copy, delete, save, or download actions (toasts, badge changes, or check icons).

### 3. Enterprise Density & Ergonomics
- **Information Density:** Financial, compliance, and developer tools benefit from compact spacing (`py-2 px-3`, `text-xs`) with clean alignment.
- **Empty & Error States:** Every table, list, or panel must provide an illustrated/icon empty state explaining why it's empty and offering an action button.
- **Responsive Adaptability:** Ensure sidebars collapse smoothly into hamburger menus or bottom sheets on small screens.

### 4. Accessibility (a11y)
- Include accessible `title` and `aria-label` tags on icon-only buttons.
- Ensure minimum contrast ratios (WCAG AA standard) across dark and light modes.
- Provide keyboard navigation (`Enter` to submit, `Esc` to dismiss modals/drawers).
