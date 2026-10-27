import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  Calendar,
  CreditCard,
  PackageOpen,
} from 'lucide-react';
import { formatBDT } from '@/utils/currency';
import { Button } from '@/components/ui/Button';
import {
  type DemoOrderConfirmation,
  ORDER_CONFIRMATION_STORAGE_KEY,
} from './checkoutTypes';

export const OrderSuccessPage: React.FC = () => {
  const [confirmation, setConfirmation] = useState<DemoOrderConfirmation | null>(null);
  const [checkedStorage, setCheckedStorage] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ORDER_CONFIRMATION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DemoOrderConfirmation;
        if (parsed && parsed.orderReference && Array.isArray(parsed.items)) {
          setConfirmation(parsed);
        }
      }
    } catch {
      // ignore
    } finally {
      setCheckedStorage(true);
    }
  }, []);

  if (!checkedStorage) {
    return (
      <div className="py-20 min-h-[60vh] flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500 animate-pulse">Loading order confirmation...</p>
      </div>
    );
  }

  // Handle direct visits without confirmation
  if (!confirmation) {
    return (
      <div className="py-16 md:py-24 bg-slate-50 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full px-4 text-center space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
            <PackageOpen className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">No Recent Order Found</h1>
          <p className="text-sm text-slate-600">
            We couldn&apos;t find an active demo order confirmation. If you refreshed or visited directly, please start shopping from the catalog.
          </p>
          <div className="pt-2">
            <Link to="/shop">
              <Button size="md" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Browse Tech Catalog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const orderDate = new Date(confirmation.placedAt).toLocaleDateString('en-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300">
            <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Demo Order Simulated Successfully!
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Thank you for testing the GadgetBazar e-commerce prototype. Your browser-based demo order has been logged.
          </p>

          <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
            Demo Simulation: No real order placed • No payment deducted
          </div>
        </div>

        {/* Confirmation Metadata Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Sample Reference
              </span>
              <span className="text-base font-extrabold text-emerald-700 tracking-wider">
                {confirmation.orderReference}
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Placed On
              </span>
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 sm:justify-end">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>{orderDate}</span>
              </span>
            </div>
          </div>

          {/* Logistics and Payment metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Truck className="h-4 w-4 text-emerald-600" />
                <span>Delivery Simulation</span>
              </div>
              <p className="text-slate-600">
                Zone:{' '}
                <strong>
                  {confirmation.deliveryZone === 'inside' ? 'Inside Dhaka (৳60)' : 'Outside Dhaka (৳120)'}
                </strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Estimated 1–3 business days prototype transit
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <CreditCard className="h-4 w-4 text-emerald-600" />
                <span>Simulated Payment</span>
              </div>
              <p className="text-slate-600">
                Method: <strong>{confirmation.paymentMethod}</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Payment on simulated delivery
              </p>
            </div>
          </div>

          {/* Purchased Items Table */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Purchased Items Snapshot ({confirmation.items.length})
            </h2>

            <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
              {confirmation.items.map((item) => (
                <div key={item.productId} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{item.productName}</span>
                    <span className="text-slate-500 text-[11px]">
                      {item.brandName} • {item.quantity} × {formatBDT(item.unitPricePoisha)}
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    {formatBDT(item.lineSubtotalPoisha)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-2 text-xs pt-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-bold text-slate-900">
                {formatBDT(confirmation.subtotalPoisha)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Simulated Delivery Charge:</span>
              <span className="font-bold text-slate-900">
                {formatBDT(confirmation.deliveryFeePoisha)}
              </span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
              <span className="text-sm font-extrabold text-slate-900">Grand Total:</span>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-emerald-700 block">
                  {formatBDT(confirmation.totalPoisha)}
                </span>
                <span className="text-[10px] text-slate-400">
                  Integer Poisha: {confirmation.totalPoisha.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link to="/shop" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto font-bold"
              leftIcon={<ShoppingBag className="h-4 w-4" />}
            >
              Continue Shopping
            </Button>
          </Link>
          <Link to="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Client-side demo session only. Cleaned upon session termination.</span>
        </div>
      </div>
    </div>
  );
};
