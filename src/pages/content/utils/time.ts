/**
 *
 * @param seconds 시간 (초)
 * @example
 * formatTime(10); // 00:10
 */

const formatTime = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, '0')}:${sec
    .toString()
    .padStart(2, '0')}`;
};

export { formatTime };
