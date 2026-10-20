---
name: Studio375
description: A Vicenza creative agency in monochrome black — light serif display, a single electric-magenta accent carried by a blend-mode cursor.
colors:
  surface: "#000000"               # surface because the fixed full-viewport sceneWrapper paints rgb(0,0,0), verified live
  surface-container: "#000000"     # flat black system — no raised container tint observed; equals surface, verified live
  on-surface: "#ffffff"            # on-surface because all headings and body copy render rgb(255,255,255), verified live
  on-surface-variant: "#808080"    # on-surface-variant because muted/secondary paragraphs render rgb(128,128,128), verified live
  primary: "#cc0597"               # primary because rendered on the custom cursor and the magenta page-transition overlay at rgb(204,5,151), verified live
  on-primary: "#ffffff"            # on-primary because the "DISCOVER" label sits white on the magenta cursor disc, verified live
  secondary: "#ffffff"             # secondary because white is the outline-driven interaction color on pill links + category tags (2px borders), verified live
  on-secondary: "#000000"          # on-secondary pairs black on a white fill (inverted pill), verified live
  outline: "#ffffff"               # outline because pill links and category tags use a 2px rgb(255,255,255) border, verified live
typography:
  display:
    fontFamily: hatton
    fontSize: 75.6px               # fluid — clamp()-based; measured at 1512px viewport
    fontWeight: "200"
    lineHeight: 73.3px             # fluid — ~0.97 ratio, measured at 1512px viewport
  display-italic:
    fontFamily: hatton             # italic emphasis words ("creative", "meet") inside the hero display
    fontSize: 75.6px               # fluid — clamp()-based; measured at 1512px viewport
    fontWeight: "200"
    lineHeight: 73.3px             # fluid — measured at 1512px viewport
  heading-xl:
    fontFamily: hatton
    fontSize: 78.6px               # fluid — section headings + project titles; measured at 1512px viewport
    fontWeight: "200"
    lineHeight: 78.6px             # fluid — measured at 1512px viewport
  heading-lg:
    fontFamily: hatton
    fontSize: 54.4px               # fluid — the "We are Studio375" h1; measured at 1512px viewport
    fontWeight: "200"
    lineHeight: 54.4px             # fluid — measured at 1512px viewport
  heading-serif-link:
    fontFamily: hatton
    fontSize: 70px                 # serif mega-menu / footer navigation links
    fontWeight: "400"
    lineHeight: 75px
  display-sans:
    fontFamily: neue
    fontSize: 99.8px               # fluid — oversized sans section word ("Featured"); measured at 1512px viewport
    fontWeight: "400"
    lineHeight: 99.8px             # fluid — measured at 1512px viewport
  body-lg:
    fontFamily: neue
    fontSize: 24.2px               # fluid — lead/intro paragraph; measured at 1512px viewport
    fontWeight: "400"
    lineHeight: 34px               # fluid — measured at 1512px viewport
  body-md:
    fontFamily: neue
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 29px
  body-base:
    fontFamily: neue
    fontSize: 16px
    fontWeight: "500"
    lineHeight: 18.4px
  label-lg:
    fontFamily: neue
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 20px               # rendered uppercase via text-transform — e.g. "VIEW"
  label-tag:
    fontFamily: neue
    fontSize: 15px                 # category tags + pill links; rendered uppercase, verified live
    fontWeight: "400"
    lineHeight: 20px
  label-sm:
    fontFamily: neue
    fontSize: 13px                 # small meta labels e.g. "BASED IN ITALY", "IT-EN"
    fontWeight: "500"
    lineHeight: 18px               # rendered uppercase via text-transform
rounded:
  sm: 20px                         # category tags — most frequent radius (18 instances), verified live
  md: 24px
  lg: 29px                         # pill links ("ABOUT", "MEET THE TEAM"), verified live
  full: 9999px                     # the 120px circular cursor disc (rendered as border-radius 50%)
spacing:
  xs: 4px                          # pill-link vertical padding
  sm: 8px                          # category-tag horizontal padding
  md: 30px
  lg: 50px                         # dominant container side padding (12 instances), verified live
  xl: 100px
  2xl: 150px
motion:
  duration-fast: 0.18s             # observed transition duration
  duration-base: 0.3s              # observed transition duration
  duration-slow: 0.33s             # most frequent transition duration, verified live
  ease-signature: cubic-bezier(0.2, 0, 0, 1)   # signature easing curve on interactive elements
  ease-inout: ease-in-out
effects:
  noise-overlay: noiseAnimation    # animated film-grain keyframe layered over the canvas
  cursor-blend: difference         # mix-blend-mode on the magenta cursor disc
  view-transition: root            # view-transition-name on :root — page changes use the View Transitions API
components:
  page-canvas:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  cursor-disc:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-base}"
    rounded: "{rounded.full}"
    size: 120px
  pill-link:
    backgroundColor: transparent          # outline-only — 2px solid {colors.outline} border, verified live
    textColor: "{colors.secondary}"        # white text; secondary is the outline/interaction color
    typography: "{typography.label-tag}"   # neue, renders 20px weight 400 uppercase live — label-tag size matches the tag family
    rounded: "{rounded.lg}"
    padding: 4px 7px
    height: 32px
  category-tag:
    backgroundColor: transparent          # outline-only — 2px solid {colors.outline} border, verified live
    textColor: "{colors.secondary}"        # white text; secondary is the outline/interaction color
    typography: "{typography.label-tag}"
    rounded: "{rounded.sm}"
    padding: 0 8px
    height: 30px
  nav-link:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  caption:
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-md}"
  section-block:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    padding: 50px
---

## Brand & Style

Studio375 is the portfolio site of a communications, graphic design, and web agency based in Vicenza, Italy, working primarily with furniture, food, and fashion brands. The site is a showcase of the studio's own craft, so the design system reads as a curated editorial object rather than a product UI.

The aesthetic is **monochrome editorial minimalism with one electric jolt**. A pure-black canvas holds light-weight serif display type and a quiet geometric sans, organized with broadsheet-style restraint and generous negative space. The single departure from austerity is an electric magenta — and it appears almost exclusively through motion: a circular cursor that follows the pointer and a magenta wipe that covers the screen between pages. The emotional register is confident, refined, and a little theatrical; the studio is demonstrating taste, not selling a feature list.

## Colors

The palette is deliberately binary — black canvas, white ink — with magenta reserved as a precision instrument.

- **Surface (#000000):** True black. Painted by a fixed, full-viewport scene layer; the system never lightens it for cards or containers, so depth is created by type and motion rather than tonal steps.
- **On-surface (#FFFFFF):** Pure white for every heading, link, and primary paragraph.
- **On-surface-variant (#808080):** A neutral mid-grey for secondary copy and metadata — the only step between white and black.
- **Primary (#CC0597):** Electric magenta. This is the entire brand accent and it is used sparingly and kinetically — the blend-mode cursor disc and the full-screen page-transition overlay. It is rarely a static fill.
- **Secondary (#FFFFFF):** White also functions as the interaction color, expressed as 2px outlines on pill links and category tags rather than as fills.
- **Outline (#FFFFFF):** Hairline-to-2px white borders define every pill and tag.

No tertiary, error, or success colors were observed — the system has no semantic status palette by design.

## Typography

Two typefaces carry the whole system, both from the PangramPangram family lineage: **hatton**, a high-contrast display serif used at light weight, and **neue**, a neutral geometric sans.

- **hatton** appears only large and only light (weight 200) — hero display, section headings, and project titles. Its italic is used as an in-line emphasis device, italicizing single words inside an otherwise upright serif line ("the *creative* studio you've been eager to *meet*").
- **neue** handles everything functional: navigation, body copy, lead paragraphs, uppercase labels, and one oversized sans word used as a graphic ("Featured"). Weights are 400 and 500.
- Display and heading sizes are **fluid** — sizes resolve to fractional pixel values (75.6px, 78.6px, 54.4px, 99.8px) characteristic of `clamp()`-based responsive type. The values in the token block are measured at a 1512px viewport and scale down on smaller screens.
- No OpenType feature settings or variable-font axes were observed; weight is selected via discrete named cuts.

## Layout & Spacing

The layout is a wide, calm editorial canvas. Content sits within roughly **50px** side padding on desktop — the dominant container inset — opening up to 100–150px insets for hero and feature passages.

- Negative space is the primary compositional tool; sections are separated by large empty intervals rather than rules or boxes.
- Pills and tags use tight internal padding (4px vertical, 7–8px horizontal) so they read as compact captions, not buttons.
- There is no visible grid scaffolding; alignment is asymmetric and typographic, with display lines often spanning most of the viewport width.

## Elevation & Depth

There is no conventional elevation. The system is flat black with **zero box-shadows** and no tonal surface stepping.

Depth is instead created by three non-tonal devices: an animated film-grain **noise overlay** (`noiseAnimation` keyframe) that gives the black canvas texture and life; the **mix-blend-mode: difference** cursor, which inverts whatever it passes over and so appears to float above the content plane; and the magenta page-transition overlay, which momentarily becomes the topmost layer. Hierarchy is a function of type scale and motion, not stacked shadows.

## Motion

Motion is central to the brand, not decorative trim.

- **The cursor.** A 120px magenta disc tracks the pointer, rendered with `mix-blend-mode: difference` and scaled down to ~0.2 at rest so it reads as a small dot that can expand on interactive targets.
- **Page transitions.** `:root` carries a `view-transition-name`, and a magenta overlay element wipes the full viewport between routes — the studio's signature navigation gesture.
- **Grain.** A continuously animating `noiseAnimation` keyframe keeps the black surface from feeling inert.
- **Timing.** Transitions cluster at **0.33s** (most common), with 0.3s and 0.18s for quicker states. The signature easing curve is **cubic-bezier(0.2, 0, 0, 1)** — a fast-out, long-settle ease — alongside plain `ease-in-out`.

## Shapes

The shape language is **soft-rectangular pills**, not sharp corners and not full circles (except the cursor).

- Category tags use a 20px radius — the most frequent radius on the page.
- Pill links use a 29px radius, effectively fully-rounded at their 32px height.
- The cursor disc is the only true circle (`border-radius: 50%`).
- Borders are consistently 2px and white; there is no use of drop shadows to define shape edges.

## Components

### Cursor disc

The defining component. A 120px circle filled with primary magenta, white "DISCOVER"-style label, blended via `difference` against the page. It is the brand's logo-in-motion and should never be replaced by the OS cursor on desktop.

### Pill link

Outline-only interactive element — transparent fill, 2px solid white border, white uppercase text, 29px radius, 32px tall, 4px/7px internal padding. Used for in-content navigation such as "ABOUT" and "MEET THE TEAM". Verified against the live site: the hover affordance is **not** a background-fill invert — each glyph is duplicated and the pair slides to swap on hover (a per-letter animation), so the pill keeps its transparent fill and white outline throughout. The `on-secondary` token (black) is retained only to document the correct pairing if a white fill is ever introduced.

### Category tag

Visually a smaller, tighter sibling of the pill link — transparent fill, 2px solid white border, 20px radius, 30px tall, 0px/8px padding — used to label project capabilities ("E-COMMERCE", "SEO", "WEBSITE"). Non-interactive; renders `neue` at ~15px weight 400 uppercase.

### Navigation link

Plain white `neue` text at 20px / weight 500, no underline, no background. Hierarchy among nav items comes from grouping and position, not styling.

### Caption

Mid-grey (`on-surface-variant`) `neue` text for metadata and secondary descriptions — the only consistently non-white text in the system.

## Do's and Don'ts

**Do** keep the canvas pure black and let white type and empty space carry the composition.

**Do** treat magenta as a kinetic accent — cursor and transitions — not as a static fill or button color.

**Do** pair light-weight `hatton` serif for display with `neue` sans for everything functional, and use italic `hatton` to emphasize single words inline.

**Do** preserve the custom cursor, the grain overlay, and the View-Transitions page wipe — together they are the brand.

**Don't** introduce drop shadows, tonal grey surface steps, or card elevation; depth here is blend-mode and motion only.

**Don't** add additional accent hues — the system is intentionally one-accent.

**Don't** set `hatton` at bold weights or small sizes; it is a light, large-format display face only.

**Don't** square off the pills and tags or remove their 2px white outline.

## Agent Prompt Guide

When generating UI for Studio375, instruct the agent: "Pure black (`#000000`) canvas, white (`#FFFFFF`) type, one accent — electric magenta `#CC0597` — used only for the cursor and page transitions. Display type is light-weight serif (`hatton`, weight 200) at fluid `clamp()` sizes; body and UI type is geometric sans (`neue`, weights 400–500). Emphasize single words with serif italic. Interactive elements are outline-only pills with 2px white borders and 20–29px radii — never filled buttons, never drop shadows. Generous 50px+ side padding and large empty intervals between sections. Motion matters: 0.33s transitions on `cubic-bezier(0.2, 0, 0, 1)`, an animated film-grain overlay, and a 120px magenta `mix-blend-mode: difference` cursor disc. Keep it austere, editorial, and confident."