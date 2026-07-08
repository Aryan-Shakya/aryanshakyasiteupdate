# Anti-AI Slop Design Guidelines

This document outlines common visual tropes and clichés frequently produced by default AI models ("AI slop") and provides concrete, professional drop-in replacements for modern web development.

---

## 1. Gradients vs. Flat Harmony
### The Cliché (Avoid)
- Multi-color rainbow gradients (`linear-gradient(135deg, #FF0080, #7928CA, #00DF89)`).
- Neon gradients applied as text fills or background blobs on simple SaaS cards.
- Random gradient borders without semantic meaning.

### The Replacement (Use)
- **Flat, rich solid colors** that let typography and layout speak.
- **Subtle, low-contrast monochromatic blends** within the same hue family:
  ```css
  /* Subtle dark surface blend */
  background: linear-gradient(180deg, oklch(20% 0.02 260) 0%, oklch(16% 0.02 260) 100%);
  ```
- **Radial glow highlights** for dark mode depth:
  ```css
  background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.07) 0%, transparent 60%);
  ```

---

## 2. Card Architecture
### The Cliché (Avoid)
- Default rounded card with thick colored left border:
  ```css
  /* AI Slop Default */
  border-radius: 12px;
  border-left: 4px solid #6366F1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  ```

### The Replacement (Use)
- **Layered borders and diffused elevation**:
  ```css
  /* Premium Modern Card */
  background: oklch(18% 0.015 260);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.2),
    0 8px 16px -4px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
  ```
- Reserve thick colored left borders strictly for **semantic system alerts** (e.g., danger, warning, success notices).

---

## 3. Typography & Font Stacks
### The Cliché (Avoid)
- Silent fallback to basic Arial, Roboto, or uncalibrated Inter across all headings and body text without size/weight contrast.
- Everything bold (`font-weight: 700`) or everything regular (`font-weight: 400`).

### The Replacement (Use)
- **Intentional pairings**:
  - *Tech / SaaS / Dashboard*: **Outfit** or **Plus Jakarta Sans** (Display) + **Inter** or **Geist** (Body).
  - *Editorial / Luxury / Portfolio*: **Playfair Display** or **Newsreader** (Serif Heading) + **Plus Jakarta Sans** or **Inter** (Clean Body).
  - *Developer Tools*: **JetBrains Mono** or **Fira Code** for metrics, code snippets, and technical labels.
- Apply CSS `text-wrap: balance` on titles and `text-wrap: pretty` on body copy to prevent orphan words.

---

## 4. Emoji & Decorative Iconography
### The Cliché (Avoid)
- Sprinkling emojis into headings, buttons, and bullet lists:
  - *"🚀 Boost Your Productivity Today!"*
  - *"📈 Real-time Analytics & Growth"*
  - *"✅ Easy 5-minute Setup"*

### The Replacement (Use)
- **Zero performative emoji**. Use crisp, calibrated SVG icons from modern design systems (Lucide Icons, Phosphor Icons, Feather Icons).
- Align icons precisely with line-height and typography size (`width: 1.25em; height: 1.25em; vertical-align: -0.2em;`).
- When a status indicator is needed, use a clean **CSS pulsing dot**:
  ```html
  <span class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
    System Operational
  </span>
  ```

---

## 5. Honest Placeholders vs. AI Hallucinated SVG
### The Cliché (Avoid)
- Attempting to generate complex, lumpy SVG drawings of people, laptops, or abstract office scenes when real illustration assets are missing.

### The Replacement (Use)
- Use clean, architectural **honest placeholders** that clearly communicate intended dimensions and asset type:
  ```html
  <div class="w-full h-64 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/50 flex flex-col items-center justify-center text-neutral-500 font-mono text-xs gap-2">
    <svg class="w-6 h-6 stroke-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
    <span>HERO_PRODUCT_SHOT (1200 × 800px)</span>
  </div>
  ```
