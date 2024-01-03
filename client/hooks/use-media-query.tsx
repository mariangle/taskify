import * as React from 'react';

export function useMediaQuery(query: string) {
  const isClient = typeof window === 'object'; // Check if running in a browser environment
  const [matches, setMatches] = React.useState(() =>
    isClient ? window.matchMedia(query).matches : false,
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return; // Avoid running the effect on the server or in a non-browser environment
    }

    const matchMediaList = window.matchMedia(query);

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    matchMediaList.addEventListener('change', handleChange);

    // Cleanup function to remove the listener when the component is unmounted
    // eslint-disable-next-line consistent-return
    return () => {
      matchMediaList.removeEventListener('change', handleChange);
      return undefined; // Explicitly return undefined
    };
  }, [query]);

  return matches;
}
