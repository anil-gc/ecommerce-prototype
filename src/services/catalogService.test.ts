import { describe, it, expect } from 'vitest';
import { MockCatalogService } from './mockCatalogService';

describe('Catalog Service Interface & Mock Implementation', () => {
  // Use zero latency for immediate test execution
  const service = new MockCatalogService(0);

  it('retrieves categories correctly', async () => {
    const categories = await service.getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]).toHaveProperty('slug');
    expect(categories[0]).toHaveProperty('name');
  });

  it('retrieves brands correctly', async () => {
    const brands = await service.getBrands();
    expect(brands.length).toBeGreaterThan(0);
    expect(brands.some((b) => b.slug === 'samsung')).toBe(true);
  });

  it('retrieves featured products', async () => {
    const featured = await service.getFeaturedProducts(3);
    expect(featured.length).toBeLessThanOrEqual(3);
    expect(featured.every((p) => p.isFeatured)).toBe(true);
  });

  it('retrieves product by slug', async () => {
    const product = await service.getProductBySlug('samsung-galaxy-s24-fe-5g');
    expect(product).not.toBeNull();
    expect(product?.name).toContain('Samsung Galaxy S24 FE');
    expect(product?.price).toBeGreaterThan(0);
  });

  it('returns null for nonexistent slug', async () => {
    const product = await service.getProductBySlug('nonexistent-gadget-xyz');
    expect(product).toBeNull();
  });

  it('filters products by category slug', async () => {
    const result = await service.getProducts({ categorySlug: 'smartphones' });
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((p) => p.category.slug === 'smartphones')).toBe(true);
  });

  it('filters products by search query', async () => {
    const result = await service.getProducts({ query: 'MacBook' });
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items[0].name.toLowerCase()).toContain('macbook');
  });

  it('handles pagination bounds properly', async () => {
    const result = await service.getProducts({ page: 1, limit: 2 });
    expect(result.items.length).toBe(2);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(2);
    expect(result.totalPages).toBeGreaterThanOrEqual(1);
  });
});
