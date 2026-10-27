/**
 * Currency utilities for Bangladesh Taka (BDT).
 * In this application, all monetary values are stored as integer poisha (1 BDT = 100 poisha)
 * to avoid floating-point rounding inaccuracies.
 */

/**
 * Converts poisha to BDT taka.
 */
export function poishaToTaka(poisha: number): number {
  return poisha / 100;
}

/**
 * Converts BDT taka to integer poisha.
 */
export function takaToPoisha(taka: number): number {
  return Math.round(taka * 100);
}

export interface FormatBDTOptions {
  /** If true, forces showing 2 decimal places (poisha) even if .00 */
  showDecimals?: boolean;
  /** Whether to use the Bengali Taka symbol (৳) or code (BDT). Defaults to '৳' */
  symbol?: '৳' | 'BDT';
}

/**
 * Formats integer poisha into a clean Bangladesh Taka string.
 * Example: 2500000 -> "৳25,000"
 * Example: 2500050 -> "৳25,000.50"
 */
export function formatBDT(poisha: number, options: FormatBDTOptions = {}): string {
  if (!Number.isFinite(poisha)) {
    return '৳0';
  }

  const { showDecimals, symbol = '৳' } = options;
  const taka = poishaToTaka(poisha);
  const hasPoishaFraction = poisha % 100 !== 0;
  const decimals = showDecimals ?? hasPoishaFraction ? 2 : 0;

  // Use en-BD locale formatting for standard thousands grouping
  const formatted = new Intl.NumberFormat('en-BD', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: 2,
  }).format(taka);

  return symbol === 'BDT' ? `BDT ${formatted}` : `৳${formatted}`;
}
