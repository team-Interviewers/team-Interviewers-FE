import { useState, useCallback } from 'react';
import { Modal } from '../components/Modal';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return {
    Modal,
    isOpen,
    openModal,
    closeModal,
  };
};
