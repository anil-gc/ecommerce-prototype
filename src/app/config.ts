/**
 * Centralized Site and Brand Configuration
 * Editable placeholder brand, contact information, navigation, and regional settings.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  locale: string;
  currency: {
    code: string;
    symbol: string;
    subunit: string;
    poishaPerTaka: number;
  };
  contact: {
    phone: string;
    email: string;
    supportHours: string;
    address: string;
  };
  demoNotice: string;
  navItems: NavItem[];
  footerNav: {
    shop: NavItem[];
    info: NavItem[];
  };
  delivery: {
    insideDhakaPoisha: number;
    outsideDhakaPoisha: number;
  };
}

export const siteConfig: SiteConfig = {
  name: 'GadgetBazar',
  tagline: 'Authentic Tech & Gadgets in Bangladesh',
  description:
    'Modern tech gadgets, smartphones, laptops, audio gear, and gaming accessories with transparent BDT pricing across Bangladesh.',
  locale: 'en-BD',
  currency: {
    code: 'BDT',
    symbol: '৳',
    subunit: 'Poisha',
    poishaPerTaka: 100,
  },
  contact: {
    phone: '+880 1700-000000',
    email: 'support@gadgetbazar.example.com',
    supportHours: 'Sat - Thu: 10:00 AM - 8:00 PM (BST)',
    address: 'Gulshan-1, Dhaka-1212, Bangladesh',
  },
  demoNotice:
    'Frontend demo — sample products and prices in BDT. No real orders or transactions.',
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'All Products', href: '/shop' },
    { label: 'Smartphones', href: '/category/smartphones' },
    { label: 'Laptops', href: '/category/laptops' },
    { label: 'Audio', href: '/category/audio' },
    { label: 'Smartwatches', href: '/category/smartwatches' },
  ],
  footerNav: {
    shop: [
      { label: 'All Products', href: '/shop' },
      { label: 'Smartphones', href: '/category/smartphones' },
      { label: 'Laptops', href: '/category/laptops' },
      { label: 'Audio & Sound', href: '/category/audio' },
      { label: 'Smartwatches', href: '/category/smartwatches' },
      { label: 'Gaming Accessories', href: '/category/gaming-accessories' },
      { label: 'Chargers & Power Banks', href: '/category/chargers-powerbanks' },
    ],
    info: [
      { label: 'Store Overview', href: '/' },
      { label: 'Product Catalog', href: '/shop' },
      { label: 'Shopping Cart', href: '/cart' },
    ],
  },
  delivery: {
    insideDhakaPoisha: 6000, // ৳60
    outsideDhakaPoisha: 12000, // ৳120
  },
};
