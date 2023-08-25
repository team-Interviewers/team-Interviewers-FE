import { useEffect, useState } from 'react';
import { formatTime } from '../utils/time';

interface UseTimerReturn {
  formattedTime: string;
  isActive: boolean;
  start: () => void;
  pause: () => void;
}

/**
 * 사용자의 타이머를 관리하는 커스텀 훅
 * @param initialTime 시작 시간 (초)
 * @example
 * const { formattedTime, isActive, start, pause } = useTimer(10);
 */

const useTimer = (initialTime: number): UseTimerReturn => {
  const [time, setTime] = useState(initialTime);
  const [formattedTime, setFormattedTime] = useState(formatTime(initialTime));
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(intervalId);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, time]);

  useEffect(() => {
    setFormattedTime(formatTime(time));
  }, [time]);

  const start = () => setIsActive(true);

  const pause = () => setIsActive(false);

  return {
    formattedTime,
    isActive,
    start,
    pause,
  };
};

export default useTimer;