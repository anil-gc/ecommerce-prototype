import type {
  Brand,
  Category,
  PaginatedProducts,
  Product,
  ProductQueryParams,
} from '@/types/catalog';
import { MockCatalogService } from './mockCatalogService';

/**
 * Catalog Service Interface
 * Abstracts catalog data operations, allowing interchangeable mock or API adapters.
 * Page components MUST use this service (or TanStack Query hooks consuming it)
 * and never import fixture files directly.
 */
export interface CatalogService {
  /**
   * Retrieves paginated products matching optional filter, search, and sorting criteria.
   */
  getProducts(params?: ProductQueryParams): Promise<PaginatedProducts>;

  /**
   * Retrieves a single product by its unique URL slug.
   */
  getProductBySlug(slug: string): Promise<Product | null>;

  /**
   * Retrieves a single product by its unique ID.
   */
  getProductById(id: string): Promise<Product | null>;

  /**
   * Retrieves featured products for showcase sections.
   */
  getFeaturedProducts(limit?: number): Promise<Product[]>;

  /**
   * Retrieves recently added products for new arrival showcases.
   */
  getNewArrivals(limit?: number): Promise<Product[]>;

  /**
   * Retrieves products with valid promotional discounts for sample offers.
   */
  getOffers(limit?: number): Promise<Product[]>;

  /**
   * Retrieves related products for a product detail view based on category or brand.
   */
  getRelatedProducts(productId: string, limit?: number): Promise<Product[]>;

  /**
   * Retrieves all product categories.
   */
  getCategories(): Promise<Category[]>;

  /**
   * Retrieves a single category by its slug.
   */
  getCategoryBySlug(slug: string): Promise<Category | null>;

  /**
   * Retrieves all product brands.
   */
  getBrands(): Promise<Brand[]>;
}

/**
 * Singleton instance of the catalog service.
 * In Phase 1 & 2 this uses MockCatalogService. In Phase 5, an API adapter can be swapped here.
 */
export const catalogService: CatalogService = new MockCatalogService();
