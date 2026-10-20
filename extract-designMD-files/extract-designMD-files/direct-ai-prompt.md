URL = https://375.studio/en
BRAND_NAME = Studio375

You are creating a complete, canonical DESIGN.md for {BRAND_NAME}
at {URL}, following the open-source Google Labs DESIGN.md spec.

ARCHITECTURE — read these references first so the output matches
the canonical format:

- Spec & rules:
  https://github.com/google-labs-code/design.md
- Spec README (token schema, lint rules, CLI):
  https://raw.githubusercontent.com/google-labs-code/design.md/main/README.md
- Reference example to mirror in structure and section ordering:
  https://raw.githubusercontent.com/google-labs-code/design.md/main/examples/atmospheric-glass/DESIGN.md
- Reference token export to model:
  https://raw.githubusercontent.com/google-labs-code/design.md/main/examples/atmospheric-glass/design_tokens.json

Mirror the YAML key structure, section order, and naming
conventions of the atmospheric-glass reference. Use Material 3
semantic naming for colors (surface, surface-container, on-surface,
primary, on-primary, secondary, on-secondary, tertiary, on-tertiary,
outline, error, on-error, success, on-success).

APPROACH — use your full reasoning and browser tools. Read the live
page directly, query elements one at a time, and build a coherent
picture grounded in observed values, semantic context, and (where
useful) the brand's own documentation.

WORKFLOW:

Step 1 — Get oriented.
- Visit {URL}. Read the page semantically. Note the brand category
  (product, agency, docs, e-commerce, fintech, etc.) — it shapes
  which design patterns matter.
- Check https://getdesign.md/<slug>/design-md to see if the brand
  is in the curated catalog. If found, treat it as one signal, not
  ground truth (catalogs are curated interpretations; the live site
  is what users actually see).
- Optionally visit the brand's About / Press / Design System pages
  for context, voice, and intent.

Step 2 — Inventory the design system through targeted queries.
Use your browser tool's JavaScript capability to ask the page
specific, focused questions. One query per call, not a giant
script. Build a picture of:

a) CSS variables defined on :root, if any. Look for brand-meaningful
   names (--brand-*, --color-*, --primary-*, --foreground-*, etc.).

b) Computed styles for the key semantic elements — read each one
   directly:
   - Primary CTA (most prominent button on the hero)
   - Secondary CTA, if present
   - Main h1
   - Body element
   - A representative content section
   - A real link in body or footer
   - The navigation bar
   - A second button family if one exists (toolbar, icon, dropdown)

c) Distinctive components — look for class-name patterns that
   suggest brand-specific UI: custom cursors, overlays, modals,
   sticky elements, focus rings, badges. Inspect each that exists.

d) Type stack — font families, weights actually rendered, OpenType
   feature settings, variable font axes.

e) Motion — transition durations, easing curves, named keyframes,
   view-transition-name on root, animation patterns.

Step 3 — Reason about the design system you observed.
- Decide which colors are REAL brand colors versus framework
  defaults (browser link blue #0000EE, visited #551A8B) or
  third-party widget bleed.
- Decide which font sizes are FIXED tokens versus FLUID
  (clamp-based) responsive sizes. Fractional values almost always
  mean fluid.
- Identify the ACTUAL button families with their own radius /
  height / font scale.
- Note divergence: does the rendered primary CTA match the named
  `--*-foreground` token, or does the team use a different value?
  Named tokens can declare one thing and render another.
- Recognize the type stack and the foundry where you can. Note
  OpenType features and variable font axes.
- Identify distinctive depth/motion patterns: blend-mode overlays,
  noise textures, view-transition-name, paired shadow systems,
  signature easing curves.

Step 4 — Drift check (only if catalog file exists).
Compare catalog values to your observed values. Where they diverge,
prefer the live values and document in a "## Drift Notes" prose
section in the final file.

Step 5 — Write the FIRST-PASS DESIGN.md.
Mirror the canonical Google Labs structure as in the
atmospheric-glass reference example linked above.

YAML front matter:
  - name: {BRAND_NAME}
  - description: a one-line characterization of the brand
  - colors: Material 3 semantic naming (surface, surface-container,
    on-surface, primary, on-primary, secondary, on-secondary,
    tertiary, on-tertiary, outline, error, on-error, success,
    on-success, etc.)
  - typography: named scales each with fontFamily, fontSize,
    fontWeight, lineHeight, letterSpacing where present
  - rounded: sm, md, lg, full
  - spacing: xs through 2xl
  - motion: duration and easing tokens if observed
  - shadows / effects where present

Markdown sections in this order, matching the atmospheric-glass
example:
  ## Brand & Style
  ## Colors
  ## Typography
  ## Layout & Spacing
  ## Elevation & Depth
  ## Motion (if motion was observed)
  ## Shapes
  ## Components
  ## Do's and Don'ts
  ## Agent Prompt Guide
  ## Drift Notes (only if drift was found in Step 4)

Hard rules:
  - Use real values from the page. Don't invent.
  - For low-frequency values (observed once or twice), add the
    comment `# low-confidence — verify on live site` AND do NOT
    assign them to primary, secondary, or tertiary roles yet.
    The verification step in Step 6 will tell you which to promote.
  - For each color you assign to a semantic role, add a one-line
    comment citing the evidence (e.g. `# primary because rendered
    on hero CTA at <value>, verified live`).
  - Mark uncertain values with: `# uncertain — verify on live site`.
  - If you observed transitions, keyframes, view-transition-name,
    or named animations, include them in a `motion:` YAML block
    AND a `## Motion` prose section. Don't skip motion.

Step 6 — VERIFY against the live site.
Go back to the live page and re-inspect the eight elements from
Step 2b. Compare each one's COMPUTED style values to your DESIGN.md
draft. Where they disagree, the live site wins.

For each of the eight:
  - If the live value differs from your draft, update the YAML
    value to the live value and update the evidence comment to
    cite "live render at <viewport>".
  - If a low-confidence color you marked is actually used as a
    specific branded role on the live site (cursor color, overlay
    variant, focus ring, status indicator), promote it to a named
    token rather than deleting it.
  - For typography: if the rendered h1 doesn't match ANY token in
    your captured size scale, the site uses fluid typography.
    Annotate the display tokens with `# fluid — verified at
    <viewport>` and note the responsive behavior.

Step 7 — Validate.
Save as DESIGN.md. Run:
  npx @google/design.md lint DESIGN.md
  npx @google/design.md export --format tailwind DESIGN.md > tailwind.theme.json

Confirm:
  - Lint exits 0 (warnings are OK; errors must be fixed)
  - Tailwind export populates with real tokens, not empty objects

Step 8 — Report back.
- Path to DESIGN.md
- Lint summary (errors / warnings / infos)
- Path to tailwind.theme.json
- Verification findings: which of the eight inspections you ran,
  whether each live value matched your draft, and what you changed.
- Three sentences on the brand:
  a) The real brand axis (primary, surface, type) — using the
     live-verified values.
  b) The most distinctive visual element of the system.
  c) Whether the brand drifted from the catalog (only if a catalog
     reference existed).