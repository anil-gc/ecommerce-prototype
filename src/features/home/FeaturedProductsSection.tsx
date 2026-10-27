import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useFeaturedProducts } from '@/services/useCatalog';
import { formatBDT } from '@/utils/currency';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { ProductImage } from '@/components/ui/ProductImage';

export const FeaturedProductsSection: React.FC = () => {
  const { data: products, isLoading, isError, error } = useFeaturedProducts(6);

  return (
    <section id="featured-products" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="emerald" size="sm">
                Curated Devices
              </Badge>
              <span className="text-xs text-slate-500 font-medium">
                Live Mock Data
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
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
            <span>Explore All 24+ In Shop</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 shadow-2xs"
              >
                <Skeleton className="w-full aspect-square" rounded="lg" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-32" />
                <div className="pt-2 border-t border-slate-100 flex justify-between">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-8 text-center rounded-xl bg-white border border-rose-200 shadow-2xs">
            <p className="text-sm font-semibold text-rose-800">
              Failed to load featured products
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {error instanceof Error ? error.message : 'Unknown catalog error'}
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !isError && products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const inStock = product.stock > 0;
              const specsEntries = Object.entries(product.specifications).slice(0, 2);

              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
                >
                  <div>
                    {/* Media */}
                    <div className="relative mb-3">
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        aspectRatio="square"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
                          {product.brand.name}
                        </span>
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

                    {/* Category tag */}
                    <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                      {product.category.name}
                    </p>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>

                    {/* Specifications highlight */}
                    {specsEntries.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {specsEntries.map(([key, value]) => (
                          <span
                            key={key}
                            className="inline-block text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium"
                          >
                            <strong className="font-semibold text-slate-700">{key}:</strong> {value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing and Stock footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-slate-900">
                          {formatBDT(product.price)}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatBDT(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Integer Poisha: {product.price.toLocaleString()}
                      </p>
                    </div>

                    <Link
                      to={`/shop?category=${product.category.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
