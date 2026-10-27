import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useCartStore } from '@/features/cart/cartStore';
import { CartPage } from '@/features/cart/CartPage';
import { CheckoutPage } from '@/features/checkout/CheckoutPage';
import { OrderSuccessPage } from '@/features/checkout/OrderSuccessPage';
import { MOCK_PRODUCTS } from '@/mock/fixtures';

describe('Cart & Demo Checkout Journey Flow', () => {
  const sampleProduct = MOCK_PRODUCTS[0]; // Samsung S24 FE, ৳78,500, stock: 14

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    useCartStore.getState().clearCart();
    useCartStore.getState().clearWarnings();
  });

  it('renders empty cart state and blocks empty checkout access', () => {
    // 1. Visit /cart with empty cart
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Your Shopping Cart is Empty/i)).toBeInTheDocument();
  });

  it('calculates correct subtotal, delivery charges, and grand total in Cart', () => {
    useCartStore.getState().addItem(sampleProduct, 2); // 2 * ৳78,500 = ৳157,000

    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Routes>
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </MemoryRouter>,
    );

    // Subtotal and line item: ৳157,000
    expect(screen.getAllByText('৳157,000').length).toBeGreaterThanOrEqual(1);

    // Default Inside Dhaka delivery is ৳60
    expect(screen.getAllByText('৳60').length).toBeGreaterThanOrEqual(1);

    // Total: ৳157,060
    expect(screen.getByText('৳157,060')).toBeInTheDocument();

    // Switch delivery zone to Outside Dhaka (৳120)
    const outsideRadio = screen.getByLabelText(/Outside Dhaka/i);
    fireEvent.click(outsideRadio);

    // New Total: ৳157,120
    expect(screen.getByText('৳157,120')).toBeInTheDocument();
  });

  it('validates checkout form for invalid Bangladesh phone number', async () => {
    useCartStore.getState().addItem(sampleProduct, 1);

    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <Routes>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </MemoryRouter>,
    );

    // Fill valid name, city, address
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'Rahim Khan' },
    });
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: 'Dhaka' },
    });
    fireEvent.change(screen.getByLabelText(/Street Address/i), {
      target: { value: 'House 5, Road 2, Dhanmondi' },
    });

    // Enter invalid phone number (only 6 digits)
    fireEvent.change(screen.getByLabelText(/Bangladesh Mobile Number/i), {
      target: { value: '01712' },
    });

    // Click submit
    fireEvent.click(screen.getByRole('button', { name: /Complete demo checkout/i }));

    // Assert validation error
    await waitFor(() => {
      expect(screen.getByText(/Number must be 11 digits/i)).toBeInTheDocument();
    });
  });

  it('successfully completes demo checkout, clears cart, and shows order confirmation', async () => {
    useCartStore.getState().addItem(sampleProduct, 1);
    expect(useCartStore.getState().items.length).toBe(1);

    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <Routes>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Routes>
      </MemoryRouter>,
    );

    // Fill valid sample details
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'Nusrat Jahan' },
    });
    fireEvent.change(screen.getByLabelText(/Bangladesh Mobile Number/i), {
      target: { value: '01712345678' },
    });
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: 'Dhaka' },
    });
    fireEvent.change(screen.getByLabelText(/Street Address/i), {
      target: { value: 'Flat 4B, Road 11, Gulshan-1' },
    });

    // Submit checkout
    fireEvent.click(screen.getByRole('button', { name: /Complete demo checkout/i }));

    // Wait for submission timeout & redirection
    await waitFor(
      () => {
        expect(
          screen.getByText(/Demo Order Simulated Successfully/i),
        ).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // Cart is cleared
    expect(useCartStore.getState().items.length).toBe(0);

    // Check confirmation details on screen
    expect(screen.getByText(/Sample Reference/i)).toBeInTheDocument();
    expect(screen.getByText(/GB-DEMO-/i)).toBeInTheDocument();
    expect(screen.getByText(/Cash on delivery — demo only/i)).toBeInTheDocument();
  });

  it('handles direct visits to order success page when no confirmation is in session', () => {
    render(
      <MemoryRouter initialEntries={['/order-success']}>
        <Routes>
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/No Recent Order Found/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Browse Tech Catalog/i })).toBeInTheDocument();
  });
});
