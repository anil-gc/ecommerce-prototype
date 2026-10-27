import React from 'react';
import { RotateCcw } from 'lucide-react';
import type { Brand, Category } from '@/types/catalog';
import { Button } from '@/components/ui/Button';

export interface FilterState {
  categorySlug?: string;
  brandSlug?: string;
  minPriceTaka?: number;
  maxPriceTaka?: number;
  inStockOnly?: boolean;
}

export interface FilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  className?: string;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  filters,
  onFilterChange,
  onReset,
  className = '',
  isMobile = false,
  onCloseMobile,
}) => {
  const handleCategoryChange = (slug?: string) => {
    onFilterChange({ ...filters, categorySlug: slug });
  };

  const handleBrandChange = (slug?: string) => {
    onFilterChange({ ...filters, brandSlug: slug });
  };

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, inStockOnly: e.target.checked });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? Math.max(0, parseInt(e.target.value, 10)) : undefined;
    onFilterChange({ ...filters, minPriceTaka: val });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value ? Math.max(0, parseInt(e.target.value, 10)) : undefined;
    onFilterChange({ ...filters, maxPriceTaka: val });
  };

  const hasActiveFilters = Boolean(
    filters.categorySlug ||
      filters.brandSlug ||
      filters.minPriceTaka ||
      filters.maxPriceTaka ||
      filters.inStockOnly,
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors focus-visible:outline-none focus-visible:underline"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
          Categories
        </h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => handleCategoryChange(undefined)}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !filters.categorySlug
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => {
            const isSelected = filters.categorySlug === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(isSelected ? undefined : cat.slug)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Brand Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
          Brand
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => handleBrandChange(undefined)}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !filters.brandSlug
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            All Brands
          </button>
          {brands.map((brand) => {
            const isSelected = filters.brandSlug === brand.slug;
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => handleBrandChange(isSelected ? undefined : brand.slug)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{brand.name}</span>
                {brand.countryOrigin && (
                  <span className="text-[10px] text-slate-400 font-normal">
                    {brand.countryOrigin}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Price Filter (BDT Taka) */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
          Price Range (BDT ৳)
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="min-price-input" className="block text-[10px] text-slate-500 mb-1">
              Min (৳)
            </label>
            <input
              id="min-price-input"
              type="number"
              placeholder="0"
              min="0"
              value={filters.minPriceTaka ?? ''}
              onChange={handleMinPriceChange}
              className="w-full h-8 px-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            />
          </div>
          <div>
            <label htmlFor="max-price-input" className="block text-[10px] text-slate-500 mb-1">
              Max (৳)
            </label>
            <input
              id="max-price-input"
              type="number"
              placeholder="300,000"
              min="0"
              value={filters.maxPriceTaka ?? ''}
              onChange={handleMaxPriceChange}
              className="w-full h-8 px-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* 4. Availability / In Stock */}
      <div className="pt-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={Boolean(filters.inStockOnly)}
            onChange={handleInStockChange}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-xs font-medium text-slate-800">
            In-Stock Items Only
          </span>
        </label>
      </div>

      {/* Mobile Actions */}
      {isMobile && (
        <div className="pt-4 border-t border-slate-200 flex gap-2">
          <Button
            size="md"
            variant="primary"
            className="flex-1"
            onClick={onCloseMobile}
          >
            Apply Filters
          </Button>
          <Button
            size="md"
            variant="outline"
            onClick={() => {
              onReset();
              onCloseMobile?.();
            }}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};
