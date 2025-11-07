import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Modern browsers use addEventListener
    try {
      mediaQueryList.addEventListener('change', listener);
    } catch (e) {
      // Fallback for older browsers
      mediaQueryList.addListener(listener);
    }

    // Cleanup function
    return () => {
      try {
        mediaQueryList.removeEventListener('change', listener);
      } catch (e) {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};