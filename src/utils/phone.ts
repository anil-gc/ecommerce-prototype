/**
 * Bangladesh Mobile Phone Number Validation & Normalization Utility.
 * 
 * Supports standard Bangladesh formats:
 * - 01700000000 (11 digits, starting with 013-019)
 * - +8801700000000 (with country code)
 * - 8801700000000
 * - Hyphenated / spaced inputs (e.g. 01700-000000 or +880 1700 000000)
 */

export interface PhoneValidationResult {
  isValid: boolean;
  normalized?: string;
  formatted?: string;
  error?: string;
}

/**
 * Normalizes input by stripping whitespace, hyphens, and parentheses.
 */
export function cleanPhoneNumber(raw: string): string {
  return raw.replace(/[\s\-().]/g, '').trim();
}

/**
 * Validates and normalizes a Bangladesh mobile number.
 */
export function validateBangladeshPhone(input: string): PhoneValidationResult {
  if (!input || !input.trim()) {
    return {
      isValid: false,
      error: 'Please enter your mobile phone number.',
    };
  }

  let cleaned = cleanPhoneNumber(input);

  // Normalize leading +880 or 880 to local 0
  if (cleaned.startsWith('+880')) {
    cleaned = '0' + cleaned.slice(4);
  } else if (cleaned.startsWith('880')) {
    cleaned = '0' + cleaned.slice(3);
  }

  // Check if contains non-digits
  if (!/^\d+$/.test(cleaned)) {
    return {
      isValid: false,
      error: 'Phone number should only contain numbers.',
    };
  }

  // Check length
  if (cleaned.length !== 11) {
    return {
      isValid: false,
      error: `Number must be 11 digits (currently ${cleaned.length} digits). Example: 01700-000000`,
    };
  }

  // Check valid operator prefix (013 through 019)
  // 013/017: GP, 014/019: Banglalink, 015: Teletalk, 016/018: Robi/Airtel
  if (!/^01[3-9]\d{8}$/.test(cleaned)) {
    return {
      isValid: false,
      error: 'Invalid prefix. Bangladesh mobile numbers must start with 013–019.',
    };
  }

  // Format as standard Bangladesh display: 01700-000000
  const formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  const normalizedWithCountry = `+880${cleaned.slice(1)}`;

  return {
    isValid: true,
    normalized: normalizedWithCountry,
    formatted,
  };
}
