import { describe, it, expect } from 'vitest';
import { formatBDT, poishaToTaka, takaToPoisha } from './currency';

describe('Currency Utilities (BDT and Integer Poisha)', () => {
  it('converts poisha to taka correctly', () => {
    expect(poishaToTaka(100)).toBe(1);
    expect(poishaToTaka(2500000)).toBe(25000);
    expect(poishaToTaka(9950)).toBe(99.5);
  });

  it('converts taka to integer poisha accurately without rounding glitches', () => {
    expect(takaToPoisha(1)).toBe(100);
    expect(takaToPoisha(25000)).toBe(2500000);
    expect(takaToPoisha(99.5)).toBe(9950);
  });

  it('formats whole taka amounts without trailing zeroes by default', () => {
    const formatted = formatBDT(2500000);
    expect(formatted).toBe('৳25,000');
  });

  it('formats fractional amounts with poisha decimals', () => {
    const formatted = formatBDT(2500050);
    expect(formatted).toBe('৳25,000.50');
  });

  it('supports explicit BDT code prefix', () => {
    const formatted = formatBDT(7850000, { symbol: 'BDT' });
    expect(formatted).toBe('BDT 78,500');
  });

  it('handles invalid or non-finite numbers safely', () => {
    expect(formatBDT(NaN)).toBe('৳0');
    expect(formatBDT(Infinity)).toBe('৳0');
  });
});
