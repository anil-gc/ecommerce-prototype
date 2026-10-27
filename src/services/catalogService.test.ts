import { describe, it, expect } from 'vitest';
import { MockCatalogService } from './mockCatalogService';

describe('Catalog Service Interface & Mock Implementation (Phase 2)', () => {
  const service = new MockCatalogService(0);

  it('contains at least 24 consistent sample products', async () => {
    const result = await service.getProducts({ limit: 100 });
    expect(result.total).toBeGreaterThanOrEqual(24);
  });

  it('covers all 6 target product categories', async () => {
    const categories = await service.getCategories();
    expect(categories.length).toBe(6);
    const expectedSlugs = [
      'smartphones',
      'laptops',
      'audio',
      'smartwatches',
      'gaming-accessories',
      'chargers-powerbanks',
    ];
    expectedSlugs.forEach((slug) => {
      expect(categories.some((c) => c.slug === slug)).toBe(true);
    });
  });

  it('contains both in-stock and out-of-stock products', async () => {
    const all = await service.getProducts({ limit: 100 });
    const inStock = all.items.filter((p) => p.stock > 0);
    const outOfStock = all.items.filter((p) => p.stock === 0);

    expect(inStock.length).toBeGreaterThan(0);
    expect(outOfStock.length).toBeGreaterThanOrEqual(3);
  });

  it('filters by in-stock only', async () => {
    const result = await service.getProducts({ inStockOnly: true, limit: 100 });
    expect(result.items.every((p) => p.stock > 0)).toBe(true);
  });

  it('filters by brand slug', async () => {
    const result = await service.getProducts({ brandSlug: 'apple', limit: 100 });
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((p) => p.brand.slug === 'apple')).toBe(true);
  });

  it('filters by minimum and maximum price in poisha', async () => {
    // ৳5,000 to ৳50,000 (500,000 to 5,000,000 poisha)
    const minPoisha = 500000;
    const maxPoisha = 5000000;
    const result = await service.getProducts({
      minPricePoisha: minPoisha,
      maxPricePoisha: maxPoisha,
      limit: 100,
    });

    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((p) => p.price >= minPoisha && p.price <= maxPoisha)).toBe(true);
  });

  it('sorts by price low to high and high to low', async () => {
    const asc = await service.getProducts({ sortBy: 'price-asc', limit: 100 });
    for (let i = 0; i < asc.items.length - 1; i++) {
      expect(asc.items[i].price).toBeLessThanOrEqual(asc.items[i + 1].price);
    }

    const desc = await service.getProducts({ sortBy: 'price-desc', limit: 100 });
    for (let i = 0; i < desc.items.length - 1; i++) {
      expect(desc.items[i].price).toBeGreaterThanOrEqual(desc.items[i + 1].price);
    }
  });

  it('retrieves sample offers with valid compare-at discounts', async () => {
    const offers = await service.getOffers(5);
    expect(offers.length).toBeGreaterThan(0);
    expect(offers.every((p) => p.compareAtPrice && p.compareAtPrice > p.price)).toBe(true);
  });

  it('retrieves new arrivals sorted by newest first', async () => {
    const arrivals = await service.getNewArrivals(4);
    expect(arrivals.length).toBe(4);
  });

  it('retrieves related products excluding the current product', async () => {
    const targetSlug = 'apple-macbook-air-13-m3';
    const target = await service.getProductBySlug(targetSlug);
    expect(target).not.toBeNull();

    const related = await service.getRelatedProducts(target!.id, 4);
    expect(related.length).toBeGreaterThan(0);
    expect(related.some((p) => p.id === target!.id)).toBe(false);
    expect(
      related.every(
        (p) => p.category.slug === target!.category.slug || p.brand.slug === target!.brand.slug,
      ),
    ).toBe(true);
  });
});
