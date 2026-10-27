import type { Brand, Category, Product } from '@/types/catalog';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-smartphones',
    slug: 'smartphones',
    name: 'Smartphones',
    description: 'Latest flagship, mid-range, and value smartphones with official specs.',
    iconName: 'Smartphone',
  },
  {
    id: 'cat-laptops',
    slug: 'laptops',
    name: 'Laptops',
    description: 'Productivity ultrabooks, student laptops, and creator workstations.',
    iconName: 'Laptop',
  },
  {
    id: 'cat-audio',
    slug: 'audio',
    name: 'Audio & Sound',
    description: 'Active noise-cancelling headphones, wireless earbuds, and portable speakers.',
    iconName: 'Headphones',
  },
  {
    id: 'cat-smartwatches',
    slug: 'smartwatches',
    name: 'Smartwatches',
    description: 'Fitness trackers, AMOLED smartwatches, and everyday wrist companions.',
    iconName: 'Watch',
  },
  {
    id: 'cat-gaming',
    slug: 'gaming-accessories',
    name: 'Gaming Accessories',
    description: 'Mechanical keyboards, lightweight gaming mice, and surround sound headsets.',
    iconName: 'Gamepad2',
  },
  {
    id: 'cat-power',
    slug: 'chargers-powerbanks',
    name: 'Chargers & Power Banks',
    description: 'GaN fast wall chargers, high-capacity power banks, and durable cables.',
    iconName: 'Zap',
  },
];

export const MOCK_BRANDS: Brand[] = [
  { id: 'brand-samsung', slug: 'samsung', name: 'Samsung', countryOrigin: 'South Korea' },
  { id: 'brand-apple', slug: 'apple', name: 'Apple', countryOrigin: 'United States' },
  { id: 'brand-xiaomi', slug: 'xiaomi', name: 'Xiaomi', countryOrigin: 'China' },
  { id: 'brand-lenovo', slug: 'lenovo', name: 'Lenovo', countryOrigin: 'China' },
  { id: 'brand-sony', slug: 'sony', name: 'Sony', countryOrigin: 'Japan' },
  { id: 'brand-anker', slug: 'anker', name: 'Anker', countryOrigin: 'United States' },
  { id: 'brand-asus', slug: 'asus', name: 'Asus', countryOrigin: 'Taiwan' },
  { id: 'brand-logitech', slug: 'logitech', name: 'Logitech', countryOrigin: 'Switzerland' },
  { id: 'brand-oneplus', slug: 'oneplus', name: 'OnePlus', countryOrigin: 'China' },
];

export const MOCK_PRODUCTS: Product[] = [
  // 1. Smartphones
  {
    id: 'prod-samsung-s24',
    slug: 'samsung-galaxy-s24-fe-5g',
    name: 'Samsung Galaxy S24 FE 5G (8GB/256GB)',
    description:
      'Flagship Galaxy AI experience with 6.7-inch Dynamic AMOLED 2X 120Hz display, Exynos 2400e processor, and a pro-grade triple camera system.',
    category: MOCK_CATEGORIES[0],
    brand: MOCK_BRANDS[0],
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Display: '6.7-inch FHD+ Dynamic AMOLED 2X, 120Hz',
      Processor: 'Samsung Exynos 2400e (4nm)',
      RAM: '8GB LPDDR5X',
      Storage: '256GB UFS 4.0',
      Battery: '4,700 mAh with 25W fast charging',
      Camera: '50MP + 12MP Ultra-wide + 8MP 3x Telephoto',
    },
    price: 7850000, // ৳78,500
    compareAtPrice: 8499900, // ৳84,999
    stock: 14,
    isFeatured: true,
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'prod-apple-iphone-15',
    slug: 'apple-iphone-15-128gb',
    name: 'Apple iPhone 15 (128GB, Dynamic Island)',
    description:
      'Featuring Dynamic Island, 48MP Main camera with 2x Telephoto, durable color-infused back glass design, and universal USB-C connectivity.',
    category: MOCK_CATEGORIES[0],
    brand: MOCK_BRANDS[1],
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Display: '6.1-inch Super Retina XDR OLED',
      Processor: 'Apple A16 Bionic chip',
      RAM: '6GB',
      Storage: '128GB NVMe',
      Camera: '48MP Main + 12MP Ultra-wide',
      Connectivity: 'USB-C (USB 2.0), 5G, Wi-Fi 6',
    },
    price: 10200000, // ৳102,000
    compareAtPrice: 10800000,
    stock: 7,
    isFeatured: true,
    createdAt: '2025-01-10T08:00:00Z',
  },
  {
    id: 'prod-xiaomi-redmi-note-13-pro',
    slug: 'xiaomi-redmi-note-13-pro-plus-5g',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G (12GB/512GB)',
    description:
      'Curved 1.5K 120Hz CrystalRes AMOLED display, 200MP camera with OIS, 120W HyperCharge, and IP68 water and dust resistance.',
    category: MOCK_CATEGORIES[0],
    brand: MOCK_BRANDS[2],
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Display: '6.67-inch 1.5K Curved AMOLED, 120Hz, Dolby Vision',
      Processor: 'MediaTek Dimensity 7200-Ultra (4nm)',
      RAM: '12GB LPDDR5',
      Storage: '512GB UFS 3.1',
      Camera: '200MP Samsung ISOCELL HP3 with OIS',
      Battery: '5,000 mAh with 120W HyperCharge',
    },
    price: 4299900, // ৳42,999
    compareAtPrice: 4650000,
    stock: 22,
    isFeatured: true,
    createdAt: '2025-01-22T09:15:00Z',
  },
  {
    id: 'prod-oneplus-nord-ce4',
    slug: 'oneplus-nord-ce4-5g',
    name: 'OnePlus Nord CE4 5G (8GB/256GB)',
    description:
      'Snapdragon 7 Gen 3 processor, 100W SUPERVOOC charging with massive 5,500 mAh battery, and 120Hz Fluid AMOLED display.',
    category: MOCK_CATEGORIES[0],
    brand: MOCK_BRANDS[8],
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Display: '6.7-inch FHD+ 120Hz Fluid AMOLED',
      Processor: 'Qualcomm Snapdragon 7 Gen 3',
      RAM: '8GB LPDDR4X',
      Storage: '256GB UFS 3.1 (expandable up to 1TB)',
      Battery: '5,500 mAh with 100W fast charger included',
    },
    price: 3150000, // ৳31,500
    compareAtPrice: 3400000,
    stock: 0, // OUT OF STOCK
    isFeatured: false,
    createdAt: '2025-01-05T14:00:00Z',
  },
  {
    id: 'prod-samsung-galaxy-a55',
    slug: 'samsung-galaxy-a55-5g',
    name: 'Samsung Galaxy A55 5G (8GB/128GB)',
    description:
      'Premium metal frame, Gorilla Glass Victus+ front and back, Knox Vault security, and 4 years of OS upgrades.',
    category: MOCK_CATEGORIES[0],
    brand: MOCK_BRANDS[0],
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Display: '6.6-inch Super AMOLED, 120Hz, 1000 nits (HBM)',
      Processor: 'Samsung Exynos 1480 with AMD Xclipse GPU',
      RAM: '8GB',
      Storage: '128GB',
      Battery: '5,000 mAh with 25W charging',
    },
    price: 4999900, // ৳49,999
    compareAtPrice: 5350000,
    stock: 11,
    isFeatured: false,
    createdAt: '2025-01-08T12:00:00Z',
  },

  // 2. Laptops
  {
    id: 'prod-macbook-air-m3',
    slug: 'apple-macbook-air-13-m3',
    name: 'Apple MacBook Air 13-inch (M3 chip, 16GB/512GB)',
    description:
      'Strikingly thin and fast MacBook Air with Apple M3 chip, Liquid Retina display with True Tone, up to 18 hours of battery life, and MagSafe charging.',
    category: MOCK_CATEGORIES[1],
    brand: MOCK_BRANDS[1],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Processor: 'Apple M3 chip (8-core CPU, 10-core GPU)',
      Memory: '16GB Unified Memory',
      Storage: '512GB PCIe SSD',
      Display: '13.6-inch Liquid Retina with 500 nits brightness',
      Weight: '1.24 kg',
      Ports: 'MagSafe 3, 2x Thunderbolt / USB 4, 3.5mm headphone jack',
    },
    price: 14800000, // ৳148,000
    compareAtPrice: 15500000,
    stock: 8,
    isFeatured: true,
    createdAt: '2025-01-20T11:00:00Z',
  },
  {
    id: 'prod-lenovo-legion-pro-5',
    slug: 'lenovo-legion-pro-5-16irx9-i7-rtx4070',
    name: 'Lenovo Legion Pro 5 Gen 9 (Intel Core i7-14700HX, RTX 4070)',
    description:
      'High-performance gaming laptop with 16-inch WQXGA 240Hz 500 nits display, NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP), and ColdFront 5.0 thermals.',
    category: MOCK_CATEGORIES[1],
    brand: MOCK_BRANDS[3],
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Processor: 'Intel Core i7-14700HX (20 cores, 28 threads, up to 5.5GHz)',
      Graphics: 'NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP)',
      Display: '16.0-inch WQXGA (2560x1600) IPS, 240Hz, 100% sRGB',
      Memory: '32GB DDR5-5600MHz',
      Storage: '1TB M.2 PCIe Gen 4 NVMe SSD',
      Battery: '80Wh with 300W Slim Tip adapter',
    },
    price: 21500000, // ৳215,000
    compareAtPrice: 22800000,
    stock: 5,
    isFeatured: true,
    createdAt: '2025-01-28T12:00:00Z',
  },
  {
    id: 'prod-asus-zenbook-14',
    slug: 'asus-zenbook-14-oled-ux3405',
    name: 'Asus Zenbook 14 OLED UX3405 (Intel Core Ultra 7 155H)',
    description:
      'Sophisticated ultraportable with AI-accelerated Intel Core Ultra processor, 3K 120Hz ASUS Lumina OLED display, and all-day 75Wh battery.',
    category: MOCK_CATEGORIES[1],
    brand: MOCK_BRANDS[6],
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Processor: 'Intel Core Ultra 7 155H with Intel AI Boost NPU',
      Display: '14.0-inch 3K (2880x1800) OLED, 120Hz, 600 nits HDR',
      Memory: '16GB LPDDR5X on-board',
      Storage: '1TB PCIe 4.0 NVMe SSD',
      Weight: '1.28 kg with all-metal chassis',
    },
    price: 13800000, // ৳138,000
    compareAtPrice: 14500000,
    stock: 9,
    isFeatured: false,
    createdAt: '2025-01-18T10:00:00Z',
  },
  {
    id: 'prod-lenovo-ideapad-slim-3',
    slug: 'lenovo-ideapad-slim-3-15-core-i5',
    name: 'Lenovo IdeaPad Slim 3 15-inch (Intel Core i5-13420H, 16GB/512GB)',
    description:
      'Reliable daily productivity and study laptop with 15.6-inch FHD anti-glare display, military-grade MIL-STD-810H durability, and rapid charge.',
    category: MOCK_CATEGORIES[1],
    brand: MOCK_BRANDS[3],
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Processor: 'Intel Core i5-13420H (8 cores, up to 4.6GHz)',
      Memory: '16GB LPDDR5',
      Storage: '512GB M.2 PCIe NVMe SSD',
      Display: '15.6-inch FHD (1920x1080) IPS, 300 nits',
      Battery: '47Wh with 65W Round Tip adapter',
    },
    price: 5850000, // ৳58,500
    compareAtPrice: 6200000,
    stock: 16,
    isFeatured: false,
    createdAt: '2025-01-12T15:00:00Z',
  },
  {
    id: 'prod-apple-macbook-pro-14-m3pro',
    slug: 'apple-macbook-pro-14-m3-pro',
    name: 'Apple MacBook Pro 14-inch (M3 Pro chip, 18GB/512GB, Space Black)',
    description:
      'Pro performance powerhouse with Liquid Retina XDR display, up to 18 hours battery life, HDMI port, SDXC card slot, and Thunderbolt 4.',
    category: MOCK_CATEGORIES[1],
    brand: MOCK_BRANDS[1],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Processor: 'Apple M3 Pro (11-core CPU, 14-core GPU)',
      Memory: '18GB Unified Memory',
      Storage: '512GB SSD',
      Display: '14.2-inch Liquid Retina XDR (3024x1964), 120Hz ProMotion',
    },
    price: 24500000, // ৳245,000
    compareAtPrice: 25500000,
    stock: 0, // OUT OF STOCK
    isFeatured: false,
    createdAt: '2025-01-02T10:00:00Z',
  },

  // 3. Audio & Sound
  {
    id: 'prod-sony-wh1000xm5',
    slug: 'sony-wh-1000xm5-wireless-anc-headphones',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description:
      'Industry-leading active noise cancellation with two processors and 8 microphones, exceptional hands-free calling, and up to 30-hour battery life.',
    category: MOCK_CATEGORIES[2],
    brand: MOCK_BRANDS[4],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Type: 'Over-ear closed dynamic',
      NoiseCancelling: 'Dual Processor Integrated V1 + HD QN1',
      BatteryLife: 'Up to 30 hours (ANC on)',
      Connectivity: 'Bluetooth 5.2, multipoint pairing, 3.5mm jack',
      Codecs: 'LDAC, AAC, SBC',
      Weight: '250 grams',
    },
    price: 3650000, // ৳36,500
    compareAtPrice: 4100000,
    stock: 19,
    isFeatured: true,
    createdAt: '2025-01-18T14:30:00Z',
  },
  {
    id: 'prod-apple-airpods-pro-2',
    slug: 'apple-airpods-pro-2-usb-c',
    name: 'Apple AirPods Pro (2nd Generation, MagSafe Case USB-C)',
    description:
      'Up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking.',
    category: MOCK_CATEGORIES[2],
    brand: MOCK_BRANDS[1],
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Chip: 'Apple H2 headphone chip in earbuds, U1 in case',
      NoiseControl: 'Active Noise Cancellation, Adaptive Audio, Transparency',
      BatteryLife: 'Up to 6 hours listening (up to 30 with case)',
      Case: 'MagSafe (USB-C) with speaker and lanyard loop, IP54 rated',
    },
    price: 2950000, // ৳29,500
    compareAtPrice: 3200000,
    stock: 15,
    isFeatured: false,
    createdAt: '2025-01-16T12:00:00Z',
  },
  {
    id: 'prod-sony-wf-c700n',
    slug: 'sony-wf-c700n-tws-anc-earbuds',
    name: 'Sony WF-C700N Truly Wireless Noise Cancelling Earbuds',
    description:
      'Lightweight, ergonomic earbuds with digital noise cancelling, Ambient Sound mode, multipoint Bluetooth connection, and IPX4 splash resistance.',
    category: MOCK_CATEGORIES[2],
    brand: MOCK_BRANDS[4],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      DriverUnit: '5mm high-compliance diaphragm',
      BatteryLife: 'Up to 7.5 hours (ANC on) + 7.5 hours from case',
      WaterResistance: 'IPX4 equivalent',
      Weight: '4.6g per bud',
    },
    price: 1150000, // ৳11,500
    compareAtPrice: 1300000,
    stock: 25,
    isFeatured: false,
    createdAt: '2025-01-14T09:00:00Z',
  },
  {
    id: 'prod-anker-soundcore-motion-plus',
    slug: 'anker-soundcore-motion-plus-speaker',
    name: 'Anker Soundcore Motion+ Hi-Res 30W Bluetooth Speaker',
    description:
      'Hi-Res Audio with Qualcomm aptX, ultra-wide frequency range (50Hz to 40kHz), titanium dome tweeters, and IPX7 waterproof protection.',
    category: MOCK_CATEGORIES[2],
    brand: MOCK_BRANDS[5],
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Output: '30W (2x Neodymium woofers + 2x titanium tweeters)',
      AudioCertification: 'Hi-Res Audio certified',
      BatteryLife: 'Up to 12 hours continuous playtime',
      Waterproof: 'IPX7 certified',
    },
    price: 980000, // ৳9,800
    compareAtPrice: 1100000,
    stock: 18,
    isFeatured: true,
    createdAt: '2025-01-21T16:00:00Z',
  },
  {
    id: 'prod-redmi-buds-5-pro',
    slug: 'xiaomi-redmi-buds-5-pro',
    name: 'Xiaomi Redmi Buds 5 Pro (52dB ANC, LDAC)',
    description:
      'Ultra-deep 52dB active noise cancellation with 4kHz ultra-wide frequency band, dual coaxial drivers, and up to 38 hours total battery life.',
    category: MOCK_CATEGORIES[2],
    brand: MOCK_BRANDS[2],
    images: [
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      NoiseCancellation: '52dB Active Noise Cancellation with AI ambient modes',
      Codecs: 'LHDC 5.0, LDAC, AAC, SBC',
      BatteryLife: 'Up to 10 hours single charge (38 hours with case)',
    },
    price: 720000, // ৳7,200
    compareAtPrice: 799900,
    stock: 0, // OUT OF STOCK
    isFeatured: false,
    createdAt: '2025-01-04T11:00:00Z',
  },

  // 4. Smartwatches
  {
    id: 'prod-apple-watch-series-9',
    slug: 'apple-watch-series-9-gps-45mm',
    name: 'Apple Watch Series 9 GPS 45mm (Midnight Aluminum)',
    description:
      'Powered by S9 SiP chip enabling double tap gesture, brighter 2000 nits edge-to-edge Retina display, and on-device Siri health query.',
    category: MOCK_CATEGORIES[3],
    brand: MOCK_BRANDS[1],
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Display: 'Always-On Retina LTPO OLED, up to 2000 nits',
      Processor: 'Apple S9 SiP 64-bit dual core',
      Sensors: 'Blood Oxygen, ECG, Temperature sensing, Fall Detection',
      WaterResistance: '50m water resistant (WR50)',
    },
    price: 4850000, // ৳48,500
    compareAtPrice: 5200000,
    stock: 6,
    isFeatured: true,
    createdAt: '2025-01-19T13:00:00Z',
  },
  {
    id: 'prod-samsung-galaxy-watch6',
    slug: 'samsung-galaxy-watch6-classic-47mm',
    name: 'Samsung Galaxy Watch6 Classic 47mm (Rotating Bezel, Bluetooth)',
    description:
      'Signature rotating bezel with sapphire crystal glass, advanced sleep coaching, body composition analysis (BIA), and ECG monitoring.',
    category: MOCK_CATEGORIES[3],
    brand: MOCK_BRANDS[0],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Display: '1.5-inch Super AMOLED (480x480), Sapphire Crystal',
      OS: 'Wear OS Powered by Samsung (One UI 5 Watch)',
      Battery: '425 mAh with WPC-based wireless fast charging',
      Durability: '5ATM + IP68 / MIL-STD-810H',
    },
    price: 3400000, // ৳34,000
    compareAtPrice: 3800000,
    stock: 12,
    isFeatured: false,
    createdAt: '2025-01-17T15:00:00Z',
  },
  {
    id: 'prod-xiaomi-smart-band-8-pro',
    slug: 'xiaomi-smart-band-8-pro',
    name: 'Xiaomi Smart Band 8 Pro (1.74-inch AMOLED, Built-in GPS)',
    description:
      'Large 1.74-inch rectangular AMOLED display with 60Hz refresh rate, independent GNSS satellite positioning, and up to 14-day battery life.',
    category: MOCK_CATEGORIES[3],
    brand: MOCK_BRANDS[2],
    images: [
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Display: '1.74-inch AMOLED, 336x480 resolution, 60Hz, 600 nits',
      GPS: 'Built-in 5-satellite GNSS (GPS, GLONASS, Galileo, QZSS, BeiDou)',
      BatteryLife: 'Up to 14 days normal usage',
      WaterResistance: '5ATM water resistant',
    },
    price: 780000, // ৳7,800
    compareAtPrice: 850000,
    stock: 30,
    isFeatured: true,
    createdAt: '2025-01-23T10:00:00Z',
  },
  {
    id: 'prod-oneplus-watch-2',
    slug: 'oneplus-watch-2-wear-os-dual-engine',
    name: 'OnePlus Watch 2 (Dual-Engine Architecture, Wear OS 4)',
    description:
      'Unique dual chipset architecture pairing Snapdragon W5 and BES2700 for up to 100 hours of battery life in full Smart Mode.',
    category: MOCK_CATEGORIES[3],
    brand: MOCK_BRANDS[8],
    images: [
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Processor: 'Snapdragon W5 Gen 1 + BES2700 MCU',
      OS: 'Wear OS 4 by Google',
      Display: '1.43-inch AMOLED, 466x466, 2.5D Sapphire Crystal',
      BatteryLife: 'Up to 100 hours in Smart Mode (12 days in Power Saver)',
    },
    price: 2650000, // ৳26,500
    compareAtPrice: 2890000,
    stock: 8,
    isFeatured: false,
    createdAt: '2025-01-11T12:00:00Z',
  },

  // 5. Gaming Accessories
  {
    id: 'prod-logitech-g-pro-x-superlight-2',
    slug: 'logitech-g-pro-x-superlight-2-wireless-mouse',
    name: 'Logitech G PRO X SUPERLIGHT 2 Wireless Gaming Mouse',
    description:
      'The icon of championship esports, weighing only 60g with LIGHTFORCE hybrid switches, HERO 2 sensor with 32,000 DPI, and 2000Hz polling rate.',
    category: MOCK_CATEGORIES[4],
    brand: MOCK_BRANDS[7],
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Sensor: 'HERO 2 (100 – 32,000 DPI, >500 IPS, 40G)',
      Switches: 'LIGHTFORCE Optical-Mechanical Hybrid Switches',
      PollingRate: '2000Hz (0.5 ms report rate)',
      Weight: '60 grams ultra-lightweight',
      BatteryLife: 'Up to 95 hours constant motion',
    },
    price: 1650000, // ৳16,500
    compareAtPrice: 1800000,
    stock: 14,
    isFeatured: true,
    createdAt: '2025-01-24T14:00:00Z',
  },
  {
    id: 'prod-asus-rog-strix-scope-ii',
    slug: 'asus-rog-strix-scope-ii-96-wireless-keyboard',
    name: 'ASUS ROG Strix Scope II 96 Wireless Mechanical Keyboard',
    description:
      'Efficient 96% layout retaining all function and number keys with pre-lubed ROG NX Snow linear switches, dampening foam, and tri-mode connectivity.',
    category: MOCK_CATEGORIES[4],
    brand: MOCK_BRANDS[6],
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Layout: '96% compact full-size',
      Switches: 'Pre-lubed ROG NX Snow mechanical linear switches (hot-swappable)',
      Connectivity: 'Bluetooth 5.1, 2.4GHz RF ROG SpeedNova, USB wired',
      BatteryLife: 'Up to 1,500+ hours (lights off)',
    },
    price: 1820000, // ৳18,200
    compareAtPrice: 2000000,
    stock: 10,
    isFeatured: false,
    createdAt: '2025-01-13T17:00:00Z',
  },
  {
    id: 'prod-sony-inzone-h9',
    slug: 'sony-inzone-h9-wireless-gaming-headset',
    name: 'Sony INZONE H9 Wireless Noise Cancelling Gaming Headset',
    description:
      '360 Spatial Sound for Gaming, dual sensor noise cancelling inherited from 1000X series, boom microphone with flip-to-mute, and 32-hour battery.',
    category: MOCK_CATEGORIES[4],
    brand: MOCK_BRANDS[4],
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      SpatialAudio: '360 Spatial Sound for Gaming with PC software personalization',
      NoiseCancellation: 'Active Noise Cancelling + Ambient Sound Mode',
      Wireless: 'Simultaneous 2.4GHz USB transceiver and Bluetooth',
      BatteryLife: 'Up to 32 hours (ANC off)',
    },
    price: 2800000, // ৳28,000
    compareAtPrice: 3100000,
    stock: 7,
    isFeatured: false,
    createdAt: '2025-01-09T18:00:00Z',
  },
  {
    id: 'prod-logitech-g502-hero',
    slug: 'logitech-g502-hero-wired-mouse',
    name: 'Logitech G502 HERO High Performance Wired Gaming Mouse',
    description:
      'Classic gamer favorite featuring HERO 25K sensor, 11 programmable buttons, customizable weight tuning system, and dual-mode hyper-fast scroll wheel.',
    category: MOCK_CATEGORIES[4],
    brand: MOCK_BRANDS[7],
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Sensor: 'HERO 25K (100 – 25,600 DPI)',
      Buttons: '11 fully programmable buttons via G HUB',
      WeightTuning: 'Five 3.6g removable weights',
      Lighting: 'LIGHTSYNC RGB 1-zone',
    },
    price: 540000, // ৳5,400
    compareAtPrice: 590000,
    stock: 0, // OUT OF STOCK
    isFeatured: false,
    createdAt: '2025-01-01T10:00:00Z',
  },

  // 6. Chargers & Power Banks
  {
    id: 'prod-anker-prime-20000',
    slug: 'anker-prime-20000mah-200w-powerbank',
    name: 'Anker Prime 20,000mAh Power Bank (200W Output)',
    description:
      'Ultra-compact power bank with 200W total output, smart digital display showing battery health & charging speeds, and multi-device fast charging.',
    category: MOCK_CATEGORIES[5],
    brand: MOCK_BRANDS[5],
    images: [
      'https://images.unsplash.com/photo-1609592807909-5484860b07b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Capacity: '20,000 mAh (72Wh)',
      Output: '2x USB-C (100W max each), 1x USB-A (65W max), 200W total',
      Display: 'Smart digital TFT color screen',
      RechargeSpeed: '100W USB-C input (fully charged in 75 mins)',
      Weight: '540 grams',
    },
    price: 1350000, // ৳13,500
    compareAtPrice: 1500000,
    stock: 11,
    isFeatured: true,
    createdAt: '2025-01-25T16:00:00Z',
  },
  {
    id: 'prod-anker-nano-ii-65w',
    slug: 'anker-nano-ii-65w-gan-fast-charger',
    name: 'Anker Nano II 65W GaN II Ultra-Compact Fast Wall Charger',
    description:
      'Replace bulky chargers with a single compact adapter capable of charging a phone, tablet, and USB-C laptop at full 65W speed using GaN II tech.',
    category: MOCK_CATEGORIES[5],
    brand: MOCK_BRANDS[5],
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Technology: 'Anker GaN II (Gallium Nitride)',
      Output: 'Single USB-C port: 5V=3A / 9V=3A / 15V=3A / 20V=3.25A (65W Max)',
      Compatibility: 'MacBook Air/Pro, Dell XPS, iPhone, Galaxy, iPad',
      Size: '58% smaller than original 61W USB-C charger',
    },
    price: 380000, // ৳3,800
    compareAtPrice: 420000,
    stock: 45,
    isFeatured: true,
    createdAt: '2025-01-26T11:00:00Z',
  },
  {
    id: 'prod-samsung-45w-adapter',
    slug: 'samsung-45w-power-adapter-type-c',
    name: 'Samsung 45W Power Adapter with 5A USB-C to USB-C Cable',
    description:
      'Official Samsung Super Fast Charging 2.0 adapter compatible with Galaxy S24 Ultra, S24+, Note series, and Galaxy Book laptops.',
    category: MOCK_CATEGORIES[5],
    brand: MOCK_BRANDS[0],
    images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Standard: 'Power Delivery (PD) 3.0 PPS up to 45W',
      IncludedCable: 'Original 5A 1.8-meter braided Type-C cable',
      Safety: 'Over-current, short-circuit, and high-temp protection',
    },
    price: 290000, // ৳2,900
    compareAtPrice: 320000,
    stock: 35,
    isFeatured: false,
    createdAt: '2025-01-20T10:00:00Z',
  },
  {
    id: 'prod-apple-20w-adapter',
    slug: 'apple-20w-usb-c-power-adapter',
    name: 'Apple 20W USB-C Power Adapter',
    description:
      'Fast, efficient charging at home, in the office, or on the go. Pairs with iPhone 15/14/13/12 for fast charging up to 50% battery in 30 minutes.',
    category: MOCK_CATEGORIES[5],
    brand: MOCK_BRANDS[1],
    images: [
      'https://images.unsplash.com/photo-1622445268065-2565615822f3?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Output: '20W USB-C Power Delivery',
      Compatibility: 'All iPhone, iPad, Apple Watch, and AirPods models',
      Input: '100-240V ~ 50/60Hz 0.5A',
    },
    price: 270000, // ৳2,700
    compareAtPrice: 299000,
    stock: 50,
    isFeatured: false,
    createdAt: '2025-01-22T14:00:00Z',
  },
];
