import { useMemo } from 'react';
import { useCartStore } from './cartStore';
import { MOCK_PRODUCTS } from '@/mock/fixtures';
import type { Product } from '@/types/catalog';

export interface ResolvedCartLine {
  product: Product;
  quantity: number;
  lineSubtotalPoisha: number;
}

export function useResolvedCart() {
  const items = useCartStore((state) => state.items);
  const warnings = useCartStore((state) => state.reconciliationWarnings);
  const clearWarnings = useCartStore((state) => state.clearWarnings);

  const resolved = useMemo(() => {
    const lines: ResolvedCartLine[] = [];
    let subtotal = 0;
    let totalCount = 0;

    for (const item of items) {
      const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      if (!product) continue;

      const lineSubtotal = item.quantity * product.price;
      subtotal += lineSubtotal;
      totalCount += item.quantity;

      lines.push({
        product,
        quantity: item.quantity,
        lineSubtotalPoisha: lineSubtotal,
      });
    }

    return {
      lines,
      subtotalPoisha: subtotal,
      totalItems: totalCount,
      isEmpty: lines.length === 0,
    };
  }, [items]);

  return {
    ...resolved,
    warnings,
    clearWarnings,
  };
}
