import { useEffect, useReducer } from 'react';
import useTimer from './useTimer';
import { useModal } from './useModal';
import { storageController } from '@root/src/modules/StoreController';

interface TriggerProps {
  time?: number;
}

interface TriggerState {
  lifeCount: number;
  isStop: boolean;
  isActive: boolean;
}

type TriggerAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SET_GLOBAL_TRIGGER'; action: boolean }
  | { type: 'SET_LIFE_COUNT'; action: number };

const triggerReducer = (state: TriggerState, action: TriggerAction) => {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isActive: true };
    case 'CLOSE':
      return { ...state, isActive: false };
    case 'SET_GLOBAL_TRIGGER':
      return { ...state, isActive: action.action };
    case 'SET_LIFE_COUNT':
      return { ...state, lifeCount: action.action };
    default:
      throw new Error('Unhandled action');
  }
};

const useTrigger = ({ time }: TriggerProps) => {
  const {
    isOpen,
    Modal,
    openModal: _openModal,
    closeModal: _closeModal,
  } = useModal();
  const { start, reset, pause, isActive } = useTimer(time);

  const [state, dispatch] = useReducer(triggerReducer, {
    lifeCount: 3,
    isStop: false,
    isActive: false,
  });

  // 최초 타이머 시작
  useEffect(() => {
    start();
  }, []);

  // 1. 라이프 카운트 초기화
  useEffect(() => {
    (async () => {
      const lifeCount = await storageController.getLifeCount();
      dispatch({ type: 'SET_LIFE_COUNT', action: lifeCount });
    })();
  }, []);

  // 2. 모달 열림
  const openModal = async () => {
    const globalTrigger = await storageController.getTriggerStatus();
    if (state.lifeCount === 0) return;
    if (!globalTrigger && !state.isActive) {
      dispatch({ type: 'OPEN' });
      await storageController.setTriggerStatus(true);
      dispatch({ type: 'SET_GLOBAL_TRIGGER', action: true });
      // NOTE : 창이 닫힐 때 트리거 상태를 false로 변경
      window.onbeforeunload = async () => {
        await storageController.setTriggerStatus(false);
      };
      _openModal();
    } else {
      pause();
    }
  };

  // 2-1. 모달 열림
  useEffect(() => {
    if (!isActive) {
      openModal();
    }
  }, [isActive]);

  // 3. 모달 닫힘
  const closeModal = async () => {
    dispatch({ type: 'CLOSE' });
    dispatch({ type: 'SET_GLOBAL_TRIGGER', action: false });
    await storageController.setTriggerStatus(false);
    reset();
    _closeModal();
  };

  // 4. 라이프 차감
  const decreaseLifeCount = () => {
    const lifeCount = state.lifeCount;
    if (lifeCount === 0) return;
    dispatch({ type: 'SET_LIFE_COUNT', action: lifeCount - 1 });
    storageController.setLifeCount(lifeCount - 1);
  };

  return {
    Modal,
    isOpen,
    closeModal,
    openModal,
    lifeCount: state.lifeCount,
    decreaseLifeCount,
  };
};

export default useTrigger;
