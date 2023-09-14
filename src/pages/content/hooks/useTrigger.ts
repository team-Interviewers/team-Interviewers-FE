import { useEffect, useState } from 'react';
import useTimer from './useTimer';
import { useModal } from './useModal';
import useLife from './useLife';

interface TriggerProps {
  time?: number;
}

const useTrigger = ({ time = 60 * 60 }: TriggerProps) => {
  const { isOpen, Modal, openModal, closeModal: _closeModal } = useModal();
  const { start, reset, isActive } = useTimer(time);

  const [isUserOff, setIsUserOff] = useState(false);
  const { lifeCount } = useLife();

  // 최초에 사용자가 브라우저를 열면 타이머 시작
  useEffect(() => {
    if (lifeCount === 0) return;
    if (!isActive && !isOpen) {
      start();
    }
  }, [isActive, isOpen, lifeCount]);

  console.log('lifeCount', lifeCount);

  // 시간이 다 되면 모달 열기
  useEffect(() => {
    if (lifeCount === 0) return;
    if (!isActive && !isOpen && !isUserOff) {
      openModal();
    }
  }, [isActive, isOpen, isUserOff, lifeCount]);

  // 사용자가 모달을 닫으면 타이머 초기화
  useEffect(() => {
    if (lifeCount === 0) return;
    if (!isOpen) {
      reset();
      setIsUserOff(false);
    }
  }, [isOpen, lifeCount]);

  const closeModal = () => {
    _closeModal();
    setIsUserOff(true);
  };

  return {
    Modal,
    isOpen,
    closeModal,
    openModal,
  };
};

export default useTrigger;
