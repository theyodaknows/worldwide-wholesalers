# Worldwide Wholesalers Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pure HTML/CSS/JS single-page wholesale showcase site for worldwidewholesalers.store — dark + green aesthetic, HD product imagery, expandable category tabs, no shopping features, WhatsApp CTA.

**Architecture:** Single `index.html` page with `styles.css` and `script.js`. No build tools, no dependencies. Category sections switch via JS tab toggling (`display:grid` / `display:none`). All images pulled from Unsplash CDN URLs embedded directly in `<img>` tags. Floating WhatsApp button always visible.

**Tech Stack:** HTML5, CSS3 (custom properties, CSS Grid, Flexbox, keyframe animations), vanilla ES6 JS. Zero npm, zero frameworks.

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Full page structure — nav, hero, stats, categories, why-us, CTA band, footer, floating WA button |
| `styles.css` | All visual styles — CSS custom properties (brand tokens), layout, components, hover states, animations, responsive breakpoints |
| `script.js` | Category tab switching, mobile hamburger nav toggle, smooth scroll anchor behavior |
| `public/logo_2.png` | Horizontal wordmark logo (already exists) |
| `public/icon.png` | Price tag icon (already exists, used as favicon fallback) |
| `public/favicon.ico` | Favicon (already exists) |

---

## Task 1: Project Scaffold + CSS Custom Properties

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`

- [ ] **Step 1: Create `index.html` with full semantic skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Worldwide Wholesalers — Global wholesale brand for women's and children's goods. Beauty products, women's fashion, and children's clothing available in bulk." />
  <title>Worldwide Wholesalers | Global Women & Children Wholesale</title>
  <link rel="icon" href="public/favicon.ico" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <nav class="nav" id="nav" role="navigation" aria-label="Main navigation">
    <!-- Task 2 -->
  </nav>

  <main>
    <section class="hero" aria-label="Hero banner">
      <!-- Task 3 -->
    </section>

    <section class="stats" aria-label="Brand statistics">
      <!-- Task 4 -->
    </section>

    <section class="collections" id="collections" aria-label="Product collections">
      <!-- Task 5 -->
    </section>

    <section class="why-us" aria-label="Why choose us">
      <!-- Task 6 -->
    </section>

    <section class="contact-band" id="contact" aria-label="Contact us">
      <!-- Task 7 -->
    </section>
  </main>

  <footer class="footer" role="contentinfo">
    <!-- Task 8 -->
  </footer>

  <a
    href="https://wa.me/15551234567"
    class="wa-float"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
  >
    <!-- Task 8 -->
  </a>
  <div class="wa-float-pulse" aria-hidden="true"></div>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `styles.css` with CSS custom properties and base reset**

```css
/* =====================
   CSS CUSTOM PROPERTIES
   ===================== */
:root {
  --green: #3db34a;
  --green-dark: #2a8a35;
  --green-glow: rgba(61, 179, 74, 0.15);
  --green-border: rgba(61, 179, 74, 0.25);
  --wa-green: #25d366;
  --bg: #0d0d0d;
  --surface: #111111;
  --surface-2: #1a1a1a;
  --border: #1e1e1e;
  --border-2: #222222;
  --text: #ffffff;
  --text-muted: #aaaaaa;
  --text-dim: #666666;
  --text-faint: #333333;
  --charcoal: #444444;
  --radius: 6px;
  --radius-sm: 3px;
  --transition: 0.25s ease;
  --font: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif;
}

/* =====================
   RESET & BASE
   ===================== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
}
```

- [ ] **Step 3: Create `script.js` as empty module with tab switching skeleton**

```js
'use strict';

// Tab switching for collections section
function initCategoryTabs() {
  const tabs = document.querySelectorAll('.cat-tab');
  const grids = document.querySelectorAll('.cat-grid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.category;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      grids.forEach(grid => {
        grid.hidden = grid.dataset.category !== target;
      });
    });
  });
}

// Mobile nav toggle
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCategoryTabs();
  initMobileNav();
});
```

- [ ] **Step 4: Verify scaffold in browser**

Open `index.html` in a browser. Expected: blank dark page (`#0d0d0d` background), no console errors, favicon appears in tab.

- [ ] **Step 5: Commit**

```bash
cd "/Users/theyoda/Box Sync/PROJECTS/Claude Projects/Worldwide Wholesalers"
git init
git add index.html styles.css script.js
git commit -m "feat: scaffold html/css/js with brand tokens and base reset"
```

---

## Task 2: Sticky Navigation

**Files:**
- Modify: `index.html` — fill `<nav>` section
- Modify: `styles.css` — add nav styles

- [ ] **Step 1: Fill the `<nav>` in `index.html`**

Replace `<!-- Task 2 -->` inside `<nav class="nav" id="nav">` with:

```html
<div class="nav-inner">
  <a href="#" class="nav-logo" aria-label="Worldwide Wholesalers home">
    <img src="public/logo_2.png" alt="Worldwide Wholesalers" height="36" />
  </a>

  <button
    class="nav-hamburger"
    id="nav-toggle"
    aria-controls="nav-menu"
    aria-expanded="false"
    aria-label="Toggle navigation menu"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="nav-menu" id="nav-menu" role="list">
    <a href="#collections" class="nav-link" role="listitem">Collections</a>
    <a href="#why-us" class="nav-link" role="listitem">About</a>
    <a href="#contact" class="nav-link" role="listitem">Global Reach</a>
    <a
      href="https://wa.me/15551234567"
      class="nav-cta"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >WhatsApp Us</a>
  </div>
</div>
```

- [ ] **Step 2: Add nav styles to `styles.css`**

```css
/* =====================
   NAV
   ===================== */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #0a0a0a;
  border-bottom: 2px solid var(--green);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.nav-logo img {
  height: 36px;
  width: auto;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  transition: color var(--transition);
}

.nav-link:hover,
.nav-link:focus-visible {
  color: var(--green);
}

.nav-cta {
  background: var(--green);
  color: #fff;
  padding: 8px 20px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  transition: background var(--transition);
}

.nav-cta:hover,
.nav-cta:focus-visible {
  background: var(--green-dark);
}

.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}

.nav-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: var(--transition);
}

/* Focus visible for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 3px;
  border-radius: 2px;
}
```

- [ ] **Step 3: Verify in browser**

Open `index.html`. Expected: sticky dark nav with green bottom border, logo image on left, links on right, "WhatsApp Us" green button. Scrolling a tall page keeps it fixed.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: sticky nav with logo, links, and whatsapp CTA"
```

---

## Task 3: Hero Section

**Files:**
- Modify: `index.html` — fill `<section class="hero">`
- Modify: `styles.css` — add hero styles

- [ ] **Step 1: Fill the hero section in `index.html`**

Replace `<!-- Task 3 -->` inside `<section class="hero">` with:

```html
<div class="hero-bg">
  <img
    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80&fit=crop&crop=center"
    alt="Women's fashion and beauty products display"
    class="hero-img"
    fetchpriority="high"
  />
</div>
<div class="hero-overlay" aria-hidden="true"></div>
<div class="hero-content">
  <span class="hero-tag">Global Wholesale</span>
  <h1 class="hero-title">Women &amp; Children<br /><span>Goods Worldwide</span></h1>
  <p class="hero-sub">
    Premium beauty products, women's fashion, and children's clothing —
    available in bulk for retailers and boutiques worldwide.
  </p>
  <a href="#collections" class="hero-btn">Browse Collections ↓</a>
</div>
<div class="hero-scroll" aria-hidden="true">
  <span>Scroll</span>
  <div class="hero-scroll-line"></div>
</div>
```

- [ ] **Step 2: Add hero styles to `styles.css`**

```css
/* =====================
   HERO
   ===================== */
.hero {
  position: relative;
  height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.3);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.88) 45%, transparent 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 64px;
  width: 100%;
}

.hero-tag {
  display: inline-block;
  background: var(--green);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: var(--radius-sm);
  margin-bottom: 24px;
}

.hero-title {
  font-size: 52px;
  font-weight: 900;
  line-height: 1.05;
  color: #fff;
  margin-bottom: 20px;
  max-width: 560px;
}

.hero-title span {
  color: var(--green);
}

.hero-sub {
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 440px;
}

.hero-btn {
  display: inline-block;
  background: var(--green);
  color: #fff;
  padding: 16px 36px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: background var(--transition), transform var(--transition);
}

.hero-btn:hover,
.hero-btn:focus-visible {
  background: var(--green-dark);
  transform: translateY(-1px);
}

.hero-scroll {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
}

.hero-scroll span {
  color: var(--text-faint);
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hero-scroll-line {
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, var(--green), transparent);
}
```

- [ ] **Step 3: Verify in browser**

Open `index.html`. Expected: full-height hero with fashion photo (slightly visible through dark overlay), "Global Wholesale" green pill, large white headline with green "Goods Worldwide", grey subtext, green "Browse Collections ↓" button. Scroll indicator at bottom center.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: hero section with HD background image and CTA"
```

---

## Task 4: Stats Bar

**Files:**
- Modify: `index.html` — fill `<section class="stats">`
- Modify: `styles.css` — add stats styles

- [ ] **Step 1: Fill stats section in `index.html`**

Replace `<!-- Task 4 -->` inside `<section class="stats">` with:

```html
<div class="stats-inner">
  <div class="stat">
    <div class="stat-num">50+</div>
    <div class="stat-label">Countries Served</div>
  </div>
  <div class="stats-divider" aria-hidden="true"></div>
  <div class="stat">
    <div class="stat-num">3</div>
    <div class="stat-label">Product Categories</div>
  </div>
  <div class="stats-divider" aria-hidden="true"></div>
  <div class="stat">
    <div class="stat-num">1000+</div>
    <div class="stat-label">Products Available</div>
  </div>
  <div class="stats-divider" aria-hidden="true"></div>
  <div class="stat">
    <div class="stat-num">B2B</div>
    <div class="stat-label">Wholesale Only</div>
  </div>
</div>
```

- [ ] **Step 2: Add stats styles to `styles.css`**

```css
/* =====================
   STATS BAR
   ===================== */
.stats {
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.stats-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.stat {
  text-align: center;
  flex: 1;
}

.stat-num {
  font-size: 40px;
  font-weight: 900;
  color: var(--green);
  line-height: 1;
  letter-spacing: -1px;
}

.stat-label {
  font-size: 10px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 8px;
}

.stats-divider {
  width: 1px;
  height: 48px;
  background: var(--border-2);
  flex-shrink: 0;
}
```

- [ ] **Step 3: Verify in browser**

Expected: full-width dark band below hero showing 4 stats with green numbers, grey labels, thin dividers between them.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: stats bar with brand numbers"
```

---

## Task 5: Collections — Category Tabs + Product Grids

**Files:**
- Modify: `index.html` — fill `<section class="collections">`
- Modify: `styles.css` — add collections + card styles

- [ ] **Step 1: Fill collections section in `index.html`**

Replace `<!-- Task 5 -->` inside `<section class="collections" id="collections">` with:

```html
<div class="section-inner">
  <p class="section-label">Our Collections</p>
  <h2 class="section-title">Browse by Category</h2>
  <p class="section-sub">Click any category to explore our full range of products</p>

  <div class="cat-tabs" role="tablist" aria-label="Product categories">
    <button
      class="cat-tab active"
      role="tab"
      aria-selected="true"
      aria-controls="grid-beauty"
      id="tab-beauty"
      data-category="beauty"
    >✦ Beauty Products</button>
    <button
      class="cat-tab"
      role="tab"
      aria-selected="false"
      aria-controls="grid-women"
      id="tab-women"
      data-category="women"
    >✦ Women's Clothing</button>
    <button
      class="cat-tab"
      role="tab"
      aria-selected="false"
      aria-controls="grid-children"
      id="tab-children"
      data-category="children"
    >✦ Children's Clothing</button>
  </div>

  <!-- BEAUTY GRID -->
  <div
    class="cat-grid"
    id="grid-beauty"
    data-category="beauty"
    role="tabpanel"
    aria-labelledby="tab-beauty"
  >
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80&fit=crop"
        alt="Lipstick and lip care products flatlay"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Lipstick &amp; Lip Care</span>
      </div>
      <span class="cat-card-badge">New</span>
    </div>
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80&fit=crop"
        alt="Skincare serums and moisturizers"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Skincare &amp; Serums</span>
      </div>
    </div>
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80&fit=crop"
        alt="Makeup and cosmetics collection"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Makeup &amp; Cosmetics</span>
      </div>
      <span class="cat-card-badge cat-card-badge--hot">Hot</span>
    </div>
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&fit=crop"
        alt="Nail polish and nail art supplies"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Nail &amp; Nail Art</span>
      </div>
    </div>
  </div>

  <!-- WOMEN'S GRID -->
  <div
    class="cat-grid"
    id="grid-women"
    data-category="women"
    role="tabpanel"
    aria-labelledby="tab-women"
    hidden
  >
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80&fit=crop"
        alt="Women's dresses and gowns"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Dresses &amp; Gowns</span>
      </div>
      <span class="cat-card-badge">New</span>
    </div>
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&q=80&fit=crop"
        alt="Women's tops and blouses"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Tops &amp; Blouses</span>
      </div>
    </div>
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80&fit=crop"
        alt="Women's pants and bottoms"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Bottoms &amp; Pants</span>
      </div>
    </div>
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80&fit=crop"
        alt="Women's outerwear and coats"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Outerwear &amp; Coats</span>
      </div>
      <span class="cat-card-badge cat-card-badge--season">Season</span>
    </div>
  </div>

  <!-- CHILDREN'S GRID -->
  <div
    class="cat-grid"
    id="grid-children"
    data-category="children"
    role="tabpanel"
    aria-labelledby="tab-children"
    hidden
  >
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80&fit=crop"
        alt="Baby and infant clothing"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Baby &amp; Infant</span>
      </div>
    </div>
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80&fit=crop"
        alt="Girls clothing ages 2 to 12"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Girls 2–12</span>
      </div>
      <span class="cat-card-badge cat-card-badge--hot">Popular</span>
    </div>
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=600&q=80&fit=crop"
        alt="Boys clothing ages 2 to 12"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">Boys 2–12</span>
      </div>
    </div>
    <div class="cat-card">
      <img
        src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80&fit=crop"
        alt="School uniforms and children's school wear"
        loading="lazy"
      />
      <div class="cat-card-overlay">
        <span class="cat-card-label">School &amp; Uniforms</span>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add collections styles to `styles.css`**

```css
/* =====================
   SHARED SECTION STYLES
   ===================== */
.section-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 64px;
}

.section-label {
  font-size: 10px;
  color: var(--green);
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.section-title {
  font-size: 34px;
  font-weight: 900;
  color: var(--text);
  margin-bottom: 10px;
}

.section-sub {
  color: var(--text-dim);
  font-size: 14px;
  margin-bottom: 40px;
}

/* =====================
   CATEGORY TABS
   ===================== */
.cat-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-2);
  margin-bottom: 32px;
}

.cat-tab {
  padding: 14px 28px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  color: var(--text-dim);
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  transition: color var(--transition), border-color var(--transition);
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
}

.cat-tab:hover {
  color: var(--text-muted);
}

.cat-tab.active,
.cat-tab[aria-selected="true"] {
  color: var(--green);
  border-bottom-color: var(--green);
}

/* =====================
   PRODUCT GRID + CARDS
   ===================== */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.cat-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: var(--surface-2);
  border: 1px solid var(--border);
  cursor: default;
}

.cat-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
  transition: filter var(--transition), transform 0.35s ease;
}

.cat-card:hover img {
  filter: brightness(1);
  transform: scale(1.04);
}

.cat-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.82));
  padding: 36px 14px 14px;
}

.cat-card-label {
  font-size: 12px;
  color: #ddd;
  font-weight: 600;
}

.cat-card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--green);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 2px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.cat-card-badge--hot {
  background: #e53e3e;
}

.cat-card-badge--season {
  background: #805ad5;
}
```

- [ ] **Step 3: Update `script.js` to also update `aria-selected` on tab switch**

Replace the `initCategoryTabs` function in `script.js` with:

```js
function initCategoryTabs() {
  const tabs = document.querySelectorAll('.cat-tab');
  const grids = document.querySelectorAll('.cat-grid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.category;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      grids.forEach(grid => {
        grid.hidden = grid.dataset.category !== target;
      });
    });
  });
}
```

- [ ] **Step 4: Verify in browser**

Open `index.html`, scroll to Collections. Expected: green "OUR COLLECTIONS" label, "Browse by Category" heading, 3 tab buttons. Beauty tab active by default shows 4 product cards with images. Clicking "Women's Clothing" tab hides beauty grid, shows women's grid. Hover on cards scales image slightly. Badges visible (New, Hot, etc.).

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css script.js
git commit -m "feat: category tabs with 3 product grids and HD images"
```

---

## Task 6: Why Choose Us Section

**Files:**
- Modify: `index.html` — fill `<section class="why-us">`
- Modify: `styles.css` — add why-us styles

- [ ] **Step 1: Fill why-us section in `index.html`**

Replace `<!-- Task 6 -->` inside `<section class="why-us" aria-label="Why choose us">` with:

```html
<div class="section-inner" id="why-us">
  <p class="section-label">Why Choose Us</p>
  <h2 class="section-title">Built for Wholesale Buyers</h2>
  <p class="section-sub">Everything you need to source with confidence</p>

  <div class="why-grid">
    <div class="why-card">
      <div class="why-icon" aria-hidden="true">🌍</div>
      <h3 class="why-title">Global Reach</h3>
      <p class="why-text">We ship to 50+ countries. Whether you're a boutique in Lagos or a retailer in Dubai, we get your order there reliably and on time.</p>
    </div>
    <div class="why-card">
      <div class="why-icon" aria-hidden="true">📦</div>
      <h3 class="why-title">Bulk Pricing</h3>
      <p class="why-text">Competitive wholesale rates across all categories. The more you order, the better the price. Simple, transparent pricing with no hidden fees.</p>
    </div>
    <div class="why-card">
      <div class="why-icon" aria-hidden="true">✅</div>
      <h3 class="why-title">Quality Assured</h3>
      <p class="why-text">Every product is quality-checked before it ships. No surprises — what you see in our catalog is exactly what arrives at your door.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add why-us styles to `styles.css`**

```css
/* =====================
   WHY CHOOSE US
   ===================== */
.why-us {
  background: var(--bg);
}

.why-us .section-inner {
  padding-top: 0;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.why-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 3px solid var(--green);
  border-radius: var(--radius);
  padding: 32px;
}

.why-icon {
  font-size: 28px;
  margin-bottom: 16px;
}

.why-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
}

.why-text {
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.75;
}
```

- [ ] **Step 3: Verify in browser**

Expected: 3 dark cards with green top border, emoji icon, uppercase heading, grey body text. Sits cleanly below the product grids.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: why choose us section with 3 value cards"
```

---

## Task 7: WhatsApp CTA Band

**Files:**
- Modify: `index.html` — fill `<section class="contact-band">`
- Modify: `styles.css` — add contact band styles

- [ ] **Step 1: Fill contact-band section in `index.html`**

Replace `<!-- Task 7 -->` inside `<section class="contact-band" id="contact">` with:

```html
<div class="contact-band-inner">
  <div class="contact-text">
    <p class="section-label">Ready to Order?</p>
    <h2 class="contact-title">Let's Talk Business</h2>
    <p class="contact-sub">Message us on WhatsApp to discuss bulk pricing, minimum order quantities, and shipping options for your market. We respond fast.</p>
  </div>
  <a
    href="https://wa.me/15551234567"
    class="wa-btn"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open WhatsApp chat to discuss wholesale orders"
  >
    <svg class="wa-btn-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    Chat on WhatsApp
  </a>
</div>
```

- [ ] **Step 2: Add contact band styles to `styles.css`**

```css
/* =====================
   CONTACT / WHATSAPP BAND
   ===================== */
.contact-band {
  padding: 0 64px 80px;
}

.contact-band-inner {
  max-width: 1280px;
  margin: 0 auto;
  background: linear-gradient(135deg, #0d1f0d 0%, #0a0a0a 100%);
  border: 1px solid #1e3a1e;
  border-radius: var(--radius);
  padding: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

.contact-text {
  flex: 1;
}

.contact-title {
  font-size: 30px;
  font-weight: 900;
  color: var(--text);
  margin-bottom: 12px;
}

.contact-sub {
  color: var(--text-dim);
  font-size: 14px;
  line-height: 1.7;
  max-width: 420px;
}

.wa-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--wa-green);
  color: #fff;
  padding: 18px 40px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background var(--transition), transform var(--transition);
}

.wa-btn:hover,
.wa-btn:focus-visible {
  background: #1da851;
  transform: translateY(-2px);
}

.wa-btn-icon {
  width: 22px;
  height: 22px;
  fill: #fff;
  flex-shrink: 0;
}
```

- [ ] **Step 3: Verify in browser**

Expected: dark green-tinted panel with "Let's Talk Business" heading on left, large green WhatsApp button with WA icon on right.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: whatsapp CTA band section"
```

---

## Task 8: Footer + Floating WhatsApp Button

**Files:**
- Modify: `index.html` — fill `<footer>` and floating WA button
- Modify: `styles.css` — add footer + floating WA styles

- [ ] **Step 1: Fill footer and floating WA in `index.html`**

Replace `<!-- Task 8 -->` inside `<footer class="footer">` with:

```html
<div class="footer-inner">
  <a href="#" class="footer-logo" aria-label="Worldwide Wholesalers home">
    <img src="public/logo_2.png" alt="Worldwide Wholesalers" height="28" />
  </a>
  <p class="footer-copy">© 2026 Worldwide Wholesalers. All rights reserved.</p>
  <nav class="footer-links" aria-label="Footer navigation">
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
    <a href="#">Privacy</a>
  </nav>
</div>
```

Replace `<!-- Task 8 -->` inside `<a href="..." class="wa-float">` with:

```html
<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="width:28px;height:28px;fill:#fff;">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
</svg>
```

- [ ] **Step 2: Add footer and floating WA styles to `styles.css`**

```css
/* =====================
   FOOTER
   ===================== */
.footer {
  background: #080808;
  border-top: 1px solid #141414;
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.footer-logo img {
  height: 28px;
  width: auto;
  opacity: 0.7;
  transition: opacity var(--transition);
}

.footer-logo:hover img {
  opacity: 1;
}

.footer-copy {
  font-size: 11px;
  color: var(--text-faint);
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  font-size: 10px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color var(--transition);
}

.footer-links a:hover {
  color: var(--green);
}

/* =====================
   FLOATING WHATSAPP
   ===================== */
.wa-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 200;
  width: 58px;
  height: 58px;
  background: var(--wa-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(37, 211, 102, 0.4);
  transition: transform var(--transition), box-shadow var(--transition);
}

.wa-float:hover,
.wa-float:focus-visible {
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(37, 211, 102, 0.6);
}

.wa-float-pulse {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 199;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: rgba(37, 211, 102, 0.35);
  animation: wa-pulse 2.4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes wa-pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.5); opacity: 0; }
}
```

- [ ] **Step 3: Verify in browser**

Expected: dark minimal footer with logo left, copyright center, social/privacy links right. Floating green WhatsApp circle with pulsing ring always visible bottom-right. Hovering the float scales it up.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: footer and floating whatsapp button with pulse animation"
```

---

## Task 9: Mobile Responsive

**Files:**
- Modify: `styles.css` — add responsive media queries
- Modify: `script.js` — hamburger is already wired; verify it works

- [ ] **Step 1: Add all responsive styles to the bottom of `styles.css`**

```css
/* =====================
   RESPONSIVE
   ===================== */

/* Tablet — 1024px */
@media (max-width: 1024px) {
  .hero-title { font-size: 40px; }
  .hero-content { padding: 0 40px; }
  .stats-inner { padding: 40px; }
  .section-inner { padding: 60px 40px; }
  .contact-band { padding: 0 40px 60px; }
  .contact-band-inner { padding: 48px; gap: 32px; }
  .footer-inner { padding: 28px 40px; }
  .cat-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Mobile large — 768px */
@media (max-width: 768px) {
  /* Nav hamburger */
  .nav-hamburger { display: flex; }

  .nav-menu {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: #0a0a0a;
    border-bottom: 2px solid var(--green);
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 8px 0;
    z-index: 99;
  }

  .nav-menu.open { display: flex; }

  .nav-link, .nav-cta {
    display: block;
    width: 100%;
    padding: 14px 24px;
    border-radius: 0;
    font-size: 12px;
  }

  .nav-cta {
    background: none;
    color: var(--green);
    border-top: 1px solid var(--border);
    margin-top: 4px;
  }

  /* Hero */
  .hero { height: auto; padding: 80px 0 60px; }
  .hero-content { padding: 0 24px; }
  .hero-title { font-size: 34px; }
  .hero-sub { font-size: 14px; }

  /* Stats */
  .stats-inner {
    padding: 36px 24px;
    flex-wrap: wrap;
    gap: 0;
  }
  .stat { width: 50%; padding: 16px 0; }
  .stats-divider { display: none; }

  /* Sections */
  .section-inner { padding: 48px 24px; }
  .section-title { font-size: 26px; }

  /* Grids */
  .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .why-grid { grid-template-columns: 1fr; gap: 16px; }

  /* Tabs */
  .cat-tab { padding: 12px 16px; font-size: 10px; letter-spacing: 1px; }

  /* Contact band */
  .contact-band { padding: 0 24px 48px; }
  .contact-band-inner {
    flex-direction: column;
    align-items: flex-start;
    padding: 36px 28px;
    gap: 28px;
  }
  .wa-btn { width: 100%; justify-content: center; }

  /* Footer */
  .footer-inner {
    flex-direction: column;
    text-align: center;
    gap: 16px;
    padding: 28px 24px;
  }
}

/* Mobile small — 480px */
@media (max-width: 480px) {
  .hero-title { font-size: 28px; }
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
  .cat-tab { padding: 10px 12px; font-size: 9px; }
  .stat-num { font-size: 30px; }
}
```

- [ ] **Step 2: Verify responsive behavior**

Resize browser to 375px wide (iPhone SE). Expected:
- Hamburger icon visible, nav links hidden
- Tapping hamburger opens vertical menu
- Hero text stacks and fits within viewport
- Stats show 2×2 grid
- Product cards show 2 columns
- CTA band stacks vertically with full-width WhatsApp button
- Footer stacks vertically

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: responsive breakpoints — tablet, mobile, small mobile"
```

---

## Task 10: Accessibility Pass

**Files:**
- Modify: `index.html` — verify all aria attributes, alt text, skip link
- Modify: `styles.css` — skip link styles, ensure focus-visible on all interactives

- [ ] **Step 1: Add skip-to-content link as first child of `<body>` in `index.html`**

Insert immediately after `<body>` opening tag (before `<nav>`):

```html
<a href="#collections" class="skip-link">Skip to main content</a>
```

- [ ] **Step 2: Add skip link styles to `styles.css`**

```css
/* =====================
   ACCESSIBILITY
   ===================== */
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  background: var(--green);
  color: #fff;
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 700;
  z-index: 9999;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 16px;
}
```

- [ ] **Step 3: Verify accessibility checklist manually in browser**

Check each item:

- [ ] All `<img>` tags have descriptive `alt` text (not empty, not "image")
- [ ] `<nav>` has `aria-label="Main navigation"`
- [ ] Category tabs have `role="tab"`, `aria-selected`, `aria-controls` attributes
- [ ] Category grids have `role="tabpanel"`, `aria-labelledby` attributes
- [ ] Floating WA button has `aria-label="Chat with us on WhatsApp"`
- [ ] WA CTA band button has `aria-label` describing its purpose
- [ ] Skip link appears when Tab is pressed from top of page
- [ ] Tab through all interactive elements — green outline visible on each
- [ ] `<main>`, `<nav>`, `<footer>` landmarks present

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: accessibility — skip link, focus styles, aria attributes"
```

---

## Task 11: WhatsApp Number + Final Polish

**Files:**
- Modify: `index.html` — replace placeholder WA number, add `.gitignore`
- Create: `.gitignore`

- [ ] **Step 1: Replace placeholder WhatsApp number in `index.html`**

Find all instances of `https://wa.me/15551234567` in `index.html` (there are 3: nav CTA, contact band, floating button) and replace with the real number in E.164 format (no `+` or spaces): `https://wa.me/REALNUMBER`.

If you don't have the real number, leave the placeholder and add a `<!-- TODO: replace with real WhatsApp number -->` comment on each line.

- [ ] **Step 2: Create `.gitignore`**

```
.superpowers/
.DS_Store
*.local
```

- [ ] **Step 3: Final visual check — scroll the full page**

Open `index.html` in browser, scroll top to bottom. Verify:
- [ ] Logo displays correctly in nav (not stretched or missing)
- [ ] All 12 Unsplash images load (no broken images)
- [ ] Category tab switching works cleanly
- [ ] Floating WA button always visible at bottom right with pulse
- [ ] No horizontal scroll on desktop or mobile
- [ ] Colour contrast: white text on dark backgrounds passes visually
- [ ] Green `#3DB34A` matches the logo accent colour

- [ ] **Step 4: Final commit**

```bash
git add .gitignore index.html
git commit -m "feat: final polish — whatsapp number, gitignore, and visual QA"
```

---

## Spec Coverage Check

| Spec Requirement | Task |
|---|---|
| Dark + green glow aesthetic | Task 1 (CSS tokens), all tasks |
| Logo `logo_2.png` in nav | Task 2 |
| Sticky nav | Task 2 |
| Hero with HD background + CTA | Task 3 |
| Stats bar | Task 4 |
| 3-category tab switcher | Task 5 |
| Beauty products grid (4 sub-categories) | Task 5 |
| Women's clothing grid (4 sub-categories) | Task 5 |
| Children's clothing grid (4 sub-categories) | Task 5 |
| Why Choose Us (3 cards) | Task 6 |
| WhatsApp CTA band | Task 7 |
| Footer with social links | Task 8 |
| Floating WhatsApp button + pulse | Task 8 |
| Mobile responsive | Task 9 |
| WCAG 2.1 AA accessibility | Task 10 |
| No shopping features | All tasks (confirmed: no cart, prices, or checkout anywhere) |
| `favicon.ico` used | Task 1 (link rel in `<head>`) |
