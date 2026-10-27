import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCw, Star } from 'lucide-react';
import { useFeaturedProducts } from '@/services/useCatalog';
import { ProductCard } from '@/components/ui/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

export const FeaturedProductsSection: React.FC = () => {
  const { data: products, isLoading, isError, error, refetch } = useFeaturedProducts(6);

  return (
    <section id="featured-products" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <Star className="h-3.5 w-3.5 text-emerald-600 fill-emerald-600" aria-hidden="true" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Tech & Gadgets
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Authentic devices with verified specifications and integer poisha BDT pricing.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:underline"
          >
            <span>Explore All In Shop</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
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

        {/* Error State with retry */}
        {isError && (
          <div className="p-8 text-center rounded-xl bg-white border border-rose-200 shadow-2xs">
            <p className="text-sm font-semibold text-rose-800">
              Failed to load featured products
            </p>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              {error instanceof Error ? error.message : 'Unknown catalog error'}
            </p>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<RotateCw className="h-3.5 w-3.5" />}
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !isError && products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
