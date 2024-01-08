import * as React from 'react';

// eslint-disable-next-line no-unused-vars
type ClickOutsideCallback = (event: MouseEvent) => void;

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: ClickOutsideCallback,
) {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
