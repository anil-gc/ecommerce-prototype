import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useProducts, useCategories } from '@/services/useCatalog';
import { formatBDT } from '@/utils/currency';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductImage } from '@/components/ui/ProductImage';

export const ShopFoundationPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategorySlug = searchParams.get('category') || undefined;
  const currentQuery = searchParams.get('q') || '';

  const { data: categories } = useCategories();

  const queryParams = useMemo(
    () => ({
      categorySlug: currentCategorySlug,
      query: currentQuery || undefined,
      limit: 24,
    }),
    [currentCategorySlug, currentQuery],
  );

  const { data, isLoading, isError, error } = useProducts(queryParams);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleCategorySelect = (slug?: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug) {
      newParams.set('category', slug);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const activeCategory = categories?.find((c) => c.slug === currentCategorySlug);

  return (
    <div className="py-8 md:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Store Catalog</span>
          {activeCategory && (
            <>
              <span>/</span>
              <span className="text-emerald-700 font-semibold">{activeCategory.name}</span>
            </>
          )}
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeCategory ? activeCategory.name : 'Store Catalog'}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {activeCategory?.description ||
                'Browse available gadgets with live mock inventory and integer poisha BDT pricing.'}
            </p>
          </div>

          <div className="w-full md:w-72">
            <Input
              type="search"
              placeholder="Search products..."
              value={currentQuery}
              onChange={handleSearchChange}
              leftIcon={<Search className="h-4 w-4" aria-hidden="true" />}
            />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => handleCategorySelect(undefined)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
              !currentCategorySlug
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          {categories?.map((cat) => {
            const isActive = currentCategorySlug === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Phase milestone notice */}
        <div className="mb-6 p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-emerald-700 shrink-0" aria-hidden="true" />
            <span>
              <strong>Phase 1 Foundation Catalog:</strong> Asynchronous catalog service integration verified. Extended multi-attribute filters, price range sliders, and pagination will be expanded in Phase 2.
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-3"
              >
                <Skeleton className="w-full aspect-square" rounded="lg" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-8 text-center rounded-xl bg-white border border-rose-200">
            <p className="text-sm font-semibold text-rose-800">
              Error loading catalog
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {error instanceof Error ? error.message : 'Unknown catalog error'}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && data?.items.length === 0 && (
          <EmptyState
            title="No matching products found"
            description="Try modifying your search keywords or resetting the category filter to see available devices."
            action={
              <button
                type="button"
                onClick={() => {
                  setSearchParams({});
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset All Filters</span>
              </button>
            }
          />
        )}

        {/* Products Grid */}
        {!isLoading && !isError && data && data.items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.items.map((product) => {
              const inStock = product.stock > 0;

              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
                >
                  <div>
                    <div className="relative mb-3">
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        aspectRatio="square"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="neutral" size="sm">
                          {product.brand.name}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        {inStock ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-semibold">
                            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                            <span>In Stock ({product.stock})</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[10px] font-semibold">
                            <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                            <span>Out of Stock</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                      {product.category.name}
                    </p>
                    <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-extrabold text-slate-900">
                        {formatBDT(product.price)}
                      </span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <p className="text-xs text-slate-400 line-through">
                          {formatBDT(product.compareAtPrice)}
                        </p>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Demo fixture
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
