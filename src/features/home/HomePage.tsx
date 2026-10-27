import React from 'react';
import { HeroSection } from './HeroSection';
import { TrustHighlights } from './TrustHighlights';
import { CategoryGrid } from './CategoryGrid';
import { FeaturedProductsSection } from './FeaturedProductsSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <HeroSection />

      {/* Trust & Architecture Highlights */}
      <TrustHighlights />

      {/* Department Grid */}
      <CategoryGrid />

      {/* Featured Products Loaded Asynchronously */}
      <FeaturedProductsSection />
    </div>
  );
};
