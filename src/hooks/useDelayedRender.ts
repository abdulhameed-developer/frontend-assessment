// File: src/hooks/useDelayedRender.ts
import { useState, useEffect } from 'react';

export function useDelayedRender(delay: number = 2000) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isReady;
}