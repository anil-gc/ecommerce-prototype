import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FolderX, ArrowLeft } from 'lucide-react';
import { useCategoryBySlug } from '@/services/useCatalog';
import { ShopPage } from './ShopPage';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: category, isLoading, isError } = useCategoryBySlug(slug);

  if (isLoading) {
    return (
      <div className="py-12 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Skeleton className="h-96 rounded-xl hidden lg:block" />
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-72 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !category) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
            <FolderX className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Category Not Found</h1>
          <p className="text-sm text-slate-600">
            The category &ldquo;{slug}&rdquo; does not exist in our gadget catalog.
          </p>
          <div className="pt-2">
            <Link to="/shop">
              <Button
                variant="primary"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
              >
                Browse All Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render the ShopPage with category slug active
  return <ShopPage />;
};
