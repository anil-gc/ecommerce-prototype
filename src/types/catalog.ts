/**
 * Product, Category, Brand, and Catalog Query Type Definitions.
 * All monetary values (price, compareAtPrice) are stored as integer poisha (1 BDT = 100 poisha).
 */

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  iconName?: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  countryOrigin?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: Category;
  brand: Brand;
  images: string[];
  specifications: Record<string, string>;
  /** Price in integer poisha (e.g., 2500000 = ৳25,000) */
  price: number;
  /** Optional original price in integer poisha for showing discounts */
  compareAtPrice?: number;
  /** Available inventory count in mock store */
  stock: number;
  /** Highlighted for homepage or promotional display */
  isFeatured: boolean;
  createdAt?: string;
}

export type ProductSortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'newest';

export interface ProductQueryParams {
  query?: string;
  categorySlug?: string;
  brandSlug?: string;
  minPricePoisha?: number;
  maxPricePoisha?: number;
  inStockOnly?: boolean;
  featuredOnly?: boolean;
  sortBy?: ProductSortOption;
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
