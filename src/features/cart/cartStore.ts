import { create } from 'zustand';
import type { Product } from '@/types/catalog';
import { MOCK_PRODUCTS } from '@/mock/fixtures';

export const CART_STORAGE_KEY = 'gb_cart_v1';
export const CART_VERSION = 1;

export interface CartStorageItem {
  productId: string;
  quantity: number;
}

export interface CartStoragePayload {
  version: number;
  items: CartStorageItem[];
}

export interface CartNotification {
  id: string;
  type: 'added' | 'adjusted' | 'removed' | 'warning';
  message: string;
  productName?: string;
}

export interface CartState {
  items: CartStorageItem[];
  reconciliationWarnings: string[];
  lastNotification: CartNotification | null;

  // Actions
  addItem: (product: Product, quantity?: number) => boolean;
  updateQuantity: (productId: string, quantity: number, maxStock: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  clearWarnings: () => void;
  dismissNotification: () => void;
  getTotalItemCount: () => number;
}

/**
 * Safely loads and validates cart payload from localStorage.
 * Handles missing, corrupted, or malformed data gracefully without throwing.
 */
export function loadPersistedCart(): { items: CartStorageItem[]; warnings: string[] } {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { items: [], warnings: [] };
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { items: [], warnings: [] };

    const parsed = JSON.parse(raw) as Partial<CartStoragePayload>;

    // Validate schema
    if (!parsed || parsed.version !== CART_VERSION || !Array.isArray(parsed.items)) {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      return { items: [], warnings: [] };
    }

    const validatedItems: CartStorageItem[] = [];
    const warnings: string[] = [];

    for (const item of parsed.items) {
      if (
        !item ||
        typeof item.productId !== 'string' ||
        typeof item.quantity !== 'number' ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        continue;
      }

      // Reconcile item against current mock catalog
      const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      if (!product) {
        warnings.push('An item in your previous cart is no longer available and was removed.');
        continue;
      }

      if (product.stock <= 0) {
        warnings.push(`${product.name} is currently out of stock and was removed from your cart.`);
        continue;
      }

      if (item.quantity > product.stock) {
        warnings.push(
          `Quantity for ${product.name} was adjusted from ${item.quantity} to ${product.stock} due to available stock.`,
        );
        validatedItems.push({ productId: product.id, quantity: product.stock });
      } else {
        validatedItems.push({ productId: item.productId, quantity: item.quantity });
      }
    }

    return { items: validatedItems, warnings };
  } catch {
    // Corrupted storage recovery
    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
    return { items: [], warnings: ['Your saved cart data was corrupted and has been reset.'] };
  }
}

/**
 * Persists only product IDs and quantities with version header.
 * Never persists calculated totals or prices.
 */
export function savePersistedCart(items: CartStorageItem[]): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const payload: CartStoragePayload = {
      version: CART_VERSION,
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
    };
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota errors in test/restricted environments
  }
}

const initialCart = loadPersistedCart();

export const useCartStore = create<CartState>((set, get) => ({
  items: initialCart.items,
  reconciliationWarnings: initialCart.warnings,
  lastNotification: null,

  addItem: (product: Product, quantity = 1) => {
    if (product.stock <= 0) {
      set({
        lastNotification: {
          id: Date.now().toString(),
          type: 'warning',
          message: `${product.name} is currently out of stock.`,
          productName: product.name,
        },
      });
      return false;
    }

    const { items } = get();
    const existingIndex = items.findIndex((i) => i.productId === product.id);

    let updatedItems: CartStorageItem[];
    let addedCount = quantity;

    if (existingIndex > -1) {
      const currentQty = items[existingIndex].quantity;
      if (currentQty >= product.stock) {
        set({
          lastNotification: {
            id: Date.now().toString(),
            type: 'warning',
            message: `Maximum available stock (${product.stock}) already in cart.`,
            productName: product.name,
          },
        });
        return false;
      }

      const nextQty = Math.min(currentQty + quantity, product.stock);
      addedCount = nextQty - currentQty;

      updatedItems = items.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: nextQty } : item,
      );
    } else {
      const initialQty = Math.min(quantity, product.stock);
      updatedItems = [...items, { productId: product.id, quantity: initialQty }];
    }

    savePersistedCart(updatedItems);

    set({
      items: updatedItems,
      lastNotification: {
        id: Date.now().toString(),
        type: 'added',
        message: `Added ${addedCount} × ${product.name} to cart.`,
        productName: product.name,
      },
    });

    return true;
  },

  updateQuantity: (productId: string, quantity: number, maxStock: number) => {
    const { items } = get();

    if (quantity <= 0) {
      const updated = items.filter((i) => i.productId !== productId);
      savePersistedCart(updated);
      set({ items: updated });
      return;
    }

    const clampedQty = Math.min(quantity, Math.max(1, maxStock));
    const updated = items.map((i) =>
      i.productId === productId ? { ...i, quantity: clampedQty } : i,
    );

    savePersistedCart(updated);
    set({ items: updated });
  },

  removeItem: (productId: string) => {
    const { items } = get();
    const updated = items.filter((i) => i.productId !== productId);
    savePersistedCart(updated);

    set({
      items: updated,
      lastNotification: {
        id: Date.now().toString(),
        type: 'removed',
        message: 'Item removed from your cart.',
      },
    });
  },

  clearCart: () => {
    savePersistedCart([]);
    set({ items: [], lastNotification: null });
  },

  clearWarnings: () => {
    set({ reconciliationWarnings: [] });
  },

  dismissNotification: () => {
    set({ lastNotification: null });
  },

  getTotalItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
