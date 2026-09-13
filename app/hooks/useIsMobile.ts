'use client';

import { useEffect, useState } from 'react';

/**
 * Returns whether the viewport is at mobile width.
 * `null` until mounted, so callers can avoid rendering (and therefore avoid
 * loading) the heavy desktop-only components before the width is known.
 * Default query matches Tailwind's `md` breakpoint (< 768px = mobile).
 */
export function useIsMobile(query = '(max-width: 767px)'): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return isMobile;
}
