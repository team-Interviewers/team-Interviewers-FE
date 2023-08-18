import { useEffect } from 'react';

export const useClickSpy = (handler: () => void) => {
  useEffect(() => {
    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [handler]);
};
