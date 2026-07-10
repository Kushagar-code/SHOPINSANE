export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  price: number;
  original_price?: number;
  image_url: string;
  thumbnails: string[];
  tags: string[];
  rating: number;
  review_count: number;
  description: string;
  stock: number;         // Remaining stock quantity
  units_sold: number;    // Sales tracking metric
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string; // Brand color for the chip icon
}

export const SEEDED_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Smartphones", slug: "smartphones", color: "#5433eb" },
  { id: "cat-2", name: "Audio", slug: "audio", color: "#10b981" },
  { id: "cat-3", name: "Power & Cables", slug: "power-cables", color: "#f59e0b" },
  { id: "cat-4", name: "Accessories", slug: "accessories", color: "#ef4444" }
];

export const SEEDED_PRODUCTS: Product[] = [
  // ================= CAT-1: SMARTPHONES =================
  {
    id: "prod-s1",
    category_id: "cat-1",
    name: "Titanium Pro Max 15",
    slug: "titanium-pro-max-15",
    price: 1199.99,
    original_price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["flagship", "5g", "premium"],
    rating: 4.8,
    review_count: 142,
    description: "Experience ultimate computing power in your palm. Grade-5 titanium chassis paired with dynamic high-refresh displays.",
    stock: 25,
    units_sold: 48
  },
  {
    id: "prod-s2",
    category_id: "cat-1",
    name: "Galaxy Ultra 24",
    slug: "galaxy-ultra-24",
    price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["flagship", "stylus", "android"],
    rating: 4.9,
    review_count: 98,
    description: "Next-generation generative AI processing combined with an integrated S-Pen and raw 200MP camera matrices.",
    stock: 18,
    units_sold: 62
  },
  {
    id: "prod-s3",
    category_id: "cat-1",
    name: "Pixel 8a",
    slug: "pixel-8a",
    price: 499.99,
    original_price: 549.99,
    image_url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["midrange", "camera", "android"],
    rating: 4.5,
    review_count: 210,
    description: "Pure Android software environment featuring class-leading low-light camera processing and machine learning tools.",
    stock: 50,
    units_sold: 110
  },
  {
    id: "prod-s4",
    category_id: "cat-1",
    name: "Nothing Phone 2",
    slug: "nothing-phone-2",
    price: 599.99,
    image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["design", "unique", "android"],
    rating: 4.6,
    review_count: 85,
    description: "Symmetrical design architecture showing an elegant, interactive transparent rear glyph interface.",
    stock: 32,
    units_sold: 37
  },
  {
    id: "prod-s5",
    category_id: "cat-1",
    name: "Foldable Pro X",
    slug: "foldable-pro-x",
    price: 1799.99,
    image_url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["foldable", "premium"],
    rating: 4.4,
    review_count: 36,
    description: "Multi-tasking powerhouse featuring an ultra-thin folding glass panel that transforms from handset to tablet format.",
    stock: 3, // Scarcity Warning Trigger
    units_sold: 14
  },
  {
    id: "prod-s6",
    category_id: "cat-1",
    name: "OnePlus 12 Pro",
    slug: "oneplus-12-pro",
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["flagship", "fast-charge", "android"],
    rating: 4.7,
    review_count: 53,
    description: "Smooth display panels matching 100W wired quick charging elements for robust mobile power cycles.",
    stock: 4, // Scarcity Warning Trigger
    units_sold: 29
  },

  // ================= CAT-2: AUDIO =================
  {
    id: "prod-a1",
    category_id: "cat-2",
    name: "Noise Cancelling Pods Pro",
    slug: "noise-cancelling-pods-pro",
    price: 249.99,
    original_price: 299.99,
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["wireless", "anc", "in-ear"],
    rating: 4.7,
    review_count: 312,
    description: "Double the active noise cancellation capability paired with adaptive audio algorithms and sweat resistance configurations.",
    stock: 75,
    units_sold: 142
  },
  {
    id: "prod-a2",
    category_id: "cat-2",
    name: "Studio Over-Ear Max",
    slug: "studio-over-ear-max",
    price: 549.99,
    image_url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["wireless", "anc", "over-ear"],
    rating: 4.8,
    review_count: 175,
    description: "High-fidelity custom audio drivers embedded in pristine, lightweight aramid housings with dynamic head tracking.",
    stock: 30,
    units_sold: 84
  },
  {
    id: "prod-a3",
    category_id: "cat-2",
    name: "Sport Buds Fit",
    slug: "sport-buds-fit",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["workout", "wireless"],
    rating: 4.3,
    review_count: 94,
    description: "Flexible, secure-fit ear hooks optimized for running and intense training regimes. Rain and sweatproof IPX7 rating.",
    stock: 60,
    units_sold: 45
  },
  {
    id: "prod-a4",
    category_id: "cat-2",
    name: "Acoustic Wireless XM5",
    slug: "acoustic-wireless-xm5",
    price: 299.99,
    image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["anc", "in-ear"],
    rating: 4.7,
    review_count: 220,
    description: "Unprecedented clarity with dual processor elements driving active noise reduction profiles in dense environments.",
    stock: 45,
    units_sold: 99
  },
  {
    id: "prod-a5",
    category_id: "cat-2",
    name: "Bass Heavy Earbuds",
    slug: "bass-heavy-earbuds",
    price: 129.99,
    image_url: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["bass", "budget"],
    rating: 4.2,
    review_count: 140,
    description: "Enhanced low-frequency feedback and solid punch performance designed for bass-heavy audio genres.",
    stock: 80,
    units_sold: 115
  },

  // ================= CAT-3: POWER & CABLES =================
  {
    id: "prod-p1",
    category_id: "cat-3",
    name: "Nano 65W Charger",
    slug: "nano-65w-charger",
    price: 49.99,
    original_price: 59.99,
    image_url: "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["gan", "fast-charge"],
    rating: 4.8,
    review_count: 512,
    description: "Gallium Nitride (GaN) semiconductor architecture supplying ultra-fast charging matrices in a micro pocket format.",
    stock: 120,
    units_sold: 340
  },
  {
    id: "prod-p2",
    category_id: "cat-3",
    name: "Magnetic Wireless Pack",
    slug: "magnetic-wireless-pack",
    price: 79.99,
    image_url: "https://images.unsplash.com/photo-1622445261812-70b135c3a44d?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1622445261812-70b135c3a44d?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["magsafe", "wireless"],
    rating: 4.6,
    review_count: 184,
    description: "Snaps magnetically into alignment with modern smartphone frames for a wireless 15W battery pack boost.",
    stock: 55,
    units_sold: 92
  },
  {
    id: "prod-p3",
    category_id: "cat-3",
    name: "Braided USB-C Cable (2m)",
    slug: "braided-usb-c-cable-2m",
    price: 19.99,
    image_url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["cable", "durable"],
    rating: 4.9,
    review_count: 672,
    description: "Heavy-duty double-braided ballistic nylon exterior sheath protecting high-speed 100W PD transmission lines.",
    stock: 200,
    units_sold: 580
  },
  {
    id: "prod-p4",
    category_id: "cat-3",
    name: "Desktop Charging Station",
    slug: "desktop-charging-station",
    price: 119.99,
    image_url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["desk", "wireless"],
    rating: 4.7,
    review_count: 86,
    description: "Multi-outlet power hub containing dedicated magnetic stands, secondary USB-C ports, and clean organization frames.",
    stock: 2, // Scarcity Warning Trigger
    units_sold: 23
  },
  {
    id: "prod-p5",
    category_id: "cat-3",
    name: "Car Mount Wireless Charger",
    slug: "car-mount-wireless-charger",
    price: 39.99,
    image_url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["car", "wireless"],
    rating: 4.4,
    review_count: 115,
    description: "Vent-secured smartphone cradle featuring auto-clamping motor locks and continuous 15W Qi power delivery.",
    stock: 85,
    units_sold: 64
  },

  // ================= CAT-4: ACCESSORIES =================
  {
    id: "prod-c1",
    category_id: "cat-4",
    name: "Aramid Fiber Case",
    slug: "aramid-fiber-case",
    price: 59.99,
    original_price: 69.99,
    image_url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["case", "slim"],
    rating: 4.8,
    review_count: 242,
    description: "Ultra-thin, bulletproof aerospace material construction offering military-grade surface drop armor shielding.",
    stock: 90,
    units_sold: 180
  },
  {
    id: "prod-c2",
    category_id: "cat-4",
    name: "Tempered Glass Screen (2-Pack)",
    slug: "tempered-glass-screen-2-pack",
    price: 14.99,
    image_url: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["protection", "glass"],
    rating: 4.7,
    review_count: 830,
    description: "9H hardness index glass shields keeping original display clarity while preventing localized face impacts.",
    stock: 150,
    units_sold: 450
  },
  {
    id: "prod-c3",
    category_id: "cat-4",
    name: "Magnetic Phone Grip",
    slug: "magnetic-phone-grip",
    price: 24.99,
    image_url: "https://images.unsplash.com/photo-1503328427499-d92d1ac3ceb7?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1503328427499-d92d1ac3ceb7?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["grip", "magsafe"],
    rating: 4.5,
    review_count: 198,
    description: "Low-profile collapsible ring adapter providing absolute orientation handles and quick tabletop stand positions.",
    stock: 110,
    units_sold: 76
  },
  {
    id: "prod-c4",
    category_id: "cat-4",
    name: "Mobile Gimbal Stabilizer",
    slug: "mobile-gimbal-stabilizer",
    price: 149.99,
    image_url: "https://images.unsplash.com/photo-1584438784894-089d6a128f3e?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1584438784894-089d6a128f3e?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["video", "creator"],
    rating: 4.6,
    review_count: 57,
    description: "3-axis active stabilization motor deck equipped with facial AI tracking profiles for cinematic mobile tracking.",
    stock: 1, // Scarcity Warning Trigger
    units_sold: 34
  },
  {
    id: "prod-c5",
    category_id: "cat-4",
    name: "Bluetooth Tracker Tag",
    slug: "bluetooth-tracker-tag",
    price: 29.99,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["tracker", "bluetooth"],
    rating: 4.3,
    review_count: 320,
    description: "Locate hardware attachments in seconds via localized Bluetooth networks and ultra-wideband audio cues.",
    stock: 130,
    units_sold: 215
  },
  {
    id: "prod-c6",
    category_id: "cat-4",
    name: "Leather Wallet Stand",
    slug: "leather-wallet-stand",
    price: 49.99,
    image_url: "https://images.unsplash.com/photo-1622445261812-70b135c3a44d?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1622445261812-70b135c3a44d?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["leather", "magsafe", "accessory"],
    rating: 4.5,
    review_count: 78,
    description: "Premium leather card holder with integrated kickstand that aligns magnetically to phone surfaces.",
    stock: 45,
    units_sold: 112
  }
];

export const MOCK_ADMINS = [
  { email: "joepsycho@shopinsane.com", password: "AdminSecure2026!", role: "admin" },
  { email: "rajan@shopinsane.com", password: "AdminSecure2026!", role: "admin" }
];
