import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Truck,
  ShieldCheck,
  ChevronRight,
  PackageX,
  ArrowLeft,
  ShoppingBag,
  Minus,
  Plus,
} from 'lucide-react';
import { useProductBySlug, useRelatedProducts } from '@/services/useCatalog';
import { formatBDT } from '@/utils/currency';
import { siteConfig } from '@/app/config';
import { useCartStore } from '@/features/cart/cartStore';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { ProductImage } from '@/components/ui/ProductImage';
import { ProductCard } from '@/components/ui/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductBySlug(slug);

  const { data: relatedProducts = [] } = useRelatedProducts(product?.id, 4);

  useDocumentTitle(
    product ? product.name : 'Product Details',
    product ? product.description : undefined,
  );

  // Loading State
  if (isLoading) {
    return (
      <div className="py-8 md:py-12 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Skeleton className="h-4 w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-6 space-y-4">
              <Skeleton className="w-full aspect-square rounded-xl" />
              <div className="flex gap-3">
                <Skeleton className="h-20 w-20 rounded-lg" />
                <Skeleton className="h-20 w-20 rounded-lg" />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State with Retry
  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
            <AlertTriangle className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Failed to Load Product</h1>
          <p className="text-sm text-slate-600">
            {error instanceof Error ? error.message : 'A network error occurred.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button
              variant="outline"
              leftIcon={<RotateCw className="h-4 w-4" />}
              onClick={() => refetch()}
            >
              Retry
            </Button>
            <Link to="/shop">
              <Button variant="primary">Return to Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Unknown Product State
  if (!product) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            <PackageX className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Product Not Found</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The gadget with slug &ldquo;{slug}&rdquo; does not exist or has been removed from our fixture catalog.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/shop">
              <Button
                variant="primary"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
              >
                Browse Store Catalog
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inStock = product.stock > 0;
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const currentImage = product.images[selectedImageIndex] || product.images[0];
  const inCartItem = cartItems.find((i) => i.productId === product.id);
  const inCartQty = inCartItem?.quantity || 0;
  const remainingStock = Math.max(0, product.stock - inCartQty);

  const handleDecreaseQty = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncreaseQty = () => {
    setQuantity((q) => Math.min(product.stock, q + 1));
  };

  const handleAddToCart = () => {
    if (!inStock) return;
    addItem(product, quantity);
  };

  return (
    <div className="py-8 md:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link to="/shop" className="hover:text-slate-900 transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link
            to={`/category/${product.category.slug}`}
            className="hover:text-slate-900 transition-colors"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Product Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xs">
              <ProductImage
                src={currentImage}
                alt={product.name}
                aspectRatio="square"
                className="rounded-xl object-contain max-h-[480px]"
              />
            </div>

            {/* Thumbnails if multiple images */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all p-1 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                      selectedImageIndex === idx
                        ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Pricing */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="neutral" size="sm">
                  {product.brand.name}
                </Badge>
                <Link
                  to={`/category/${product.category.slug}`}
                  className="text-xs font-semibold text-emerald-700 uppercase tracking-wider hover:underline"
                >
                  {product.category.name}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">
                  {formatBDT(product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-base text-slate-400 line-through">
                      {formatBDT(product.compareAtPrice!)}
                    </span>
                    <Badge variant="emerald" size="sm">
                      Save {discountPercent}%
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Represented internally as {product.price.toLocaleString()} integer poisha.
              </p>
            </div>

            {/* Purchase & Stock Controls */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Availability
                </span>
                {inStock ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>In Stock ({product.stock} units available)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                    <span>Currently Out of Stock</span>
                  </span>
                )}
              </div>

              {inStock ? (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white h-11 w-full sm:w-36 justify-between px-2">
                      <button
                        type="button"
                        onClick={handleDecreaseQty}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-bold text-slate-900 w-8 text-center select-none">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={handleIncreaseQty}
                        disabled={quantity >= product.stock}
                        aria-label="Increase quantity"
                        className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      size="lg"
                      variant="primary"
                      className="flex-1 h-11 text-sm font-bold"
                      onClick={handleAddToCart}
                      disabled={remainingStock <= 0}
                      leftIcon={<ShoppingBag className="h-4 w-4" />}
                    >
                      {remainingStock > 0 ? 'Add to Cart' : 'Max Stock in Cart'}
                    </Button>
                  </div>

                  {inCartQty > 0 && (
                    <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>
                        You have <strong>{inCartQty}</strong> in your cart{' '}
                        {remainingStock > 0 ? `(${remainingStock} more available)` : '(reached inventory limit)'}.
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-100">
                  <Button
                    size="lg"
                    variant="secondary"
                    disabled
                    className="w-full text-slate-400"
                  >
                    Product Out of Stock
                  </Button>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Product Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Simulated Bangladesh Delivery Rules */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Truck className="h-4 w-4 text-emerald-600" />
                <span>Simulated Delivery to Bangladesh</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Inside Dhaka:</span>
                  <span className="font-bold text-slate-800">
                    {formatBDT(siteConfig.delivery.insideDhakaPoisha)} (1–2 business days demo)
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block">Outside Dhaka:</span>
                  <span className="font-bold text-slate-800">
                    {formatBDT(siteConfig.delivery.outsideDhakaPoisha)} (3–4 business days demo)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Hardware & Architecture
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
                Technical Specifications
              </h2>
            </div>
            <ShieldCheck className="h-6 w-6 text-emerald-600" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div
                key={key}
                className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <span className="text-xs font-semibold text-slate-600">{key}</span>
                <span className="text-xs font-bold text-slate-900 text-right ml-4">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-8 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Explore More
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Related Tech & Gadgets
                </h2>
              </div>
              <Link
                to={`/category/${product.category.slug}`}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                View Department
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
