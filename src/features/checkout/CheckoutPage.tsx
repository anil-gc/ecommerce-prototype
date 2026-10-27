import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  Truck,
  Banknote,
  Lock,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useResolvedCart } from '@/features/cart/useResolvedCart';
import { useCartStore } from '@/features/cart/cartStore';
import { formatBDT } from '@/utils/currency';
import { validateBangladeshPhone } from '@/utils/phone';
import { siteConfig } from '@/app/config';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  type DemoOrderConfirmation,
  ORDER_CONFIRMATION_STORAGE_KEY,
} from './checkoutTypes';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { lines, subtotalPoisha, totalItems, isEmpty } = useResolvedCart();
  const clearCart = useCartStore((state) => state.clearCart);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<'inside' | 'outside'>('inside');
  const [city, setCity] = useState('Dhaka');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Form Validation Errors
  const [errors, setErrors] = useState<{
    fullName?: string;
    phone?: string;
    city?: string;
    address?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculated delivery & totals
  const deliveryFeePoisha =
    deliveryZone === 'inside'
      ? siteConfig.delivery.insideDhakaPoisha
      : siteConfig.delivery.outsideDhakaPoisha;

  const totalPoisha = subtotalPoisha + deliveryFeePoisha;

  useDocumentTitle(
    'Demo Checkout',
    'Complete your demo purchase simulation with sample details and Bangladesh delivery rates.',
  );

  // Handle empty cart access
  if (isEmpty) {
    return (
      <div className="py-16 bg-slate-50 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <EmptyState
            title="Cannot Checkout with an Empty Cart"
            description="Please add products to your cart before proceeding to demo checkout."
            action={
              <Link to="/shop">
                <Button size="md" variant="primary">
                  Browse Catalog
                </Button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const phoneValidation = validateBangladeshPhone(phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error;
    }

    if (!city.trim()) {
      newErrors.city = 'Please enter your city or district.';
    }

    if (!address.trim() || address.trim().length < 5) {
      newErrors.address = 'Please provide a complete street address or area.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate short network delay for realism
    setTimeout(() => {
      const orderRef = `GB-DEMO-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000,
      )}`;

      // Create NON-PERSONAL confirmation snapshot for sessionStorage
      const confirmationSnapshot: DemoOrderConfirmation = {
        orderReference: orderRef,
        placedAt: new Date().toISOString(),
        deliveryZone,
        deliveryFeePoisha,
        subtotalPoisha,
        totalPoisha,
        paymentMethod: 'Cash on delivery — demo only',
        items: lines.map((l) => ({
          productId: l.product.id,
          productName: l.product.name,
          brandName: l.product.brand.name,
          quantity: l.quantity,
          unitPricePoisha: l.product.price,
          lineSubtotalPoisha: l.lineSubtotalPoisha,
        })),
      };

      try {
        sessionStorage.setItem(
          ORDER_CONFIRMATION_STORAGE_KEY,
          JSON.stringify(confirmationSnapshot),
        );
      } catch {
        // ignore
      }

      // Clear the Zustand cart
      clearCart();

      // Navigate to order success
      navigate('/order-success');
    }, 600);
  };

  return (
    <div className="py-8 md:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-slate-900 transition-colors">
            Cart
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Demo Checkout</span>
        </nav>

        {/* Demo Disclaimer Banner */}
        <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3 shadow-2xs">
          <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs space-y-1">
            <strong className="font-bold text-sm text-amber-950 block">
              Demo Checkout — Use Sample Details
            </strong>
            <p>
              No order will be placed and no payment will be collected. Do not enter confidential data. All transactions are simulated locally in your browser.
            </p>
          </div>
        </div>

        {/* Two-column layout: Form vs Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact & Personal */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
                  1. Delivery Contact Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name (Sample)"
                    placeholder="e.g. Tanvir Ahmed"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    error={errors.fullName}
                    required
                  />

                  <Input
                    label="Bangladesh Mobile Number"
                    placeholder="01700-000000"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    error={errors.phone}
                    helperText="Supports local 013-019 or +880 formats."
                    required
                  />
                </div>
              </div>

              {/* Delivery Address & Zone */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
                  2. Bangladesh Delivery Address
                </h2>

                {/* Delivery Zone Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Delivery Zone (Demo Rates)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-colors ${
                        deliveryZone === 'inside'
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">
                          Inside Dhaka
                        </span>
                        <input
                          type="radio"
                          name="zone"
                          checked={deliveryZone === 'inside'}
                          onChange={() => setDeliveryZone('inside')}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                      </div>
                      <span className="text-sm font-extrabold text-emerald-800">
                        {formatBDT(siteConfig.delivery.insideDhakaPoisha)}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1">
                        1–2 business days demo estimate
                      </span>
                    </label>

                    <label
                      className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-colors ${
                        deliveryZone === 'outside'
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">
                          Outside Dhaka
                        </span>
                        <input
                          type="radio"
                          name="zone"
                          checked={deliveryZone === 'outside'}
                          onChange={() => setDeliveryZone('outside')}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                      </div>
                      <span className="text-sm font-extrabold text-emerald-800">
                        {formatBDT(siteConfig.delivery.outsideDhakaPoisha)}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1">
                        3–4 business days demo estimate
                      </span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <Input
                    label="City / District"
                    placeholder="e.g. Dhaka or Chattogram"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors((prev) => ({ ...prev, city: undefined }));
                    }}
                    error={errors.city}
                    required
                  />

                  <Input
                    label="Street Address / Area"
                    placeholder="e.g. House 12, Road 4, Banani"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                    }}
                    error={errors.address}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="order-notes" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="order-notes"
                    rows={2}
                    placeholder="Any specific delivery instructions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
                  3. Payment Method (Simulation)
                </h2>

                <div className="p-4 rounded-xl border border-emerald-600 bg-emerald-50/50 flex items-start gap-3">
                  <Banknote className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">
                      Cash on Delivery — Demo Only
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pay sample cash upon delivery simulation. No payment credentials or OTPs are requested.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-500 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                    <span>Future Gateway Integrations</span>
                  </div>
                  <p className="text-[11px]">
                    bKash, Nagad, and debit/credit cards are simulated placeholders for future API phases. No real payment gateway is integrated.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  isLoading={isSubmitting}
                  className="w-full h-12 font-bold text-base"
                  rightIcon={<CheckCircle2 className="h-5 w-5" />}
                >
                  Complete Demo Checkout
                </Button>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-3">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Secure client-side simulation • Personal data is not stored</span>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h2 className="text-base font-extrabold text-slate-900">
                  Order Items ({totalItems})
                </h2>
                <Link to="/cart" className="text-xs font-semibold text-emerald-700 hover:underline">
                  Edit Cart
                </Link>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {lines.map(({ product, quantity, lineSubtotalPoisha }) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between py-2 border-b border-slate-100 text-xs"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="font-bold text-slate-900 line-clamp-1">{product.name}</p>
                      <p className="text-slate-500 text-[11px]">
                        Qty: {quantity} × {formatBDT(product.price)}
                      </p>
                    </div>
                    <span className="font-extrabold text-slate-900 shrink-0">
                      {formatBDT(lineSubtotalPoisha)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Costs Breakdown */}
              <div className="space-y-2 text-xs pt-2 border-t border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">{formatBDT(subtotalPoisha)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery ({deliveryZone === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}):</span>
                  <span className="font-bold text-slate-900">{formatBDT(deliveryFeePoisha)}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-sm font-extrabold text-slate-900">Total Payable:</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-emerald-700 block">
                      {formatBDT(totalPoisha)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Integer Poisha: {totalPoisha.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>Simulated delivery dispatch within Bangladesh</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
