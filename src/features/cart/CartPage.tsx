import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useResolvedCart } from './useResolvedCart';
import { useCartStore } from './cartStore';
import { formatBDT } from '@/utils/currency';
import { siteConfig } from '@/app/config';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductImage } from '@/components/ui/ProductImage';

export const CartPage: React.FC = () => {
  const { lines, subtotalPoisha, totalItems, isEmpty, warnings, clearWarnings } =
    useResolvedCart();
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  // Delivery estimation toggle for the cart preview
  const [deliveryZone, setDeliveryZone] = useState<'inside' | 'outside'>('inside');

  const deliveryFeePoisha =
    deliveryZone === 'inside'
      ? siteConfig.delivery.insideDhakaPoisha
      : siteConfig.delivery.outsideDhakaPoisha;

  const totalPoisha = subtotalPoisha + deliveryFeePoisha;

  if (isEmpty) {
    return (
      <div className="py-12 md:py-20 bg-slate-50 min-h-[70vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            icon={<ShoppingBag className="h-8 w-8 text-slate-400" />}
            title="Your Shopping Cart is Empty"
            description="Explore our Bangladesh tech catalog featuring verified specs, transparent BDT pricing, and simulated delivery."
            action={
              <Link to="/shop">
                <Button
                  size="md"
                  variant="primary"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Explore Store Catalog
                </Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Shopping Cart</span>
        </nav>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              You have <strong>{totalItems}</strong> {totalItems === 1 ? 'device' : 'devices'} in your simulated cart.
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline self-start sm:self-auto"
          >
            Clear Entire Cart
          </button>
        </div>

        {/* Storage Reconciliation Warnings */}
        {warnings.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span>Cart Updates</span>
              </div>
              <button
                type="button"
                onClick={clearWarnings}
                className="text-amber-700 hover:text-amber-950 p-1"
                aria-label="Dismiss warnings"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="text-xs space-y-1 list-disc list-inside">
              {warnings.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Grid: Items + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <section className="lg:col-span-8 space-y-4">
            {lines.map(({ product, quantity, lineSubtotalPoisha }) => (
              <article
                key={product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs gap-4"
              >
                {/* Image & Basic Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <ProductImage
                      src={product.images[0]}
                      alt={product.name}
                      aspectRatio="square"
                    />
                  </div>

                  <div className="min-w-0 flex-1 sm:max-w-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {product.brand.name}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-emerald-700 transition-colors">
                      <Link to={`/product/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-1">
                      {formatBDT(product.price)} each
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Stock: {product.stock} units
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded-lg bg-white h-9 px-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1, product.stock)}
                      aria-label={`Decrease quantity of ${product.name}`}
                      className="p-1 rounded text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-xs font-bold text-slate-900 w-7 text-center select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      disabled={quantity >= product.stock}
                      onClick={() => updateQuantity(product.id, quantity + 1, product.stock)}
                      aria-label={`Increase quantity of ${product.name}`}
                      className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[90px]">
                    <span className="text-sm font-extrabold text-slate-900 block">
                      {formatBDT(lineSubtotalPoisha)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {lineSubtotalPoisha.toLocaleString()} poisha
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}

            <div className="pt-4 flex items-center justify-between">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </section>

          {/* Order Summary Card */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
              <h2 className="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-200">
                Order Summary
              </h2>

              {/* Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItems} items):</span>
                  <span className="font-bold text-slate-900">
                    {formatBDT(subtotalPoisha)}
                  </span>
                </div>

                {/* Delivery Option Selector */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-slate-700 font-semibold block">
                    Estimated Delivery:
                  </span>
                  <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer select-none">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery-zone"
                        value="inside"
                        checked={deliveryZone === 'inside'}
                        onChange={() => setDeliveryZone('inside')}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-slate-700">Inside Dhaka</span>
                    </div>
                    <span className="font-bold text-slate-900">
                      {formatBDT(siteConfig.delivery.insideDhakaPoisha)}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer select-none">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery-zone"
                        value="outside"
                        checked={deliveryZone === 'outside'}
                        onChange={() => setDeliveryZone('outside')}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-slate-700">Outside Dhaka</span>
                    </div>
                    <span className="font-bold text-slate-900">
                      {formatBDT(siteConfig.delivery.outsideDhakaPoisha)}
                    </span>
                  </label>
                  <p className="text-[10px] text-slate-400">
                    *Sample courier rates for prototype simulation.
                  </p>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between text-base">
                  <span className="font-extrabold text-slate-900">Estimated Total:</span>
                  <div className="text-right">
                    <span className="font-extrabold text-emerald-700 text-xl block">
                      {formatBDT(totalPoisha)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Includes simulated delivery fee
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Action */}
              <div className="space-y-3 pt-2">
                <Link to="/checkout" className="block">
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full font-bold text-sm h-11"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Proceed to Demo Checkout
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>No payment required • Safe demo sandbox</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
