import { MOCK_BRANDS, MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/mock/fixtures';
import type {
  Brand,
  Category,
  PaginatedProducts,
  Product,
  ProductQueryParams,
} from '@/types/catalog';
import type { CatalogService } from './catalogService';

function getDevOverrides(): { latency?: number; forceError?: boolean } {
  if (typeof window === 'undefined') return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const devDelay = params.get('dev_delay');
    const devError = params.get('dev_error');
    return {
      latency: devDelay ? Math.max(0, parseInt(devDelay, 10)) : undefined,
      forceError: devError === 'true' || devError === '1',
    };
  } catch {
    return {};
  }
}

export class MockCatalogService implements CatalogService {
  private products: Product[] = [...MOCK_PRODUCTS];
  private categories: Category[] = [...MOCK_CATEGORIES];
  private brands: Brand[] = [...MOCK_BRANDS];
  private simulatedLatencyMs: number;

  constructor(simulatedLatencyMs = 120) {
    this.simulatedLatencyMs = simulatedLatencyMs;
  }

  private async delay(): Promise<void> {
    const dev = getDevOverrides();
    if (dev.forceError) {
      throw new Error(
        'Simulated catalog network error (triggered via dev_error URL parameter). Click retry to test recovery.',
      );
    }
    const ms = dev.latency ?? this.simulatedLatencyMs;
    if (ms <= 0) return;
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getProducts(params?: ProductQueryParams): Promise<PaginatedProducts> {
    await this.delay();

    let filtered = [...this.products];

    // Search query matching against name, description, brand, or category
    if (params?.query) {
      const q = params.query.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.name.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q),
      );
    }

    // Category filter
    if (params?.categorySlug) {
      filtered = filtered.filter((p) => p.category.slug === params.categorySlug);
    }

    // Brand filter
    if (params?.brandSlug) {
      filtered = filtered.filter((p) => p.brand.slug === params.brandSlug);
    }

    // Min price filter (in integer poisha)
    if (typeof params?.minPricePoisha === 'number') {
      filtered = filtered.filter((p) => p.price >= params.minPricePoisha!);
    }

    // Max price filter (in integer poisha)
    if (typeof params?.maxPricePoisha === 'number') {
      filtered = filtered.filter((p) => p.price <= params.maxPricePoisha!);
    }

    // In-stock only filter
    if (params?.inStockOnly) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    // Featured only filter
    if (params?.featuredOnly) {
      filtered = filtered.filter((p) => p.isFeatured);
    }

    // Sorting
    switch (params?.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.stock - a.stock;
        });
        break;
    }

    const page = Math.max(1, params?.page ?? 1);
    const pageSize = Math.max(1, params?.limit ?? 12);
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const startIndex = (page - 1) * pageSize;
    const items = filtered.slice(startIndex, startIndex + pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    await this.delay();
    const product = this.products.find((p) => p.slug === slug);
    return product ? { ...product } : null;
  }

  async getProductById(id: string): Promise<Product | null> {
    await this.delay();
    const product = this.products.find((p) => p.id === id);
    return product ? { ...product } : null;
  }

  async getFeaturedProducts(limit = 6): Promise<Product[]> {
    await this.delay();
    return this.products
      .filter((p) => p.isFeatured)
      .slice(0, limit)
      .map((p) => ({ ...p }));
  }

  async getNewArrivals(limit = 6): Promise<Product[]> {
    await this.delay();
    return [...this.products]
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit)
      .map((p) => ({ ...p }));
  }

  async getOffers(limit = 6): Promise<Product[]> {
    await this.delay();
    return this.products
      .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
      .sort((a, b) => {
        const discountA = (a.compareAtPrice! - a.price) / a.compareAtPrice!;
        const discountB = (b.compareAtPrice! - b.price) / b.compareAtPrice!;
        return discountB - discountA;
      })
      .slice(0, limit)
      .map((p) => ({ ...p }));
  }

  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    await this.delay();
    const target = this.products.find((p) => p.id === productId);
    if (!target) return [];

    const related = this.products.filter(
      (p) =>
        p.id !== productId &&
        (p.category.slug === target.category.slug || p.brand.slug === target.brand.slug),
    );

    return related.slice(0, limit).map((p) => ({ ...p }));
  }

  async getCategories(): Promise<Category[]> {
    await this.delay();
    return this.categories.map((c) => ({ ...c }));
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    await this.delay();
    const category = this.categories.find((c) => c.slug === slug);
    return category ? { ...category } : null;
  }

  async getBrands(): Promise<Brand[]> {
    await this.delay();
    return this.brands.map((b) => ({ ...b }));
  }
}
