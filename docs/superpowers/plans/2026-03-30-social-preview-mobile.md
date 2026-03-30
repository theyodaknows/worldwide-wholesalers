# Plan: Social Preview Images + Mobile Responsiveness Improvements

**Date:** 2026-03-30
**Status:** Draft — awaiting approval
**Project:** Worldwide Wholesalers (static HTML site)

---

## Goal

Add Open Graph / Twitter Card social preview meta tags with a programmatically generated branded OG image, and fix five specific mobile responsiveness issues in the existing CSS.

## Architecture

This is a static HTML/CSS site with no build tools. Changes touch three files:

| File | Change type |
|------|------------|
| `index.html` | Add OG + Twitter meta tags to `<head>` |
| `styles.css` | Add/modify rules inside existing `@media` breakpoints |
| `scripts/generate-og.js` (new) | One-time Node.js script to produce `public/og-image.png` |

No new dependencies. No npm. The OG generation script uses only Node.js built-in modules (`zlib`, `fs`, `path`).

## Tech Stack

- HTML5, CSS3 (custom properties already in use)
- Vanilla JavaScript (script.js — unchanged)
- Node.js (>=14) for one-time PNG generation

## Existing Breakpoints in `styles.css`

| Breakpoint | Line | Purpose |
|-----------|------|---------|
| `1024px` | L674 | Tablet |
| `768px` | L686 | Mobile large |
| `480px` | L771 | Mobile small |

All mobile CSS changes will be inserted into these existing `@media` blocks (or immediately after them where noted).

---

## Tasks

### Task 1: Add OG and Twitter Card meta tags to `index.html`

**Depends on:** None
**Estimated time:** 2 minutes
**Files:** `index.html`

Insert the following meta tags into `<head>`, after the existing `<meta name="description">` tag (line 6) and before `<title>` (line 7):

```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Worldwide Wholesalers" />
<meta property="og:title" content="Worldwide Wholesalers | Global Women & Children Wholesale" />
<meta property="og:description" content="Premium beauty products, women's fashion, and children's clothing — available in bulk for retailers and boutiques worldwide." />
<meta property="og:image" content="https://worldwidewholesalers.store/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://worldwidewholesalers.store/" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Worldwide Wholesalers | Global Women & Children Wholesale" />
<meta name="twitter:description" content="Premium beauty products, women's fashion, and children's clothing — available in bulk for retailers and boutiques worldwide." />
<meta name="twitter:image" content="https://worldwidewholesalers.store/og-image.png" />
```

**Validation:** Open `index.html` and confirm the meta tags appear in `<head>`. Optionally paste into https://metatags.io to preview.

---

### Task 2: Create `scripts/generate-og.js` — raw PNG generator

**Depends on:** None
**Estimated time:** 5 minutes (this is the most complex task)
**Files:** `scripts/generate-og.js` (new), outputs `public/og-image.png`

**Approach:** Write a raw PNG file using only Node.js built-in modules. The image will be a simple branded design — no text rendering (since that requires canvas/ImageMagick). Instead, produce a clean geometric design:

- 1200x630 canvas
- `#0D0D0D` background fill
- `#3DB34A` green accent elements: a horizontal bar/stripe across the lower portion, and a vertical accent line on the left
- This creates a recognizable branded preview even without rendered text

**PNG construction steps in the script:**

1. Create raw pixel data (1200 x 630 x 3 bytes for RGB, plus 1 filter byte per row)
2. Paint the background `#0D0D0D`
3. Paint a horizontal green (`#3DB34A`) stripe at roughly y=480-510 spanning the full width
4. Paint a vertical green accent bar at x=0-8 spanning the full height
5. Paint a small green rectangle in the center area (acts as a logo placeholder block)
6. Deflate the raw data with `zlib.deflateSync`
7. Write the PNG signature, IHDR, IDAT, and IEND chunks with correct CRC32 checksums
8. Output to `public/og-image.png`

**File structure:**

```javascript
// scripts/generate-og.js
// Generates public/og-image.png (1200x630) using only Node.js built-ins
// Run: node scripts/generate-og.js

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const WIDTH = 1200;
const HEIGHT = 630;

// ... PNG construction code ...
// See approach above for pixel painting logic
// CRC32 implementation needed for PNG chunks
```

**Run command:**
```bash
node scripts/generate-og.js
```

**Validation:**
```bash
# Confirm file exists and is a valid PNG
file public/og-image.png
# Should output: PNG image data, 1200 x 630, ...

# Check file size is reasonable (should be small, ~5-20KB for simple geometry)
ls -la public/og-image.png
```

---

### Task 3: Hero overlay opacity on mobile (`< 768px`)

**Depends on:** None
**Estimated time:** 2 minutes
**Files:** `styles.css`

**Problem:** The `.hero-overlay` gradient (`rgba(0,0,0,0.88)`) covers too much of the hero image on mobile.

**Fix:** Inside the existing `@media (max-width: 768px)` block (starting at line 686), add:

```css
.hero-overlay {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.4) 100%);
}
```

This changes the gradient direction to vertical on mobile (top-heavy so text is readable, bottom is more transparent to show the image) and reduces peak opacity from 0.88 to 0.7.

**Validation:** Open in browser at mobile width. The hero background image should be more visible, especially in the lower half. Text must remain readable.

---

### Task 4: Category tabs horizontal scroll on small screens (`< 480px`)

**Depends on:** None
**Estimated time:** 2 minutes
**Files:** `styles.css`

**Problem:** The three `.cat-tab` buttons overflow horizontally on very small screens.

**Fix:** Inside the existing `@media (max-width: 480px)` block (starting at line 771), add:

```css
.cat-tabs {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}
.cat-tabs::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
.cat-tab {
  flex-shrink: 0;
}
```

**Validation:** View at 375px width. Tabs should be horizontally scrollable without breaking layout. No visible scrollbar.

---

### Task 5: Nav logo max-width on mobile

**Depends on:** None
**Estimated time:** 1 minute
**Files:** `styles.css`

**Problem:** The nav logo can be too large on very small screens.

**Fix:** Inside the existing `@media (max-width: 768px)` block (line 686), add:

```css
.nav-logo img {
  max-width: 140px;
}
```

**Validation:** View at 375px width. Logo should not exceed 140px in width.

---

### Task 6: Contact title font size on small screens (`< 480px`)

**Depends on:** None
**Estimated time:** 1 minute
**Files:** `styles.css`

**Problem:** `.contact-title` at 30px is too large on small screens.

**Fix:** Inside the existing `@media (max-width: 480px)` block (line 771), add:

```css
.contact-title {
  font-size: 22px;
}
```

**Validation:** View at 375px width. The "Let's Talk Business" heading should be 22px and not cause horizontal overflow.

---

### Task 7: Body bottom padding for floating WhatsApp button

**Depends on:** None
**Estimated time:** 1 minute
**Files:** `styles.css`

**Problem:** The fixed-position `.wa-float` button (bottom-right) overlaps footer content on mobile.

**Fix:** Inside the existing `@media (max-width: 768px)` block (line 686), add:

```css
body {
  padding-bottom: 80px;
}
```

**Validation:** Scroll to bottom of page on mobile. Footer text/links should not be hidden behind the floating WhatsApp button.

---

## Dependency Graph

All seven tasks are **fully independent** and can be executed in parallel.

```
Task 1 (meta tags)          ──┐
Task 2 (generate-og.js)     ──┤
Task 3 (hero overlay)       ──┤── All independent, merge when done
Task 4 (tabs scroll)        ──┤
Task 5 (nav logo)           ──┤
Task 6 (contact title)      ──┤
Task 7 (body padding)       ──┘
```

## Post-Implementation Checklist

After all tasks complete:

1. Run `node scripts/generate-og.js` and confirm `public/og-image.png` exists and is a valid 1200x630 PNG
2. Open `index.html` in a browser at desktop width — no visual regressions
3. Resize to 768px — verify hero overlay, nav logo, body padding
4. Resize to 480px — verify tab scrolling, contact title size
5. Resize to 375px — verify nothing overflows
6. Inspect `<head>` in DevTools — confirm all OG and Twitter meta tags present
7. Validate HTML with https://validator.w3.org (paste source)
8. Check accessibility: keyboard-navigate tabs at 480px (still works with horizontal scroll)

## Files Changed Summary

| File | Action | Tasks |
|------|--------|-------|
| `index.html` | Modify (add meta tags to `<head>`) | 1 |
| `styles.css` | Modify (add rules in existing `@media` blocks) | 3, 4, 5, 6, 7 |
| `scripts/generate-og.js` | Create new | 2 |
| `public/og-image.png` | Generated output | 2 |
