# Worldwide Wholesalers — Site Design Spec
**Date:** 2026-03-30
**Type:** Pure HTML static site
**Domain:** worldwidewholesalers.store

---

## Goal

Rebuild worldwidewholesalers.store as a pure HTML/CSS/JS static site. Global wholesale brand catering to women's and children's goods. Ecommerce look and feel — no shopping cart, no checkout, no pricing. Purpose is brand showcase + wholesale inquiry generation via WhatsApp.

---

## Brand Identity

- **Logo files:** `public/logo_2.png` (horizontal wordmark), `public/icon.png` (price tag + lightning bolt icon), `public/favicon.ico`
- **Primary green:** `#3DB34A` (from logo icon and "WHOLESALERS" wordmark)
- **Charcoal:** `#444444` (from "worldwide" wordmark)
- **Accent white:** `#FFFFFF`
- **Background:** `#0D0D0D` (near-black)
- **Surface dark:** `#111111` / `#1A1A1A` for cards and sections
- **Border subtle:** `#1E1E1E` / `#222222`
- **WhatsApp green:** `#25D366`

---

## Tech Stack

- **Vanilla HTML5 + CSS3 + ES6 JS** — zero dependencies, no build step
- **File structure:**
  ```
  index.html
  styles.css
  script.js
  public/
    logo_2.png
    icon.png
    favicon.ico
  ```
- **Images:** HD stock photos from Unsplash (free, no attribution required for commercial use). Embedded as `<img>` tags with descriptive `alt` text.

---

## Page Structure

Single `index.html`. One page, smooth scroll. Category sections expand in-place via JS tab switching — no page navigation.

### Sections (top to bottom)

1. **Sticky Nav**
   - Logo (`logo_2.png`) left-aligned
   - Links: Collections · About · Global Reach
   - CTA button: "WhatsApp Us" → opens `https://wa.me/<number>`
   - Dark background `#0A0A0A`, bottom border `#3DB34A 2px`

2. **Hero**
   - Full-bleed HD background image (women's fashion/beauty editorial), `brightness(0.35)` overlay
   - Left-side text overlay: brand tag, headline "Women & Children Goods Worldwide", subtext, green CTA button "Browse Collections ↓"
   - Scroll indicator at bottom center

3. **Stats Bar**
   - Full-width dark band: 50+ Countries · 3 Categories · 1000+ Products · B2B Wholesale Only
   - Numbers in `#3DB34A`, labels in `#555`

4. **Collections / Category Section**
   - Section label + title + subtitle
   - 3 tab pills: ✦ Beauty Products · ✦ Women's Clothing · ✦ Children's Clothing
   - Active tab underlined in `#3DB34A`
   - Each tab shows a 4-column product image grid (3/4 aspect ratio cards)
   - Cards: HD photo, hover brightness + scale, label overlay at bottom, optional "New/Hot/Popular" badge
   - **Sub-categories per tab:**
     - Beauty: Lipstick & Lip Care, Skincare & Serums, Makeup & Cosmetics, Nail & Nail Art
     - Women's: Dresses & Gowns, Tops & Blouses, Bottoms & Pants, Outerwear & Coats
     - Children's: Baby & Infant, Girls 2–12, Boys 2–12, School & Uniforms

5. **Why Choose Us**
   - 3-column card grid, each card with top `#3DB34A` border
   - Cards: 🌍 Global Reach · 📦 Bulk Pricing · ✅ Quality Assured

6. **WhatsApp CTA Band**
   - Dark green-tinted background panel
   - Left: headline "Let's Talk Business" + description
   - Right: large green WhatsApp button with WA icon + "Chat on WhatsApp"
   - Links to `https://wa.me/<number>`

7. **Footer**
   - Logo mark + copyright
   - Social links: Instagram, Facebook
   - Privacy policy link

8. **Floating WhatsApp Button**
   - Fixed bottom-right, `#25D366` circle, pulsing ring animation
   - Always visible on scroll
   - Links to `https://wa.me/<number>`

---

## Interaction

- **Tab switching:** clicking a category tab hides other grids, shows selected grid (CSS `display:grid` / `display:none`)
- **Nav scroll behavior:** sticky, no color change on scroll (already dark)
- **Smooth scroll:** `scroll-behavior: smooth` on `html`
- **Card hover:** `filter: brightness(1)` + `transform: scale(1.03)` transition
- **WhatsApp float pulse:** CSS `@keyframes` scale + opacity pulse on a behind-element

---

## Images

All images sourced from Unsplash (free HD, no signup required for static use). URLs used directly in `<img src="...">` tags for zero-download-size local development. Categories:

- **Hero:** Fashion editorial, woman in elegant setting — dark/moody tone preferred
- **Beauty (4):** Lipstick flatlay, skincare products, cosmetics spread, nail polish collection
- **Women's (4):** Dress editorial, blouse styled shot, pants outfit, coat/outerwear
- **Children's (4):** Baby clothing, girls outfit, boys clothing, school uniform

---

## Accessibility

- All images include descriptive `alt` text (WCAG 2.1 AA)
- Color contrast: white on `#0D0D0D` = 19.7:1 ✓; `#3DB34A` on `#0D0D0D` = 5.8:1 ✓
- `<nav>`, `<main>`, `<footer>` semantic landmarks
- Focus visible on all interactive elements
- WhatsApp buttons have `aria-label`

---

## Responsive

- Mobile-first media queries
- Nav collapses to hamburger on `< 768px`
- Category grid: 4 col → 2 col → 1 col
- Why-us grid: 3 col → 1 col
- Stats bar: flex-wrap or 2x2 grid on mobile
- Hero text stack on mobile, full bleed image

---

## Out of Scope

- No shopping cart, prices, or checkout
- No CMS or dynamic content
- No forms (WhatsApp only)
- No analytics (can be added later via script tag)
- No server-side code
