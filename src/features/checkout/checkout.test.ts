import { describe, it, expect } from 'vitest';
import { siteConfig } from '@/app/config';
import { formatBDT } from '@/utils/currency';

describe('Demo Checkout Financial Rules & Delivery Rates', () => {
  it('correctly uses Inside Dhaka delivery rate of ৳60', () => {
    const insidePoisha = siteConfig.delivery.insideDhakaPoisha;
    expect(insidePoisha).toBe(6000);
    expect(formatBDT(insidePoisha)).toBe('৳60');
  });

  it('correctly uses Outside Dhaka delivery rate of ৳120', () => {
    const outsidePoisha = siteConfig.delivery.outsideDhakaPoisha;
    expect(outsidePoisha).toBe(12000);
    expect(formatBDT(outsidePoisha)).toBe('৳120');
  });

  it('calculates grand total accurately with integer poisha', () => {
    const subtotalPoisha = 7850000; // ৳78,500
    const deliveryDhaka = siteConfig.delivery.insideDhakaPoisha; // ৳60 (6,000 poisha)
    const grandTotalInside = subtotalPoisha + deliveryDhaka; // 7,856,000 poisha

    expect(grandTotalInside).toBe(7856000);
    expect(formatBDT(grandTotalInside)).toBe('৳78,560');

    const deliveryOutside = siteConfig.delivery.outsideDhakaPoisha; // ৳120 (12,000 poisha)
    const grandTotalOutside = subtotalPoisha + deliveryOutside; // 7,862,000 poisha

    expect(grandTotalOutside).toBe(7862000);
    expect(formatBDT(grandTotalOutside)).toBe('৳78,620');
  });
});
