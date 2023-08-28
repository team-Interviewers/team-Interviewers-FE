import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { darkTheme } from '../../utils/theme';
import ContentLayer from '../ContentLayer';

export default function Portal() {
  // NOTE : 일단 편의를 위해서 모달이 계속 열려있도록 하였습니다.
  const { isOpen, Modal, openModal, closeModal } = useModal();
  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <ContentLayer closeModal={closeModal} />
        </Modal>
      </ThemeProvider>
    </>
  );
}
