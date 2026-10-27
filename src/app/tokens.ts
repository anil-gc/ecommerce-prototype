/**
 * Design Tokens for GadgetBazar
 * 
 * Visual Identity:
 * - White / light-gray canvas
 * - Dark navy typography for authority and high contrast
 * - Emerald primary actions representing vibrant technology & growth
 * - Restrained borders and subtle elevation
 * - Generous, readable spacing
 */
export const tokens = {
  colors: {
    bg: {
      primary: '#ffffff',
      secondary: '#f8fafc', // slate-50
      muted: '#f1f5f9', // slate-100
    },
    text: {
      navy: '#0f172a', // slate-900
      body: '#334155', // slate-700
      muted: '#64748b', // slate-500
      inverse: '#ffffff',
    },
    primary: {
      emerald: '#059669', // emerald-600
      hover: '#047857', // emerald-700
      active: '#065f46', // emerald-800
      light: '#ecfdf5', // emerald-50
    },
    border: {
      subtle: '#e2e8f0', // slate-200
      default: '#cbd5e1', // slate-300
    },
    status: {
      inStock: '#059669',
      outOfStock: '#dc2626',
      badgeBg: '#ecfdf5',
    },
  },
  focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
  radii: {
    sm: 'rounded-md',
    base: 'rounded-lg',
    card: 'rounded-xl',
    full: 'rounded-full',
  },
} as const;
