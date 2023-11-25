import * as React from 'react';

type ClickOutsideCallback = (event: MouseEvent) => void;

function useClickOutside(ref: React.RefObject<HTMLElement>, callback: ClickOutsideCallback) {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback(event);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickOutside;
