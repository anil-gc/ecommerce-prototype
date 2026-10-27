import type { Brand, Category, Product } from '@/types/catalog';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-smartphones',
    slug: 'smartphones',
    name: 'Smartphones',
    description: 'Latest flagship and budget smartphones with official local warranty support.',
    iconName: 'Smartphone',
  },
  {
    id: 'cat-laptops',
    slug: 'laptops',
    name: 'Laptops',
    description: 'Productivity ultrabooks, student laptops, and powerful creator workstations.',
    iconName: 'Laptop',
  },
  {
    id: 'cat-audio',
    slug: 'audio',
    name: 'Audio & Sound',
    description: 'Active noise-cancelling headphones, wireless earbuds, and Bluetooth speakers.',
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
    description: 'GaN fast wall chargers, high-capacity power banks, and durable braided cables.',
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
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-samsung-s24',
    slug: 'samsung-galaxy-s24-fe-5g',
    name: 'Samsung Galaxy S24 FE 5G (8GB/256GB)',
    description:
      'Flagship Galaxy AI experience with 6.7-inch Dynamic AMOLED 2X 120Hz display, Exynos 2400e processor, and a triple camera system with 50MP main sensor.',
    category: MOCK_CATEGORIES[0],
    brand: MOCK_BRANDS[0],
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Display: '6.7-inch FHD+ Dynamic AMOLED 2X, 120Hz',
      Processor: 'Samsung Exynos 2400e (4nm)',
      RAM: '8GB LPDDR5X',
      Storage: '256GB UFS 4.0',
      Battery: '4,700 mAh with 25W fast charging',
      Camera: '50MP + 12MP Ultra-wide + 8MP 3x Telephoto',
    },
    // ৳78,500 = 7,850,000 poisha
    price: 7850000,
    // ৳84,999 = 8,499,900 poisha
    compareAtPrice: 8499900,
    stock: 14,
    isFeatured: true,
    createdAt: '2025-01-15T10:00:00Z',
  },
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
    ],
    specifications: {
      Processor: 'Apple M3 chip (8-core CPU, 10-core GPU)',
      Memory: '16GB Unified Memory',
      Storage: '512GB PCIe SSD',
      Display: '13.6-inch Liquid Retina with 500 nits brightness',
      Weight: '1.24 kg',
      Ports: 'MagSafe 3, 2x Thunderbolt / USB 4, 3.5mm headphone jack',
    },
    // ৳148,000 = 14,800,000 poisha
    price: 14800000,
    compareAtPrice: 15500000,
    stock: 8,
    isFeatured: true,
    createdAt: '2025-01-20T11:00:00Z',
  },
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
    ],
    specifications: {
      Type: 'Over-ear closed dynamic',
      NoiseCancelling: 'Dual Processor Integrated V1 + HD QN1',
      BatteryLife: 'Up to 30 hours (ANC on)',
      Connectivity: 'Bluetooth 5.2, multipoint pairing, 3.5mm jack',
      Codecs: 'LDAC, AAC, SBC',
      Weight: '250 grams',
    },
    // ৳36,500 = 3,650,000 poisha
    price: 3650000,
    compareAtPrice: 4100000,
    stock: 19,
    isFeatured: true,
    createdAt: '2025-01-18T14:30:00Z',
  },
  {
    id: 'prod-redmi-note-13-pro',
    slug: 'xiaomi-redmi-note-13-pro-plus-5g',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G (12GB/512GB)',
    description:
      'Curved 1.5K 120Hz CrystalRes AMOLED display, 200MP camera with OIS, 120W HyperCharge, and IP68 water and dust resistance.',
    category: MOCK_CATEGORIES[0],
    brand: MOCK_BRANDS[2],
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Display: '6.67-inch 1.5K Curved AMOLED, 120Hz, Dolby Vision',
      Processor: 'MediaTek Dimensity 7200-Ultra (4nm)',
      Camera: '200MP Samsung ISOCELL HP3 with OIS',
      Battery: '5,000 mAh with 120W HyperCharge (0-100% in 19 mins)',
      Protection: 'Corning Gorilla Glass Victus, IP68 rated',
    },
    // ৳42,999 = 4,299,900 poisha
    price: 4299900,
    compareAtPrice: 4650000,
    stock: 22,
    isFeatured: true,
    createdAt: '2025-01-22T09:15:00Z',
  },
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
    ],
    specifications: {
      Capacity: '20,000 mAh (72Wh)',
      Output: '2x USB-C (100W max each), 1x USB-A (65W max), 200W total',
      Display: 'Smart digital TFT color screen',
      RechargeSpeed: '100W USB-C input (fully charged in 75 mins)',
      Weight: '540 grams',
    },
    // ৳13,500 = 1,350,000 poisha
    price: 1350000,
    compareAtPrice: 1500000,
    stock: 11,
    isFeatured: true,
    createdAt: '2025-01-25T16:00:00Z',
  },
  {
    id: 'prod-lenovo-legion-pro-5',
    slug: 'lenovo-legion-pro-5-16irx9-i7-rtx4070',
    name: 'Lenovo Legion Pro 5 Gen 9 (Intel Core i7-14700HX, RTX 4070)',
    description:
      'High-performance gaming laptop with 16-inch WQXGA 240Hz 500 nits display, NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP), and Legion ColdFront 5.0 thermals.',
    category: MOCK_CATEGORIES[1],
    brand: MOCK_BRANDS[3],
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      Processor: 'Intel Core i7-14700HX (20 cores, 28 threads, up to 5.5GHz)',
      Graphics: 'NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP)',
      Display: '16.0-inch WQXGA (2560x1600) IPS, 240Hz, 100% sRGB',
      Memory: '32GB DDR5-5600MHz',
      Storage: '1TB M.2 PCIe Gen 4 NVMe SSD',
      Battery: '80Wh with 300W Slim Tip adapter',
    },
    // ৳215,000 = 21,500,000 poisha
    price: 21500000,
    compareAtPrice: 22800000,
    stock: 5,
    isFeatured: true,
    createdAt: '2025-01-28T12:00:00Z',
  },
];
