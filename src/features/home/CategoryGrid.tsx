import React from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Zap,
  ArrowRight,
  FolderOpen,
} from 'lucide-react';
import { useCategories } from '@/services/useCatalog';
import { Skeleton } from '@/components/ui/Skeleton';

const categoryIconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="h-6 w-6" aria-hidden="true" />,
  Laptop: <Laptop className="h-6 w-6" aria-hidden="true" />,
  Headphones: <Headphones className="h-6 w-6" aria-hidden="true" />,
  Watch: <Watch className="h-6 w-6" aria-hidden="true" />,
  Gamepad2: <Gamepad2 className="h-6 w-6" aria-hidden="true" />,
  Zap: <Zap className="h-6 w-6" aria-hidden="true" />,
};

export const CategoryGrid: React.FC = () => {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <section id="categories" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Browse by Department
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Popular Tech Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:underline"
          >
            <span>View All Departments</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 space-y-3">
                <Skeleton className="h-10 w-10" rounded="md" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="p-6 text-center rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600">
            Unable to load categories. Please try refreshing.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories?.map((cat) => {
              const icon = (cat.iconName && categoryIconMap[cat.iconName]) || (
                <FolderOpen className="h-6 w-6 text-slate-500" aria-hidden="true" />
              );

              return (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col items-start justify-between"
                >
                  <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors mb-3">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
