import { useEffect } from 'react';
import { siteConfig } from '@/app/config';

/**
 * Sets document title dynamically for accessible navigation announcements
 * and browser tab awareness.
 */
export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${siteConfig.name}`
      : `${siteConfig.name} — Bangladesh Tech & Gadgets Store`;

    document.title = fullTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
}
