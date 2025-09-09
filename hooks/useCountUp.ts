
import { useState, useEffect, useRef } from 'react';

export const useCountUp = (end: number, duration: number = 2000): number => {
  const [count, setCount] = useState(0);
  const ref = useRef<number>(0);

  const accumulator = (timestamp: number) => {
    if (!ref.current) ref.current = timestamp;
    const progress = Math.min((timestamp - ref.current) / duration, 1);
    const newCount = Math.floor(progress * end);
    setCount(newCount);
    if (progress < 1) {
      requestAnimationFrame(accumulator);
    }
  };

  useEffect(() => {
    ref.current = 0;
    requestAnimationFrame(accumulator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration]);

  return count;
};
