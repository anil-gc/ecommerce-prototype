import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import type { Product } from '@/types/catalog';
import { formatBDT } from '@/utils/currency';
import { ProductImage } from './ProductImage';

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const inStock = product.stock > 0;
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const keySpecs = Object.entries(product.specifications).slice(0, 2);

  return (
    <article
      className={`group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 ${className || ''}`}
    >
      <div>
        {/* Media & Badges */}
        <div className="relative mb-3">
          <Link
            to={`/product/${product.slug}`}
            className="block overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            tabIndex={-1}
            aria-hidden="true"
          >
            <ProductImage
              src={product.images[0]}
              alt={product.name}
              aspectRatio="square"
            />
          </Link>

          {/* Brand Badge */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
              {product.brand.name}
            </span>
            {hasDiscount && (
              <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Availability Status Badge */}
          <div className="absolute top-2 right-2">
            {inStock ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/90 backdrop-blur-xs text-white text-[10px] font-semibold">
                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                <span>In Stock ({product.stock})</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/90 backdrop-blur-xs text-white text-[10px] font-semibold">
                <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                <span>Out of Stock</span>
              </span>
            )}
          </div>
        </div>

        {/* Category Tag */}
        <Link
          to={`/category/${product.category.slug}`}
          className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider hover:underline focus-visible:outline-none focus-visible:underline"
        >
          {product.category.name}
        </Link>

        {/* Product Title Link */}
        <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
          <Link
            to={`/product/${product.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
          >
            {product.name}
          </Link>
        </h3>

        {/* Specifications snippet */}
        {keySpecs.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
            {keySpecs.map(([key, val]) => (
              <span
                key={key}
                className="inline-block text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium"
              >
                <strong className="font-semibold text-slate-700">{key}:</strong> {val}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pricing and Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-slate-900">
              {formatBDT(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                {formatBDT(product.compareAtPrice!)}
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400">
            Poisha: {product.price.toLocaleString()}
          </p>
        </div>

        <Link
          to={`/product/${product.slug}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          <span>View</span>
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};
