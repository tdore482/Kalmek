URL = https://vercel.com
BRAND_NAME = Vercel

Here are computed styles I extracted from {URL} via the browser
console. The brand name is {BRAND_NAME}.

Build a DESIGN.md from this following the canonical Google Labs
spec at https://github.com/google-labs-code/design.md and mirroring
the structure of the reference example at
https://raw.githubusercontent.com/google-labs-code/design.md/main/examples/atmospheric-glass/DESIGN.md

Use the frequency-weighted top colors to assign semantic roles. The
most-used non-text color is typically the primary surface, the
most-used text color is on-surface, the highest-frequency chromatic
color is the brand primary, etc.

If I've provided named CSS variables (--geist-*, --color-*, --brand-*,
--theme-*, --ds-*, etc.), treat those names as the source of truth
for the YAML — they reflect the team's intentional design system,
not just rendered output.

Capture the full token set generously. A DESIGN.md is a registry of
available tokens, not just what's used on this page. Don't drop colors
just because you can't find a prose rule for them, and don't invent
fake rules to justify referencing them.

Hard rules:
- For any color appearing fewer than 3 times in the captured data,
  add the comment "# low-confidence — verify on live site" AND do
  NOT assign it to primary, secondary, or tertiary roles. Low-frequency
  values are often framework defaults (e.g., shared library colors,
  third-party widget bleed) rather than the brand's intentional palette.
- For each color you assign a semantic role to, add a one-line comment
  citing the evidence — e.g., "# primary because frequency 154 in
  button backgrounds." If you can't cite the evidence, leave the role
  undefined rather than guess.

JSON:
[paste JSON here]