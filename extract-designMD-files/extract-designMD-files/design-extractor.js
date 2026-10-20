// =====================================================================
// DESIGN.md extractor — captures a brand's full design system from any
// live website. Paste in the DevTools console and hit Enter.
// =====================================================================

(() => {
  // -------- Constants --------

  const BROWSER_DEFAULTS = {
    'rgb(0, 0, 238)': 'browser default unvisited link',
    'rgb(85, 26, 139)': 'browser default visited link',
  };

  const NULL_COLORS = new Set([
    'rgba(0, 0, 0, 0)', 'transparent', 'currentcolor',
    'none', 'auto', 'normal', 'inherit'
  ]);

  const COLOR_VALUE_RE = /^(#|rgb|hsl|oklch|oklab|lab|color\()/;
  const BRAND_VAR_RE = /(brand|color|theme|primary|secondary|background|foreground|surface|text|accent|border|fg|bg|btn|cta|nav|panel|chart|sidebar|popover|card|muted|destructive|ring|input|outline)/i;
  const ELEMENT_WALK_LIMIT = 10000;

  // -------- Helpers --------

  const count = (obj, value) => {
    if (value && !NULL_COLORS.has(value)) obj[value] = (obj[value] || 0) + 1;
  };
  const top = (obj, n = 8) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n);
  const colorSpaceOf = (c) => {
    if (!c) return null;
    if (c.startsWith('#')) return 'hex';
    if (c.startsWith('rgb')) return 'rgb';
    if (c.startsWith('hsl')) return 'hsl';
    if (c.startsWith('oklch')) return 'oklch';
    if (c.startsWith('oklab')) return 'oklab';
    if (c.startsWith('lab')) return 'lab';
    if (c.startsWith('color(display-p3')) return 'display-p3';
    return null;
  };
  const flagBrowserDefaults = (entries) => entries.map(([color, n]) => {
    const flag = BROWSER_DEFAULTS[color];
    return flag ? { color, count: n, flagged: flag } : { color, count: n };
  });

  // -------- 1) CSS variables & cross-origin tracking --------

  const cssVars = {};
  let crossOriginFailures = 0;
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules || []) {
        if (!rule.style) continue;
        for (const prop of rule.style) {
          if (prop.startsWith('--')) {
            cssVars[prop] = getComputedStyle(document.documentElement)
              .getPropertyValue(prop).trim();
          }
        }
      }
    } catch (e) { crossOriginFailures++; }
  }
  const colorVars = Object.fromEntries(
    Object.entries(cssVars).filter(([, v]) => COLOR_VALUE_RE.test(v))
  );
  const brandVars = Object.fromEntries(
    Object.entries(colorVars).filter(([k]) => BRAND_VAR_RE.test(k))
  );

  // -------- 2) @keyframes definitions --------

  const keyframeNames = [];
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules || []) {
        if (rule instanceof CSSKeyframesRule) keyframeNames.push(rule.name);
      }
    } catch (e) {}
  }

  // -------- 3) Walk every element --------

  const textColors = {}, bgColors = {}, borderColors = {};
  const textDecorationColors = {}, outlineColors = {};
  const svgFills = {}, svgStrokes = {};
  const fontFamilies = {}, fontWeights = {}, fontFeatures = {}, fontVariations = {};
  const letterSpacings = {}, lineHeights = {};
  const fontSizes = new Set();
  const radii = {}, shadows = {}, gaps = {};
  const transitions = {}, animations = {};
  const backdropFilters = {}, blendModes = {};
  const clipPaths = {}, viewTransitionNames = {};
  const linearGradients = {}, radialGradients = {}, conicGradients = {};
  const colorSpaces = new Set();
  let webComponentCount = 0, svgElementCount = 0, bgImageUrlCount = 0;
  let elementsWalked = 0;
  const modernCssUse = { lightDark: 0, colorMix: 0, relativeColor: 0 };

  for (const el of document.querySelectorAll('*')) {
    if (elementsWalked++ > ELEMENT_WALK_LIMIT) break;
    const tag = el.tagName.toLowerCase();
    if (tag.includes('-')) webComponentCount++;
    if (tag === 'svg') svgElementCount++;
    const cs = getComputedStyle(el);

    for (const c of [cs.color, cs.backgroundColor, cs.borderTopColor,
                     cs.textDecorationColor, cs.fill, cs.stroke, cs.outlineColor]) {
      if (!c) continue;
      const sp = colorSpaceOf(c);
      if (sp) colorSpaces.add(sp);
      if (c.includes('light-dark(')) modernCssUse.lightDark++;
      if (c.includes('color-mix('))  modernCssUse.colorMix++;
      if (c.includes(' from '))      modernCssUse.relativeColor++;
    }

    count(textColors, cs.color);
    count(bgColors, cs.backgroundColor);
    if (cs.borderTopWidth !== '0px') count(borderColors, cs.borderTopColor);
    if (cs.textDecorationLine && cs.textDecorationLine !== 'none')
      count(textDecorationColors, cs.textDecorationColor);
    if (cs.outlineStyle && cs.outlineStyle !== 'none')
      count(outlineColors, cs.outlineColor);
    if (cs.fill !== 'rgb(0, 0, 0)') count(svgFills, cs.fill);
    count(svgStrokes, cs.stroke);

    count(fontFamilies, cs.fontFamily);
    count(fontWeights, cs.fontWeight);
    fontSizes.add(cs.fontSize);
    count(letterSpacings, cs.letterSpacing);
    count(lineHeights, cs.lineHeight);
    count(fontFeatures, cs.fontFeatureSettings);
    count(fontVariations, cs.fontVariationSettings);

    if (cs.borderRadius !== '0px') count(radii, cs.borderRadius);
    count(shadows, cs.boxShadow);
    if (cs.gap !== '0px') count(gaps, cs.gap);

    if (cs.transitionDuration !== '0s') {
      count(transitions, `${cs.transitionDuration} ${cs.transitionTimingFunction}`);
    }
    count(animations, cs.animationName);

    count(backdropFilters, cs.backdropFilter);
    count(blendModes, cs.mixBlendMode);
    if (cs.clipPath && cs.clipPath !== 'none') {
      count(clipPaths, cs.clipPath.slice(0, 80));
    }
    count(viewTransitionNames, cs.viewTransitionName);

    const bg = cs.backgroundImage;
    if (bg && bg !== 'none') {
      if (bg.includes('url(')) bgImageUrlCount++;
      if (bg.includes('linear-gradient')) count(linearGradients, bg.slice(0, 100));
      if (bg.includes('radial-gradient')) count(radialGradients, bg.slice(0, 100));
      if (bg.includes('conic-gradient'))  count(conicGradients, bg.slice(0, 100));
    }
  }

  // -------- 4) Print the structured brief --------

  console.log(JSON.stringify({
    cssVarTotal: Object.keys(cssVars).length,
    colorVarTotal: Object.keys(colorVars).length,
    brandPrefixedVarCount: Object.keys(brandVars).length,
    brandPrefixedVars: Object.fromEntries(Object.entries(brandVars).slice(0, 25)),
    crossOriginFailures: crossOriginFailures > 0
      ? `${crossOriginFailures} stylesheet(s) inaccessible — some variables may be missing`
      : 0,
    webComponentNote: webComponentCount > 0
      ? `${webComponentCount} web components (content in Shadow DOM may be missed)`
      : null,
    elementsWalked,
    colorSpacesDetected: [...colorSpaces],
    modernCssColorFunctions: modernCssUse,
    topTextColors:            flagBrowserDefaults(top(textColors, 8)),
    topBackgroundColors:      flagBrowserDefaults(top(bgColors, 8)),
    topBorderColors:          top(borderColors, 5),
    topTextDecorationColors:  flagBrowserDefaults(top(textDecorationColors, 5)),
    topOutlineColors:         top(outlineColors, 4),
    topSvgFills:              top(svgFills, 6),
    topSvgStrokes:            top(svgStrokes, 4),
    svgElementCount,
    topFontFamilies: top(fontFamilies, 5),
    fontSizesScale: [...fontSizes].sort((a, b) => parseFloat(a) - parseFloat(b)),
    fontWeights:    Object.keys(fontWeights).sort(),
    topLetterSpacings: top(letterSpacings, 6),
    topLineHeights:    top(lineHeights, 6),
    topFontFeatures:   top(fontFeatures, 5),
    topFontVariations: top(fontVariations, 5),
    topRadii:   top(radii, 8),
    topShadows: top(shadows, 4),
    topGaps:    top(gaps, 5),
    topTransitions:        top(transitions, 8),
    topAnimations:         top(animations, 6),
    keyframesDefinedCount: keyframeNames.length,
    sampleKeyframes:       keyframeNames.slice(0, 8),
    topBackdropFilters:  top(backdropFilters, 4),
    topBlendModes:       top(blendModes, 4),
    clipPathCount:       Object.keys(clipPaths).length,
    topViewTransitions:  top(viewTransitionNames, 4),
    bgImageUrlCount,
    linearGradientCount: Object.keys(linearGradients).length,
    radialGradientCount: Object.keys(radialGradients).length,
    conicGradientCount:  Object.keys(conicGradients).length,
    topGradients:        top({ ...linearGradients, ...radialGradients, ...conicGradients }, 4),
  }, null, 2));
})();