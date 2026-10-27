import { describe, it, expect } from 'vitest';
import { validateBangladeshPhone } from './phone';

describe('Bangladesh Phone Validation & Normalization', () => {
  it('validates standard 11-digit local numbers', () => {
    const res = validateBangladeshPhone('01712345678');
    expect(res.isValid).toBe(true);
    expect(res.formatted).toBe('01712-345678');
    expect(res.normalized).toBe('+8801712345678');
  });

  it('validates and normalizes +880 international format', () => {
    const res = validateBangladeshPhone('+880 1812-345678');
    expect(res.isValid).toBe(true);
    expect(res.formatted).toBe('01812-345678');
    expect(res.normalized).toBe('+8801812345678');
  });

  it('validates 880 prefix without plus', () => {
    const res = validateBangladeshPhone('8801912345678');
    expect(res.isValid).toBe(true);
    expect(res.formatted).toBe('01912-345678');
  });

  it('rejects numbers with invalid operator prefixes', () => {
    // 011 is not an active BD mobile operator prefix
    const res = validateBangladeshPhone('01112345678');
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('start with 013–019');
  });

  it('rejects numbers with too few or too many digits', () => {
    const short = validateBangladeshPhone('017123456');
    expect(short.isValid).toBe(false);
    expect(short.error).toContain('11 digits');

    const long = validateBangladeshPhone('0171234567899');
    expect(long.isValid).toBe(false);
    expect(long.error).toContain('11 digits');
  });

  it('handles empty or whitespace strings safely', () => {
    const empty = validateBangladeshPhone('');
    expect(empty.isValid).toBe(false);
    expect(empty.error).toBeDefined();
  });
});
