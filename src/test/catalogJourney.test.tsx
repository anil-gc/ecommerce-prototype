import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShopPage } from '@/features/shop/ShopPage';

function renderShopPage(initialEntries = ['/shop']) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:slug" element={<ShopPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('Catalog Filtering, Sorting, and URL Synchronization Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders products and updates search query', async () => {
    renderShopPage(['/shop']);

    // Wait for catalog products to load
    await waitFor(() => {
      expect(screen.getByText(/All Tech & Gadgets/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search by name/i);
    expect(searchInput).toBeInTheDocument();

    // Type "MacBook" in search input
    fireEvent.change(searchInput, { target: { value: 'MacBook' } });

    await waitFor(() => {
      expect(screen.getByText(/Apple MacBook Air/i)).toBeInTheDocument();
    });
  });

  it('filters by category slug from URL route', async () => {
    renderShopPage(['/category/smartphones']);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /smartphones/i })).toBeInTheDocument();
      expect(screen.getByText(/Samsung Galaxy S24 FE/i)).toBeInTheDocument();
    });
  });

  it('displays active filter chips and allows clearing them', async () => {
    renderShopPage(['/shop?category=smartphones&in_stock=true']);

    await waitFor(() => {
      expect(screen.getByText(/Active filters:/i)).toBeInTheDocument();
      expect(screen.getByText(/Category: Smartphones/i)).toBeInTheDocument();
      expect(screen.getByText(/In Stock Only/i)).toBeInTheDocument();
    });

    // Click "Clear All"
    const clearButton = screen.getByText(/Clear All/i);
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.queryByText(/Active filters:/i)).not.toBeInTheDocument();
    });
  });

  it('renders sort selector and handles sort option changes', async () => {
    renderShopPage(['/shop']);

    await waitFor(() => {
      expect(screen.getByLabelText(/Sort by:/i)).toBeInTheDocument();
    });

    const sortSelect = screen.getByLabelText(/Sort by:/i);
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });

    expect((sortSelect as HTMLSelectElement).value).toBe('price-asc');
  });
});
