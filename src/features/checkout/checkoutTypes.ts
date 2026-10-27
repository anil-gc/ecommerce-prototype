export interface DemoOrderConfirmation {
  orderReference: string;
  placedAt: string;
  deliveryZone: 'inside' | 'outside';
  deliveryFeePoisha: number;
  subtotalPoisha: number;
  totalPoisha: number;
  items: {
    productId: string;
    productName: string;
    brandName: string;
    quantity: number;
    unitPricePoisha: number;
    lineSubtotalPoisha: number;
  }[];
  paymentMethod: 'Cash on delivery — demo only';
}

export const ORDER_CONFIRMATION_STORAGE_KEY = 'gb_demo_order_confirmation';
