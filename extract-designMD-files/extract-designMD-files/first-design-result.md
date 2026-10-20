---
name: Vercel Geist
description: The Vercel design system: pure black canvas, hairline borders, tight Geist typography, and restraint as the central design principle. Chromatic accents are reserved for status, links, and console contexts.
colors:
  # ── Surface system ──────────────────────────────────────────────
  surface: "#0a0a0a" # --ds-background-100, primary canvas, top-bg frequency 37
  surface-dim: "#000000" # --ds-background-200 and --geist-background, frequency 32
  surface-bright: "#2e2e2e" # appears in tab/divider gradients, frequency 9 in backgrounds
  surface-container-lowest: "#000000" # deepest inset, matches --geist-background
  surface-container-low: "#0a0a0a" # standard inset, matches surface
  surface-container: "#111111" # --accents-1, used for raised chips and tags
  surface-container-high: "#1f1f1f" # frequency 10 in borders, common elevated cell bg
  surface-container-highest: "#333333" # --accents-2 and --geist-secondary-lighter, secondary button bg

  # ── Foreground / text ──────────────────────────────────────────
  on-surface: "#ededed" # --accents-7, dominant text color, frequency 2304
  on-surface-variant: "#a1a1a1" # secondary text frequency 557
  on-surface-muted: "#888888" # --accents-5, tertiary text frequency 67
  on-surface-faint: "#7d7d7d" # frequency 20 in text, deeper muted variant
  on-surface-subtle: "#8f8f8f" # frequency 8 in text
  on-surface-quiet: "#878787" # frequency 7 in text

  # ── Inverse (light surfaces) ───────────────────────────────────
  inverse-surface: "#ededed" # light-theme canvas equivalent, frequency 12 in backgrounds
  inverse-on-surface: "#0a0a0a" # --geist-selection-text-color, text on light, frequency 39
  inverse-surface-container: "#fafafa" # --accents-8

  # ── Outline / borders ──────────────────────────────────────────
  outline: "#ffffff24" # rgba(255,255,255,0.14), frequency 48, the signature Vercel hairline
  outline-variant: "#1f1f1f" # frequency 10, secondary divider
  outline-strong: "#2e2e2e" # frequency 3 in borders, used for emphasized dividers
  outline-inverse: "#ededed" # frequency 5 in borders, dividers on light surfaces

  # ── Primary (white CTA) ────────────────────────────────────────
  primary: "#ededed" # --geist-foreground rendered, used in primary buttons and key icons, frequency 25 svg fills
  on-primary: "#0a0a0a" # text on primary buttons, frequency 39 in text + --geist-selection-text-color
  primary-container: "#333333" # --geist-secondary-lighter, secondary CTA bg
  on-primary-container: "#ededed" # text on secondary CTA
  inverse-primary: "#000000" # inverted for light-theme primary

  # ── Secondary (muted gray scale) ───────────────────────────────
  secondary: "#a1a1a1" # frequency 557 in text and 72 in svg fills, the canonical muted accent
  on-secondary: "#0a0a0a"
  secondary-container: "#444444" # --accents-3 and --geist-secondary-light
  on-secondary-container: "#ededed"

  # ── Tertiary (link blue) ───────────────────────────────────────
  tertiary: "#3291ff" # --geist-link-color (oklch fallback) and --geist-console-text-color-blue, frequency 4 in text
  on-tertiary: "#000000" # high-contrast on saturated blue
  tertiary-container: "#102a32" # gradient stop used in info accents, frequency 4 in linear-gradients
  on-tertiary-container: "#3291ff"

  # ── Error / warning ────────────────────────────────────────────
  error: "#ff3e00" # frequency 4 in svg fills, the Vercel orange used for destructive and warning states
  on-error: "#ffffff"
  error-container: "#381205" # gradient stop frequency 4, deep ember tint
  on-error-container: "#ff3e00"

  # ── Success ────────────────────────────────────────────────────
  success: "#00dc82" # frequency 4 in svg fills, the Vercel green for deploy and online status
  on-success: "#000000"

  # ── Console / brand chromatic palette (named in --geist-* vars) ─
  brand-blue: "#3291ff" # --geist-console-text-color-blue, mirrors tertiary
  brand-pink: "#eb367f" # --geist-console-text-color-pink # low-confidence — verify on live site
  brand-purple: "#7928ca" # --geist-console-text-color-purple # low-confidence — verify on live site
  brand-cyan: "#45dec4" # frequency 15 in svg strokes, used for stroke accents on illustrations
  brand-violet-bg: "#291d3a" # --geist-violet-background # low-confidence — verify on live site
  brand-violet-bg-secondary: "#211830" # --geist-violet-background-secondary # low-confidence — verify on live site
  brand-violet-bg-tertiary: "#211830" # --geist-violet-background-tertiary # low-confidence — verify on live site

  # ── Chart / data-viz palette ───────────────────────────────────
  chart-blue: "oklch(0.6494 0.1982 251.813)" # frequency 2 in backgrounds # low-confidence — verify on live site
  chart-red: "oklch(0.6256 0.2234 23.03)" # frequency 1 # low-confidence — verify on live site
  chart-teal: "oklch(0.6071 0.1485 180.24)" # frequency 1 # low-confidence — verify on live site
  chart-deep-blue: "oklch(0.2545 0.0811 255.8)" # frequency 2 # low-confidence — verify on live site

  # ── Overlays and base aliases ──────────────────────────────────
  scrim: "#000000" # --ds-overlay-backdrop-color, modal scrim
  header-overlay: "#111111cc" # --header-import-flow-background, translucent nav overlay
  background: "#0a0a0a" # alias of surface
  on-background: "#ededed"
  surface-variant: "#1f1f1f"

typography:
  display-2xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -2.88px
    fontFeature: '"calt" 0, "rlig"'
  display-xl:
    fontFamily: Geist
    fontSize: 45.1875px
    fontWeight: "600"
    lineHeight: 56px
    letterSpacing: -2.205px
  display-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: "600"
    lineHeight: 48px
    letterSpacing: -1.205px
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.96px
  headline-md:
    fontFamily: Geist
    fontSize: 30.125px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -1.205px
  headline-sm:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  title-lg:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 27.36px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 27.36px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
    letterSpacing: -0.32px
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 21px
    letterSpacing: -0.28px
  label-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 20px
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
  caption:
    fontFamily: Geist
    fontSize: 9.5px
    fontWeight: "500"
    lineHeight: 16px
  micro:
    fontFamily: Geist
    fontSize: 8px
    fontWeight: "500"
    lineHeight: 16px
  code-md:
    fontFamily: '"Geist Mono"'
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 21px
    letterSpacing: -0.28px
  code-sm:
    fontFamily: '"Geist Mono"'
    fontSize: 13px
    fontWeight: "400"
    lineHeight: 20px
  code-xs:
    fontFamily: '"Geist Mono"'
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 16px

rounded:
  none: "0"
  xs: 2px
  sm: 4px
  DEFAULT: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 100px
  full: 9999px

spacing:
  unit: 4px
  xxs: 2px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
  3xl: 32px
  4xl: 40px
  container-padding: 24px
  card-gap: 16px
  control-gap: 8px
  inline-gap: 6px

components:
  # ── Primary CTA (solid white, dark text) ───────────────────────
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.DEFAULT}"
    height: 32px
    padding: 0 12px
  button-primary-hover:
    backgroundColor: "#ffffff" # slight lift toward pure white on hover

  # ── Secondary CTA (gray-on-dark) ───────────────────────────────
  button-secondary:
    backgroundColor: "{colors.surface-container-highest}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.DEFAULT}"
    height: 32px
    padding: 0 12px
  button-secondary-hover:
    backgroundColor: "{colors.secondary-container}"

  # ── Ghost / icon button ────────────────────────────────────────
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.DEFAULT}"
    height: 32px
    padding: 0 8px
  button-ghost-hover:
    backgroundColor: "rgba(255, 255, 255, 0.06)"

  # ── Card (the iconic ring + shadow + ring treatment) ───────────
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-elevated:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px

  # ── Input field ────────────────────────────────────────────────
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.DEFAULT}"
    height: 32px
    padding: 0 12px
  input-field-focus:
    backgroundColor: "{colors.surface}"

  # ── Link ───────────────────────────────────────────────────────
  link:
    textColor: "{colors.tertiary}"
    typography: "{typography.body-md}"
  link-muted:
    textColor: "{colors.on-surface-variant}"

  # ── Code (inline) ──────────────────────────────────────────────
  code-inline:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.sm}"
    padding: 2px 6px

  # ── Navigation ─────────────────────────────────────────────────
  nav-bar:
    backgroundColor: "{colors.header-overlay}"
    textColor: "{colors.on-surface}"
    height: 64px
    padding: 0 24px
  nav-item:
    backgroundColor: transparent
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    padding: 8px 12px
    rounded: "{rounded.sm}"
  nav-item-active:
    textColor: "{colors.on-surface}"

  # ── Tag / badge ────────────────────────────────────────────────
  badge:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  badge-success:
    backgroundColor: "rgba(0, 220, 130, 0.1)"
    textColor: "{colors.success}"
  badge-error:
    backgroundColor: "rgba(255, 62, 0, 0.1)"
    textColor: "{colors.error}"

  # ── Divider ────────────────────────────────────────────────────
  divider:
    backgroundColor: "{colors.outline}"
    height: 1px
---

## Brand & Style

Vercel's design language is architectural restraint applied to developer tools. The system rests on a near-black canvas (#0a0a0a, not pure black, with #000 used as a deeper inset), hairline borders at 14% white opacity, and Geist (Vercel's in-house grotesk) tuned for tight, high-contrast UI. The emotional register is precise, technical, and quiet. Nothing decorative survives unless it carries information.

The brand reads monochromatic at first glance. Chromatic accents exist (link blue, deploy green, error orange, console pink and purple) but they appear in narrow contexts: status indicators, links, code highlighting, illustration strokes. They are not used as decorative fills. The visual personality is closer to a terminal than a marketing site, even on marketing pages.

## Colors

The palette is structured in concentric tiers: a near-black surface system, a light-on-dark text scale, a single white-led primary, and a small chromatic set reserved for semantic states.

- **Surface (#0a0a0a)**: The default canvas. Slightly lifted off pure black to soften OLED bleed and give shadows somewhere to land. This is `--ds-background-100`.
- **Surface dim (#000000)**: Used for deeper insets, modal scrims, and the global `--geist-background`. Pure black is the floor, not the canvas.
- **On-surface (#ededed)**: The dominant text color, mapped to `--accents-7`. It dominates by an order of magnitude (2,304 occurrences in the captured render). True white is reserved for icons and primary CTAs.
- **On-surface-variant (#a1a1a1)**: The "second-tier" gray, used for secondary text and most icons. Pair this with `on-surface` for hierarchy; do not introduce a third gray in the same paragraph.
- **Outline (rgba(255,255,255,0.14))**: The signature hairline. It defines every card edge, every input border, every divider. The 14% opacity is load-bearing: it reads as a border on dark, disappears on light, and never competes with content.
- **Tertiary (#3291ff)**: The link and "info" color, also exposed as `--geist-link-color` and `--geist-console-text-color-blue`. Use only for links, info pills, and focus rings. Never as a decorative fill.
- **Error (#ff3e00)**: Vercel orange. Reserved for destructive actions, deployment failure states, and warning toasts. It is recognizably the Vercel brand color but the system treats it as a semantic signal, not an accent.
- **Success (#00dc82)**: Used for healthy deployments, "online" indicators, and the small green pulse on status pages.

The console chromatic set (`brand-pink`, `brand-purple`, `brand-violet-*`) is registered because the variables are named in the design tokens, but they did not render in the captured page. Treat these as available for code-highlight and onboarding-flow contexts. Verify usage on the live site before relying on the exact values.

## Typography

The system uses **Geist** for all UI and prose, and **Geist Mono** for code, numerics, and any monospace context. No fallback to system sans except as a font-stack safety net. Geist's character is geometric, narrow, and slightly humanist at the terminals (the curl on the lowercase `g`, the open `a`), which keeps long documentation readable without softening the technical register.

Three signatures of Vercel's typography:

- **Aggressively tight tracking on display sizes.** Headlines at 32px and above use letter-spacing values from `-0.96px` to `-2.88px` (roughly `-0.03em` to `-0.06em`). This is the "Geist look": large text reads as a single optical unit rather than a row of letters.
- **OpenType features are deliberately limited.** The render disables `calt` (contextual alternates) while keeping `rlig` (required ligatures). The system applies `ss05` (stylistic set 5) in 34 places for the distinctive single-storey `a` in display contexts. Honor these settings; do not enable additional ligatures or alternates on body copy.
- **Line-height is 1.5 at body sizes, tightening above 24px.** Body 16px uses 24px line-height; body 14px uses 21px; display 48px uses 56px (≈1.17). The shift to tight leading is what makes large numbers (like deploy counts and pricing) read as monolithic blocks.

Pair `body-md` (16/24) with `body-sm` (14/21) for two-tier content density. Pair `label-md` (13/20) with `caption` (9.5/16) for metadata rows. Never mix Geist and Geist Mono within the same line of running prose.

## Layout & Spacing

The system runs on a 4px base unit, with 6px and 8px doing most of the work at the component scale. The captured gap distribution shows 8px (76 uses), 6px (69), 12px (43), 4px (17), 16px (13) as the dominant rhythm.

- **Component internals**: 8px between adjacent controls, 6px between an icon and its label, 4px between a label and a helper text.
- **Card groups**: 16px gap between cards in a grid, 24px padding inside each card, 40px between major sections.
- **Container**: 24px horizontal padding on the page edge below the lg breakpoint; the content column max-width sits well inside the viewport rather than stretching edge-to-edge.

Density is high by design. Vercel's interfaces compress information into tight rows, not generous cards. When in doubt, prefer 8px over 16px and trust the type hierarchy to create the breathing room.

## Elevation & Depth

Depth in this system is created by borders, not shadows. The signature elevation treatment is a three-layer composite that appears 12 times on a single page:

```
box-shadow:
  rgba(255, 255, 255, 0.145) 0px 0px 0px 1px, /* inner light ring */
  rgba(0, 0, 0, 0.16)        0px 1px 2px 0px, /* soft drop */
  rgb(0, 0, 0)               0px 0px 0px 1px; /* outer dark ring */
```

The inner ring reads as a backlit edge. The outer ring grounds the element against the canvas. The drop shadow is intentionally small (1–2px) so the surface looks pressed onto the canvas rather than floating above it.

There are only two levels:

- **Level 1 (Resting):** No shadow. Borders only, using `outline` (rgba(255,255,255,0.14)). This is the default for cards, inputs, and badges.
- **Level 2 (Interactive):** The ring + shadow + ring composite above. Reserved for primary buttons, hover states on cards, and floating elements like popovers and tooltips.

Avoid adding a third elevation level. The system's hierarchy is carried by typography and color contrast, not by stacking shadows.

## Shapes

The radius scale is small and pragmatic. Two values do almost all the work: 6px (the default for buttons and inputs, 54 uses) and 4px (smaller chips and inline elements, 41 uses).

- **Buttons and inputs**: 6px (`rounded.DEFAULT`). The standard control radius.
- **Cards**: 12px (`rounded.lg`) for content cards, 8px (`rounded.md`) for compact list items.
- **Pills**: 100px or 9999px for badges, status chips, and avatar containers.
- **Tabs and top-rounded panels**: 8px 8px 0 0 (top-only) appears 7 times for tabs sitting on a divider.
- **Circles**: 50% for avatars and dot indicators (13 uses).

Geometry stays conservative. There are no playful or asymmetric radii in the system. The largest single radius (other than full pills) is 16px, used only on the outermost containers of feature blocks.

## Components

### Buttons

Three variants cover almost every interaction.

The **primary button** is solid white (`primary`) with near-black text (`on-primary`), 32px tall, 6px radius, and the ring + shadow + ring elevation. It is the single CTA per view. Multiple primary buttons in one viewport is a design error.

The **secondary button** uses `surface-container-highest` (#333) as a fill against the dark canvas, with `on-surface` text. Same height and radius as primary. It carries no elevation; the fill alone defines it.

The **ghost button** has no fill at rest, hover lifts to a 6% white wash. Used for tertiary actions and toolbar controls.

### Cards

Cards sit on the canvas with `surface` or `surface-container` fill and a single hairline `outline` border. No shadow at rest. Hover may add the elevation composite if the card is interactive. Padding is 24px on standard cards, 16px on compact list cards.

### Inputs

Inputs are 32px tall, 6px radius, `surface` fill (not lighter than the canvas), hairline border. Focus state replaces the border with a 1px tertiary-blue ring plus a 3px low-opacity glow. Placeholder text uses `on-surface-variant`.

### Links

Links use `tertiary` (#3291ff) without an underline by default. Underline appears on hover. In running prose, prefer the link color over bold for emphasis on actionable items.

### Code

Inline code uses `surface-container` fill, 4px radius, and `code-sm` (Geist Mono 13/20). Block code uses the same fill at `surface-container-low`, 8px radius, with a 16px internal padding. Mono fonts inherit the same `-0.28px` tracking as their sans counterparts at the same size.

### Navigation

The top nav uses `header-overlay` (semi-transparent #111) so the canvas reads through it on scroll. Nav items are ghost-styled with `on-surface-variant` text, transitioning to `on-surface` when active. The active state is indicated by color only, not by an underline or background fill.

### Status indicators

Deployment status uses `success` (green dot) and `error` (orange dot) at 8px diameter, paired with `label-sm` text. The dot is the indicator; the text reinforces it. Never use the chromatic colors as text fills in body copy.

## Do's and Don'ts

**Do** use `outline` (rgba(255,255,255,0.14)) for every divider, card edge, and input border. The consistency of this hairline is what makes the system feel cohesive across surfaces.

**Do** trust the type scale. Don't introduce intermediate sizes between the defined steps. If 16px feels too small, the answer is 18px (`body-lg`), not 17px.

**Do** keep chromatic colors semantic. Blue is "link or info." Green is "healthy." Orange is "error or warning." Pink and purple appear only in code highlighting and console output.

**Don't** stack shadows. Elevation is binary in this system: hairline or hairline + ring-shadow-ring. A third "deeper" elevation breaks the visual register.

**Don't** introduce a fourth gray in body content. The system has three text grays (#ededed, #a1a1a1, #888888); adding a fourth flattens hierarchy.

**Don't** soften the radii. The 6px default is correct for almost every control. Going larger reads as "consumer app"; going smaller reads as "Bootstrap." The system holds at 6px.

**Don't** use Geist Mono for headings or running text. It is for code, numerics, and tabular data exclusively.