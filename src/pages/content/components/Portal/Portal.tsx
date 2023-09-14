import { ThemeProvider } from 'styled-components';

import { darkTheme } from '../../utils/theme';
import ContentLayer from '../ContentLayer';
import ToastList from '@root/src/shared/ui/toast/ToastList';
import useTrigger from '../../hooks/useTrigger';

const SETTING_TIME = 3;

export default function Portal() {
  const { Modal, isOpen, closeModal } = useTrigger({ time: SETTING_TIME });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ToastList />
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <ContentLayer closeModal={closeModal} />
        </Modal>
      </ThemeProvider>
    </>
  );
}
