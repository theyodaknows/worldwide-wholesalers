// Worldwide Wholesalers — Product Catalog
// Source of truth for all product data. Loaded via <script> tag before script.js.

const PRODUCTS = [
  {
    id: 'beauty-001',
    name: 'Matte Lipstick Collection',
    category: 'beauty',
    subcategory: 'Lipstick & Lip Care',
    price: '$8–14 / unit',
    moq: 50,
    description: 'Long-lasting matte finish lipstick set in 12 trending shades. Vegan formula, cruelty-free, with retail-ready display packaging included.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    badge: 'New'
  },
  {
    id: 'beauty-002',
    name: 'Vitamin C Serum Set',
    category: 'beauty',
    subcategory: 'Skincare & Serums',
    price: '$12–18 / unit',
    moq: 36,
    description: 'High-potency Vitamin C serum formulated for brightening and anti-aging. Packaged in 30ml amber glass bottles with wholesale labelling options.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    badge: null
  },
  {
    id: 'beauty-003',
    name: 'Professional Makeup Palette',
    category: 'beauty',
    subcategory: 'Makeup & Cosmetics',
    price: '$15–22 / unit',
    moq: 24,
    description: '72-shade professional eyeshadow and blush palette with mirror. Private label ready, ideal for salon and beauty retail buyers.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot'
  },
  {
    id: 'women-001',
    name: 'Floral Maxi Dress',
    category: 'women',
    subcategory: 'Dresses & Gowns',
    price: '$18–26 / unit',
    moq: 20,
    description: 'Lightweight floral maxi dress in 6 seasonal prints, available in S–XL. Retail-ready with branded hangtags and poly-bag packaging.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    badge: 'New'
  },
  {
    id: 'women-002',
    name: 'Silk Blouse Collection',
    category: 'women',
    subcategory: 'Tops & Blouses',
    price: '$14–20 / unit',
    moq: 30,
    description: 'Soft-touch satin blouse in 8 solid colours. Versatile cut fits multiple body types — a consistent best-seller for boutique buyers.',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
    badge: null
  },
  {
    id: 'women-003',
    name: 'High-Waist Trouser Set',
    category: 'women',
    subcategory: 'Bottoms & Pants',
    price: '$16–24 / unit',
    moq: 25,
    description: 'High-waist tailored trousers in stretch fabric, 4 neutral colourways. Packaged in size-sorted bundles for easy floor display.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    badge: null
  },
  {
    id: 'children-001',
    name: 'Organic Baby Onesie Pack',
    category: 'children',
    subcategory: 'Baby & Infant',
    price: '$6–10 / unit',
    moq: 60,
    description: 'GOTS-certified organic cotton onesies in newborn–18M sizes. Sold in mixed-size packs of 6, retail-packaged with fold-out sizing chart.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    badge: null
  },
  {
    id: 'children-002',
    name: 'Girls Summer Dress Set',
    category: 'children',
    subcategory: 'Girls 2–12',
    price: '$10–16 / unit',
    moq: 40,
    description: 'Bright cotton summer dresses in 5 prints, ages 2–12. Mix-and-match sizing bundles available — popular with children\'s boutiques globally.',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular'
  },
  {
    id: 'children-003',
    name: 'Boys Casual Outfit Bundle',
    category: 'children',
    subcategory: 'Boys 2–12',
    price: '$12–18 / unit',
    moq: 36,
    description: 'Casual outfit sets (top + bottoms) for boys aged 2–12. Durable cotton blend with reinforced seams, sold in assorted colour packs.',
    image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=800&q=80',
    badge: null
  }
];
