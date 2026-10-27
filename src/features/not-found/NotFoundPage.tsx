import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDocumentTitle } from '@/utils/useDocumentTitle';

export const NotFoundPage: React.FC = () => {
  useDocumentTitle('404 Page Not Found', 'The requested page or product could not be found.');
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
          <span className="text-3xl font-extrabold tracking-tight">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page you are looking for doesn't exist, has been removed, or the link may be outdated.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-left space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Useful Links
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="flex items-center gap-2.5 p-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors"
            >
              <Home className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>GadgetBazar Homepage</span>
            </Link>
            <Link
              to="/shop"
              className="flex items-center gap-2.5 p-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition-colors"
            >
              <ShoppingBag className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Browse Tech Catalog</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button
              size="md"
              leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
            >
              Back to Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button
              variant="outline"
              size="md"
              leftIcon={<ShoppingBag className="h-4 w-4" aria-hidden="true" />}
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
