import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, RotateCw, Info } from 'lucide-react';
import { useOffers } from '@/services/useCatalog';
import { ProductCard } from '@/components/ui/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

export const SampleOffersSection: React.FC = () => {
  const { data: offers, isLoading, isError, error, refetch } = useOffers(3);

  return (
    <section className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Tag className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
              <span>Fixture Specials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sample Offers & Bundles
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Products with demo promotional savings calculated directly from compare-at integer poisha data.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <span>Derived from fixture compare-at prices</span>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
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
          <div className="p-8 text-center rounded-xl bg-white border border-rose-200">
            <p className="text-sm font-semibold text-rose-800">
              Unable to load sample offers
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
        {!isLoading && !isError && offers && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/shop">
            <Button
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Browse Complete Catalog (24+ Devices)
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
