import { StorageType, createStorage } from '@root/src/shared/storages/base';
import { useEffect, useState } from 'react';

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
  // 1. 라이프 개수를 관리하는 state
  const [lifeCount, setLifeCount] = useState(0);
  const { get: getLife, set: setLife } = createStorage('life', _lifeCount, {
    storageType: StorageType.Local,
  });

  // 1-1 라이프 개수를 로컬 스토리지에서 가져옴
  useEffect(() => {
    (async () => {
      const lifeCount = await getLife();
      setLifeCount(lifeCount);
    })();
  }, [getLife]);

  // 1-2 라이프 감소
  const decrement = () => {
    if (lifeCount > 0) {
      setLifeCount(lifeCount - 1);
      setLife(lifeCount - 1);
    }
  };

  // 1-3 라이프 초기화
  const reset = () => setLife(_lifeCount);

  // 2. 라이프 초기화 조건을 담당하는 state
  const { get: getDate, set: setDate } = createStorage('dateSave', 9999, {
    storageType: StorageType.Local,
  });

  // 2-1 로컬 저장 일과 현재 일이 다르면 라이프 초기화
  useEffect(() => {
    (async () => {
      const time = await getDate();
      if (time) {
        const today = new Date();
        if (today.getDate() !== time) {
          reset();
          setDate(today.getDate());
        }
      } else {
        setDate(new Date().getDate());
      }
      const lifeCount = await getLife();
      setLifeCount(lifeCount);
    })();
  }, []);

  return {
    lifeCount,
    reset,
    decrement,
  };
};

export default useLife;
