import { useEffect, useState } from 'react';
import useTimer from './useTimer';
import { useModal } from './useModal';
import useLife from './useLife';
import { storageController } from '@root/src/modules/StoreController';

interface TriggerProps {
  time?: number;
}

const useTrigger = ({ time = 60 * 60 }: TriggerProps) => {
  const { isOpen, Modal, openModal, closeModal: _closeModal } = useModal();
  const [globalTrigger, setGlobalTrigger] = useState(false);
  const { start, reset, isActive, isStop, pause } = useTimer(time);

  const [isUserOff, setIsUserOff] = useState(false);
  const { lifeCount } = useLife();

  // 최초에 사용자가 브라우저를 열면 타이머 시작
  useEffect(() => {
    if (lifeCount === 0) return;
    if (isStop) return;
    if (!isActive && !isOpen) {
      start();
    }
  }, [isActive, isOpen, lifeCount, isStop]);

  // 시간이 다 되면 모달 열기
  useEffect(() => {
    if (lifeCount === 0) return;
    if (isStop) return;
    if (!isActive && !isOpen && !isUserOff) {
      openModal();
    }
  }, [isActive, isOpen, isUserOff, lifeCount, isStop]);

  useEffect(() => {
    if (isOpen) {
      (async () => {
        const globalTrigger = await storageController.getTriggerStatus();
        if (!globalTrigger) {
          setGlobalTrigger(true);
          storageController.setTriggerStatus(true);
        }
      })();
    }
  }, [isOpen]);

  useEffect(() => {
    (async () => {
      const globalTrigger = await storageController.getTriggerStatus();
      if (globalTrigger) {
        setTimeout(() => {
          pause();
        }, 500);
        window.addEventListener('beforeunload', () => {
          storageController.setTriggerStatus(false);
        });
        return;
      }
    })();
  }, []);

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
    reset();
    storageController.setTriggerStatus(false);
    setGlobalTrigger(false);
  };

  return {
    Modal,
    isOpen: globalTrigger,
    closeModal,
    openModal,
  };
};

export default useTrigger;
