import React, { useMemo, useState } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  RotateCw,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useProducts, useCategories, useBrands } from '@/services/useCatalog';
import type { ProductQueryParams, ProductSortOption } from '@/types/catalog';
import { takaToPoisha } from '@/utils/currency';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebar, type FilterState } from './FilterSidebar';
import { MobileFilterDrawer } from './MobileFilterDrawer';

const PAGE_SIZE = 9;

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Safe parsing of URL Search Parameters
  const { slug: routeCategorySlug } = useParams<{ slug: string }>();
  const query = searchParams.get('q') || '';
  const categorySlug = searchParams.get('category') || routeCategorySlug || undefined;
  const brandSlug = searchParams.get('brand') || undefined;
  const rawMinPrice = searchParams.get('min_price');
  const rawMaxPrice = searchParams.get('max_price');
  const inStockOnly = searchParams.get('in_stock') === 'true';
  const sort = (searchParams.get('sort') as ProductSortOption) || 'featured';
  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const minPriceTaka = rawMinPrice && !isNaN(Number(rawMinPrice)) ? Math.max(0, Number(rawMinPrice)) : undefined;
  const maxPriceTaka = rawMaxPrice && !isNaN(Number(rawMaxPrice)) ? Math.max(0, Number(rawMaxPrice)) : undefined;

  // Metadata queries
  const { data: categories = [] } = useCategories();
  const { data: brands = [] } = useBrands();

  // Active category / brand objects for display
  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const activeBrand = brands.find((b) => b.slug === brandSlug);

  useDocumentTitle(
    activeCategory
      ? `${activeCategory.name} — Gadgets`
      : activeBrand
        ? `${activeBrand.name} Tech`
        : 'Store Catalog',
    'Explore Bangladesh tech gadgets with faceted filtering and integer poisha BDT pricing.',
  );

  // Build API Query Params
  const queryParams: ProductQueryParams = useMemo(() => {
    return {
      query: query || undefined,
      categorySlug,
      brandSlug,
      minPricePoisha: typeof minPriceTaka === 'number' ? takaToPoisha(minPriceTaka) : undefined,
      maxPricePoisha: typeof maxPriceTaka === 'number' ? takaToPoisha(maxPriceTaka) : undefined,
      inStockOnly: inStockOnly ? true : undefined,
      sortBy: sort,
      page,
      limit: PAGE_SIZE,
    };
  }, [query, categorySlug, brandSlug, minPriceTaka, maxPriceTaka, inStockOnly, sort, page]);

  // Product query through TanStack Query
  const { data, isLoading, isError, error, refetch } = useProducts(queryParams);

  // Filter state object for sidebar
  const filterState: FilterState = useMemo(
    () => ({
      categorySlug,
      brandSlug,
      minPriceTaka,
      maxPriceTaka,
      inStockOnly,
    }),
    [categorySlug, brandSlug, minPriceTaka, maxPriceTaka, inStockOnly],
  );

  // Count active filters for badge
  const activeFilterCount = [
    categorySlug,
    brandSlug,
    minPriceTaka !== undefined,
    maxPriceTaka !== undefined,
    inStockOnly,
  ].filter(Boolean).length;

  // Handlers for URL updates
  const updateParams = (newEntries: Record<string, string | undefined>, resetPage = true) => {
    const next = new URLSearchParams(searchParams);
    if (resetPage) {
      next.delete('page');
    }
    Object.entries(newEntries).forEach(([k, v]) => {
      if (v !== undefined && v !== '') {
        next.set(k, v);
      } else {
        next.delete(k);
      }
    });
    setSearchParams(next);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateParams({ q: e.target.value.trim() || undefined }, true);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({ sort: e.target.value }, false);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    updateParams(
      {
        category: newFilters.categorySlug,
        brand: newFilters.brandSlug,
        min_price: newFilters.minPriceTaka !== undefined ? String(newFilters.minPriceTaka) : undefined,
        max_price: newFilters.maxPriceTaka !== undefined ? String(newFilters.maxPriceTaka) : undefined,
        in_stock: newFilters.inStockOnly ? 'true' : undefined,
      },
      true,
    );
  };

  const handleResetFilters = () => {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    if (sort !== 'featured') next.set('sort', sort);
    setSearchParams(next);
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage > 1 ? String(newPage) : undefined }, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-slate-900 transition-colors">
            Shop
          </Link>
          {activeCategory && (
            <>
              <span>/</span>
              <span className="text-slate-900 font-semibold">{activeCategory.name}</span>
            </>
          )}
          {activeBrand && (
            <>
              <span>/</span>
              <span className="text-emerald-700 font-semibold">{activeBrand.name}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeCategory
                ? activeCategory.name
                : activeBrand
                  ? `${activeBrand.name} Gadgets`
                  : 'All Tech & Gadgets'}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {activeCategory?.description ||
                'Browse our complete demo fixture catalog with BDT poisha precision and real-time faceted filters.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80">
            <Input
              type="search"
              placeholder="Search by name, spec, brand..."
              value={query}
              onChange={handleSearchChange}
              leftIcon={<Search className="h-4 w-4 text-slate-400" aria-hidden="true" />}
            />
          </div>
        </div>

        {/* Action Bar (Mobile Filter Toggle + Sort + Item Count) */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 bg-white rounded-xl border border-slate-200 shadow-2xs mb-6">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="h-5 w-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Results count */}
            <span className="text-xs font-medium text-slate-600">
              {data ? (
                <>
                  Showing <strong>{data.items.length > 0 ? (data.page - 1) * data.pageSize + 1 : 0}</strong>–
                  <strong>{Math.min(data.page * data.pageSize, data.total)}</strong> of{' '}
                  <strong>{data.total}</strong> products
                </>
              ) : (
                'Loading devices...'
              )}
            </span>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="catalog-sort" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Sort by:
            </label>
            <div className="w-44">
              <Select
                id="catalog-sort"
                value={sort}
                onChange={handleSortChange}
                options={[
                  { value: 'featured', label: 'Featured Devices' },
                  { value: 'price-asc', label: 'Price: Low to High' },
                  { value: 'price-desc', label: 'Price: High to Low' },
                  { value: 'name-asc', label: 'Name: A to Z' },
                  { value: 'newest', label: 'Newest First' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-slate-500 font-medium">Active filters:</span>
            {activeCategory && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <span>Category: {activeCategory.name}</span>
                <button
                  type="button"
                  onClick={() => updateParams({ category: undefined })}
                  aria-label={`Remove category ${activeCategory.name} filter`}
                  className="hover:text-emerald-950"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {activeBrand && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                <span>Brand: {activeBrand.name}</span>
                <button
                  type="button"
                  onClick={() => updateParams({ brand: undefined })}
                  aria-label={`Remove brand ${activeBrand.name} filter`}
                  className="hover:text-slate-950"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {minPriceTaka !== undefined && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                <span>Min: ৳{minPriceTaka.toLocaleString()}</span>
                <button
                  type="button"
                  onClick={() => updateParams({ min_price: undefined })}
                  aria-label="Remove minimum price filter"
                  className="hover:text-slate-950"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {maxPriceTaka !== undefined && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                <span>Max: ৳{maxPriceTaka.toLocaleString()}</span>
                <button
                  type="button"
                  onClick={() => updateParams({ max_price: undefined })}
                  aria-label="Remove maximum price filter"
                  className="hover:text-slate-950"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <span>In Stock Only</span>
                <button
                  type="button"
                  onClick={() => updateParams({ in_stock: undefined })}
                  aria-label="Remove in stock filter"
                  className="hover:text-emerald-950"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-2 ml-1"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
              <FilterSidebar
                categories={categories}
                brands={brands}
                filters={filterState}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <section className="lg:col-span-3">
            {/* Loading */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                    <Skeleton className="w-full aspect-square" rounded="lg" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                ))}
              </div>
            )}

            {/* Error with Retry */}
            {isError && (
              <div className="p-10 text-center rounded-xl bg-white border border-rose-200 shadow-2xs">
                <p className="text-base font-semibold text-rose-800">
                  Unable to load products
                </p>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  {error instanceof Error ? error.message : 'Catalog service error'}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<RotateCw className="h-3.5 w-3.5" />}
                  onClick={() => refetch()}
                >
                  Retry Request
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && data?.items.length === 0 && (
              <EmptyState
                title="No gadgets matched your criteria"
                description="Try loosening your filters, widening the price range, or searching with broader keywords."
                action={
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleResetFilters}
                  >
                    Reset All Filters
                  </Button>
                }
              />
            )}

            {/* Product Cards */}
            {!isLoading && !isError && data && data.items.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {data.totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={data.page <= 1}
                      onClick={() => handlePageChange(data.page - 1)}
                      leftIcon={<ChevronLeft className="h-4 w-4" />}
                    >
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: data.totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        const isCurrent = pageNum === data.page;
                        return (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => handlePageChange(pageNum)}
                            className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                              isCurrent
                                ? 'bg-emerald-600 text-white'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={data.page >= data.totalPages}
                      onClick={() => handlePageChange(data.page + 1)}
                      rightIcon={<ChevronRight className="h-4 w-4" />}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        categories={categories}
        brands={brands}
        filters={filterState}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />
    </div>
  );
};
