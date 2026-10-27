import { useQuery } from '@tanstack/react-query';
import { catalogService } from './catalogService';
import type { ProductQueryParams } from '@/types/catalog';

export const CATALOG_QUERY_KEYS = {
  all: ['catalog'] as const,
  featured: (limit?: number) => [...CATALOG_QUERY_KEYS.all, 'featured', limit] as const,
  newArrivals: (limit?: number) => [...CATALOG_QUERY_KEYS.all, 'newArrivals', limit] as const,
  offers: (limit?: number) => [...CATALOG_QUERY_KEYS.all, 'offers', limit] as const,
  related: (productId?: string, limit?: number) =>
    [...CATALOG_QUERY_KEYS.all, 'related', productId, limit] as const,
  categories: () => [...CATALOG_QUERY_KEYS.all, 'categories'] as const,
  brands: () => [...CATALOG_QUERY_KEYS.all, 'brands'] as const,
  products: (params?: ProductQueryParams) =>
    [...CATALOG_QUERY_KEYS.all, 'products', params] as const,
  productBySlug: (slug: string) =>
    [...CATALOG_QUERY_KEYS.all, 'product', 'slug', slug] as const,
  categoryBySlug: (slug: string) =>
    [...CATALOG_QUERY_KEYS.all, 'category', 'slug', slug] as const,
};

export function useFeaturedProducts(limit = 6) {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.featured(limit),
    queryFn: () => catalogService.getFeaturedProducts(limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useNewArrivals(limit = 6) {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.newArrivals(limit),
    queryFn: () => catalogService.getNewArrivals(limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useOffers(limit = 6) {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.offers(limit),
    queryFn: () => catalogService.getOffers(limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useRelatedProducts(productId: string | undefined, limit = 4) {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.related(productId, limit),
    queryFn: () => {
      if (!productId) return [];
      return catalogService.getRelatedProducts(productId, limit);
    },
    enabled: Boolean(productId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.categories(),
    queryFn: () => catalogService.getCategories(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useCategoryBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.categoryBySlug(slug ?? ''),
    queryFn: () => {
      if (!slug) return null;
      return catalogService.getCategoryBySlug(slug);
    },
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
  });
}

export function useBrands() {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.brands(),
    queryFn: () => catalogService.getBrands(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.products(params),
    queryFn: () => catalogService.getProducts(params),
    staleTime: 1000 * 60 * 2,
  });
}

export function useProductBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.productBySlug(slug ?? ''),
    queryFn: () => {
      if (!slug) return null;
      return catalogService.getProductBySlug(slug);
    },
    enabled: Boolean(slug),
  });
}
