# Hierarchy & Rhythm Tokens

Visual hierarchy guides the user's eye sequentially through an interface. Spacing rhythm transforms arbitrary web layouts into structured, satisfying compositions.

---

## 1. Modular Spacing Scale
Never use random pixel values for margins, padding, or gaps. Standardize around a 4px/8px modular scale defined in CSS variables:

```css
:root {
  /* Spacing Tokens */
  --space-2xs: 2px;
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;
  --space-3xl: 96px;
  
  /* Layout Containers */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
}
```

### Application Rules
- **Component Padding**: Use `--space-sm` or `--space-md` for buttons, inputs, and cards.
- **Section Breathers**: Use `--space-2xl` or `--space-3xl` between major landing page sections.
- **Related Grouping**: Place titles and descriptions close together (`gap: var(--space-xs)` or `var(--space-sm)`), and separate independent cards with larger gaps (`gap: var(--space-lg)`).

---

## 2. Color Palettes with `oklch()`
`oklch(L C H)` provides perceptually uniform color palettes where Lightness (L) and Chroma (C) stay balanced across different Hues (H).

```css
:root {
  /* Dark Mode Surface Palette */
  --bg-root:      oklch(14% 0.01 260);
  --bg-surface:   oklch(18% 0.015 260);
  --bg-elevated:  oklch(22% 0.02 260);
  
  /* Text Contrast Hierarchy */
  --text-primary:   oklch(96% 0.01 260);  /* #FAFAFA equivalent */
  --text-secondary: oklch(75% 0.02 260);  /* Muted supporting text */
  --text-tertiary:  oklch(55% 0.02 260);  /* Labels, timestamps */
  
  /* Brand Accent & Harmony */
  --accent-primary: oklch(65% 0.22 260);  /* Vibrant Blue/Indigo */
  --accent-hover:   oklch(70% 0.22 260);
  --accent-subtle:  oklch(65% 0.22 260 / 12%);
}
```

---

## 3. Typography Hierarchy & Scales
Establish clear visual separation between heading levels and body copy using size, line-height, and tracking (letter-spacing):

```css
:root {
  /* Font Family Stacks */
  --font-display: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body:    'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
  
  /* Type Scale */
  --text-xs:   0.75rem;   /* 12px / 16px line-height */
  --text-sm:   0.875rem;  /* 14px / 20px line-height */
  --text-base: 1.0rem;    /* 16px / 24px line-height */
  --text-lg:   1.125rem;  /* 18px / 28px line-height */
  --text-xl:   1.25rem;   /* 20px / 28px line-height */
  --text-2xl:  1.5rem;    /* 24px / 32px line-height */
  --text-3xl:  1.875rem;  /* 30px / 36px line-height */
  --text-4xl:  2.25rem;   /* 36px / 40px line-height */
  --text-5xl:  3.0rem;    /* 48px / 52px line-height */
}

/* Base Typographical Styling */
h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  text-wrap: balance;
}

body, p {
  font-family: var(--font-body);
  color: var(--text-secondary);
  line-height: 1.6;
  text-wrap: pretty;
}
```

---

## 4. Combining Hierarchy Signals
To make the primary call-to-action or key data point unmistakable:
1. **Size**: Give it the largest font size or layout container.
2. **Weight**: Set font-weight to bold or semi-bold.
3. **Color**: Apply the high-chroma brand accent.
4. **Isolation**: Surround it with generous whitespace (`padding` or `margin`).
5. **Contrast**: Ensure supporting elements are visually stepped down (smaller, lighter, neutral color).
