import { describe, it, expect, beforeEach } from 'vitest';
import {
  useCartStore,
  CART_STORAGE_KEY,
  CART_VERSION,
  loadPersistedCart,
  savePersistedCart,
} from './cartStore';
import { MOCK_PRODUCTS } from '@/mock/fixtures';
import type { Product } from '@/types/catalog';

describe('Zustand Cart Store (Phase 3)', () => {
  const inStockProduct: Product = MOCK_PRODUCTS.find((p) => p.stock > 5)!;
  const outOfStockProduct: Product = MOCK_PRODUCTS.find((p) => p.stock === 0)!;

  beforeEach(() => {
    localStorage.clear();
    useCartStore.getState().clearCart();
    useCartStore.getState().clearWarnings();
  });

  it('adds an in-stock product to the cart', () => {
    const success = useCartStore.getState().addItem(inStockProduct, 1);
    expect(success).toBe(true);

    const items = useCartStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].productId).toBe(inStockProduct.id);
    expect(items[0].quantity).toBe(1);
    expect(useCartStore.getState().getTotalItemCount()).toBe(1);
  });

  it('increments quantity when adding the same product again', () => {
    useCartStore.getState().addItem(inStockProduct, 2);
    useCartStore.getState().addItem(inStockProduct, 3);

    const items = useCartStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(5);
    expect(useCartStore.getState().getTotalItemCount()).toBe(5);
  });

  it('rejects adding out-of-stock products', () => {
    const success = useCartStore.getState().addItem(outOfStockProduct, 1);
    expect(success).toBe(false);

    const items = useCartStore.getState().items;
    expect(items.length).toBe(0);
    expect(useCartStore.getState().lastNotification?.type).toBe('warning');
  });

  it('prevents adding quantity exceeding available mock stock', () => {
    // Try to add more than available stock
    const excess = inStockProduct.stock + 10;
    useCartStore.getState().addItem(inStockProduct, excess);

    const items = useCartStore.getState().items;
    expect(items[0].quantity).toBe(inStockProduct.stock);

    // Try adding again when max is reached
    const addedAgain = useCartStore.getState().addItem(inStockProduct, 1);
    expect(addedAgain).toBe(false);
    expect(items[0].quantity).toBe(inStockProduct.stock);
  });

  it('updates quantity and clamps to bounds', () => {
    useCartStore.getState().addItem(inStockProduct, 2);
    useCartStore.getState().updateQuantity(inStockProduct.id, 4, inStockProduct.stock);

    expect(useCartStore.getState().items[0].quantity).toBe(4);

    // Updating to 0 removes the item
    useCartStore.getState().updateQuantity(inStockProduct.id, 0, inStockProduct.stock);
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('removes an item by product ID', () => {
    useCartStore.getState().addItem(inStockProduct, 2);
    expect(useCartStore.getState().items.length).toBe(1);

    useCartStore.getState().removeItem(inStockProduct.id);
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('clears all items from cart and storage', () => {
    useCartStore.getState().addItem(inStockProduct, 2);
    expect(useCartStore.getState().items.length).toBe(1);

    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items.length).toBe(0);
    expect(useCartStore.getState().getTotalItemCount()).toBe(0);
  });

  it('handles corrupted localStorage data gracefully without throwing', () => {
    // Malformed JSON string
    localStorage.setItem(CART_STORAGE_KEY, '{ invalid_json: true');
    const result = loadPersistedCart();

    expect(result.items).toEqual([]);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('handles schema mismatch and invalid types gracefully', () => {
    // Missing version or wrong items format
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ version: 99, items: 'not-an-array' }),
    );
    const result = loadPersistedCart();
    expect(result.items).toEqual([]);
  });

  it('reconciles stored items with catalog stock limits and removed items', () => {
    const payload = {
      version: CART_VERSION,
      items: [
        { productId: inStockProduct.id, quantity: inStockProduct.stock + 50 }, // exceeds stock
        { productId: 'non-existent-product-id', quantity: 2 }, // nonexistent
        { productId: outOfStockProduct.id, quantity: 1 }, // out of stock
      ],
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));

    const result = loadPersistedCart();
    // Nonexistent and out of stock removed; stock clamped
    expect(result.items.length).toBe(1);
    expect(result.items[0].productId).toBe(inStockProduct.id);
    expect(result.items[0].quantity).toBe(inStockProduct.stock);
    expect(result.warnings.length).toBe(3);
  });

  it('persists only product IDs and quantities, never computed totals', () => {
    savePersistedCart([{ productId: inStockProduct.id, quantity: 2 }]);

    const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)!);
    expect(stored.version).toBe(CART_VERSION);
    expect(stored.items[0]).toEqual({ productId: inStockProduct.id, quantity: 2 });
    expect(stored).not.toHaveProperty('total');
    expect(stored).not.toHaveProperty('subtotal');
  });
});
