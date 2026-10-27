import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '@/features/cart/cartStore';

export const CartToast: React.FC = () => {
  const notification = useCartStore((state) => state.lastNotification);
  const dismiss = useCartStore((state) => state.dismissNotification);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      dismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification, dismiss]);

  if (!notification) return null;

  const isSuccess = notification.type === 'added';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom duration-200"
    >
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 text-white shadow-xl border border-slate-800">
        <div className="shrink-0 mt-0.5">
          {isSuccess ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-400" aria-hidden="true" />
          )}
        </div>

        <div className="flex-1 text-xs space-y-1">
          <p className="font-semibold text-slate-100">{notification.message}</p>
          {isSuccess && (
            <div className="pt-1">
              <Link
                to="/cart"
                onClick={dismiss}
                className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              >
                <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Go to Cart</span>
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss notification"
          className="text-slate-400 hover:text-white p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
