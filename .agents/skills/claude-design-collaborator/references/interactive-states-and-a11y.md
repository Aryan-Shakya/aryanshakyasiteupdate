# Interactive States & Accessibility (WCAG)

A design feels alive when it responds dynamically to user interaction. A design is professional when it is accessible to all users, regardless of device or ability.

---

## 1. The 5 Essential Interactive States
Every interactive element (buttons, links, form inputs, selectable cards) must implement all five interactive states:

### 1. Default (Resting)
Clean, balanced contrast with clear boundaries.

### 2. Hover (Mouse Over)
Provide immediate visual feedback. Shift background color slightly lighter/darker, or elevate with a subtle shadow and transform:
```css
.btn-primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px oklch(65% 0.22 260 / 25%);
}
```

### 3. Active (Press / Click)
Simulate tactile feedback by scaling down slightly and resetting elevation:
```css
.btn-primary:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
```

### 4. Focus-Visible (Keyboard Navigation)
Never hide focus rings (`outline: none` without replacement is a critical bug). Use a crisp, offset focus ring that contrasts against the background:
```css
.btn-primary:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

### 5. Disabled (Unavailable)
Reduce opacity and indicate that the action cannot be performed:
```css
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
}
```

---

## 2. Loading & Async Feedback
When an action triggers an asynchronous request or computation:
- **Button Skeletons / Spinners**: Disable the button, retain its explicit width, and display an inline CSS spinner or progress dot sequence.
- **Content Skeletons**: Replace unloaded cards with pulsing placeholder blocks (`animate-pulse` or shimmer gradients) rather than leaving blank white spaces or abrupt content jumps.

---

## 3. WCAG Accessibility Checklist
- **Color Contrast**: Ensure normal text (under 18px) has at least a **4.5:1** contrast ratio against its background. Large heading text (18px bold or 24px regular) requires at least **3:1**.
- **Semantic HTML**: Use native `<button>`, `<a>`, `<input>`, `<select>`, `<header>`, `<main>`, `<nav>`, and `<aside>` tags. Avoid attaching click handlers to bare `<div>` or `<span>` elements without `role="button"` and `tabindex="0"`.
- **Form Labelling**: Every `<input>` or `<textarea>` must have an associated `<label>` or descriptive `aria-label`.
- **Reduced Motion**: Respect user OS motion preferences by wrapping large animations or parallax effects in a media query:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
