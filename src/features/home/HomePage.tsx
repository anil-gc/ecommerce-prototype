import React from 'react';
import { HeroSection } from './HeroSection';
import { TrustHighlights } from './TrustHighlights';
import { CategoryGrid } from './CategoryGrid';
import { FeaturedProductsSection } from './FeaturedProductsSection';
import { NewArrivalsSection } from './NewArrivalsSection';
import { SampleOffersSection } from './SampleOffersSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Focused Hero linking to catalog */}
      <HeroSection />

      {/* 2. Architecture & BDT Currency Highlights */}
      <TrustHighlights />

      {/* 3. Category Navigation */}
      <CategoryGrid />

      {/* 4. Featured Products */}
      <FeaturedProductsSection />

      {/* 5. New Arrivals */}
      <NewArrivalsSection />

      {/* 6. Sample Offers derived from fixture compare-at data */}
      <SampleOffersSection />
    </div>
  );
};
