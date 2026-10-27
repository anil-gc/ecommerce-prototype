import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCw } from 'lucide-react';
import { useNewArrivals } from '@/services/useCatalog';
import { ProductCard } from '@/components/ui/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

export const NewArrivalsSection: React.FC = () => {
  const { data: products, isLoading, isError, error, refetch } = useNewArrivals(6);

  return (
    <section className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              <span>Latest Releases</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              New Arrivals in Bangladesh
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Fresh additions to the demo catalog with modern chipsets, high-refresh displays, and fast charging.
            </p>
          </div>

          <Link
            to="/shop?sort=newest"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:underline"
          >
            <span>View All New Tech</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

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

        {/* Error */}
        {isError && (
          <div className="p-8 text-center rounded-xl bg-slate-50 border border-rose-200">
            <p className="text-sm font-semibold text-rose-800">
              Unable to load new arrivals
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
              Retry
            </Button>
          </div>
        )}

        {/* Products Grid */}
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
