import { useClickSpy } from '../../event';
import { useModal } from '../../hooks/useModal';
import { Question } from '../Question';

export default function Portal() {
  const { Modal, isOpen, openModal, closeModal } = useModal();

  useClickSpy(isOpen ? closeModal : openModal);

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <Question>{'문제입니다.'}</Question>
        </Modal>
      )}
    </>
  );
}
