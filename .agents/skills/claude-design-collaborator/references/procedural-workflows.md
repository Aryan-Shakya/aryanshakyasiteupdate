# Procedural Design Workflows

When working on complex or greenfield design tasks, follow these structured procedural workflows to ensure high-fidelity results without AI slop.

---

## 1. Greenfield Execution Chain
For new applications, landing pages, or components from scratch, execute these phases sequentially:

### Phase 1: Discovery & Clarifying Questions
Before generating any markup, ask the user a consolidated round of questions to define:
- Target audience, tone, and brand personality.
- Technical constraints (React, Vanilla HTML/CSS, Tailwind, Next.js).
- Whether they require multiple layout variations or a single refined direction.
- Key user actions and primary conversion goals.

### Phase 2: Frontend Aesthetic Direction
Commit to an intentional design language before building:
- **Tone**: Warm editorial, crisp technical dashboard, brutalist modern, or clean luxury.
- **Tokens**: Define primary background (`oklch()`), typography families, and spacing scale.

### Phase 3: Structural Skeleton (Low-Fi to Mid-Fi)
Build the layout structure using real CSS Grid and Flexbox:
- Establish the navigation, hero, primary content area, and footer.
- Apply semantic HTML tags (`<header>`, `<main>`, `<section>`, `<nav>`).
- Ensure proper responsiveness across mobile, tablet, and desktop breakpoints.

### Phase 4: High-Fidelity Interactive Prototype
Transform the skeleton into a rich, interactive web application:
- Apply visual tokens, subtle layered box shadows, and calibrated border radii.
- Implement complete interactive state feedback (hover, active, focus, disabled).
- Integrate dynamic micro-animations (staggered entrance fades, smooth tab switches).
- Ensure all copy follows the **5-Question Anti-Filler Test**.

### Phase 5: Rigorous Polish Pass
Before delivering the final code, perform a comprehensive review:
- Check for and eliminate any accidental AI tropes (neon gradients, decorative emoji, thick left borders on cards).
- Verify WCAG contrast ratios and keyboard focus rings.
- Test responsive layout behavior and eliminate horizontal overflow.

---

## 2. Refactoring Existing Web Apps
When refactoring or redesigning an existing workspace project:
1. **Extract Existing Vocabulary**: Read existing `.css`, `.tailwind.config.js`, or theme files to match the brand's exact hex codes, spacing, and typography.
2. **Audit & Prune**: Remove redundant CSS wrappers, duplicate classes, and inline styles.
3. **Elevate Polish**: Upgrade basic hover states to smooth micro-animations and replace generic borders with refined, layered shadows.
