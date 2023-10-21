import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../../utils/theme';
import ContentLayer from '../ContentLayer';
import ToastList from '@root/src/shared/ui/toast/ToastList';
import useTrigger from '../../hooks/useTrigger';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useInterval from '../../hooks/useInterval';

const queryClient = new QueryClient();

export default function Portal() {
  const { intervalTime } = useInterval();

  const { Modal, isOpen, lifeCount, closeModal, decreaseLifeCount } =
    useTrigger({
      time: intervalTime,
    });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <ToastList />
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <ContentLayer
            lifeCount={lifeCount}
            decreaseLifeCount={decreaseLifeCount}
            closeModal={closeModal}
          />
        </Modal>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
