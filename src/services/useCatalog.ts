import { useQuery } from '@tanstack/react-query';
import { catalogService } from './catalogService';
import type { ProductQueryParams } from '@/types/catalog';

export const CATALOG_QUERY_KEYS = {
  all: ['catalog'] as const,
  featured: () => [...CATALOG_QUERY_KEYS.all, 'featured'] as const,
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
    queryKey: [...CATALOG_QUERY_KEYS.featured(), limit],
    queryFn: () => catalogService.getFeaturedProducts(limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCategories() {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.categories(),
    queryFn: () => catalogService.getCategories(),
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
