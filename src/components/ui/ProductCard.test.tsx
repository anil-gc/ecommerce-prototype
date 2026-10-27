import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types/catalog';

const sampleProduct: Product = {
  id: 'test-1',
  slug: 'test-galaxy-s24',
  name: 'Samsung Galaxy S24 FE',
  description: 'Flagship phone with AMOLED display',
  category: { id: 'c1', slug: 'smartphones', name: 'Smartphones' },
  brand: { id: 'b1', slug: 'samsung', name: 'Samsung' },
  images: ['https://example.com/phone.jpg'],
  specifications: {
    Display: '6.7-inch AMOLED',
    RAM: '8GB',
  },
  price: 7850000, // ৳78,500
  compareAtPrice: 8499900, // ৳84,999
  stock: 14,
  isFeatured: true,
};

describe('ProductCard Component', () => {
  it('renders product name, brand, and formatted BDT price', () => {
    render(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Samsung Galaxy S24 FE')).toBeInTheDocument();
    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('৳78,500')).toBeInTheDocument();
  });

  it('displays in-stock badge with stock count', () => {
    render(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/In Stock \(14\)/i)).toBeInTheDocument();
  });

  it('displays out-of-stock badge when stock is 0', () => {
    const outOfStockProduct = { ...sampleProduct, stock: 0 };
    render(
      <MemoryRouter>
        <ProductCard product={outOfStockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
  });

  it('calculates and displays savings percentage when compare-at price exists', () => {
    render(
      <MemoryRouter>
        <ProductCard product={sampleProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Save 8%/i)).toBeInTheDocument();
    expect(screen.getByText('৳84,999')).toBeInTheDocument();
  });
});
