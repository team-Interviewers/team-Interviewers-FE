import { useState } from 'react';

interface UseLifeReturn {
  lifeCount: number;
  reset: () => void;
  decrement: () => void;
}

/**
 * 사용자의 라이프를 관리하는 커스텀 훅
 * @param _lifeCount 라이프 개수
 * @example
 * const { lifeCount, reset, decrement } = useLife(3);
 */

const useLife = (_lifeCount = 3): UseLifeReturn => {
  const [lifeCount, setLifeCount] = useState(_lifeCount);

  const reset = () => setLifeCount(_lifeCount);

  const decrement = () =>
    setLifeCount((prevLifeCount) => {
      if (prevLifeCount === 0) return 0;
      return prevLifeCount - 1;
    });

  return {
    lifeCount,
    reset,
    decrement,
  };
};

export default useLife;
