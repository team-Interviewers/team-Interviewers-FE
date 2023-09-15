import { ThemeProvider } from 'styled-components';

import { darkTheme } from '../../utils/theme';
import ContentLayer from '../ContentLayer';
import ToastList from '@root/src/shared/ui/toast/ToastList';
import useTrigger from '../../hooks/useTrigger';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const SETTING_TIME = 3;

export default function Portal() {
  const queryClient = new QueryClient();
  const { Modal, isOpen, closeModal } = useTrigger({ time: SETTING_TIME });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <ToastList />
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <ContentLayer closeModal={closeModal} />
        </Modal>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
