import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../../utils/theme';
import ContentLayer from '../ContentLayer';
import ToastList from '@root/src/shared/ui/toast/ToastList';
import useTrigger from '../../hooks/useTrigger';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { storageController } from '@root/src/modules/StoreController';
import { INTERVAL } from '@root/src/constants';

export default function Portal() {
  const queryClient = new QueryClient();
  const SETTING_TIME = 3;
  const { Modal, isOpen, closeModal } = useTrigger({ time: SETTING_TIME });

  const [interval, setIntervalState] = useState(
    storageController.getPortalIntervalTime() || INTERVAL.DEFAULT
  );

  useEffect(() => {
    const timer = setInterval(openModal, interval * 60 * 1000);

    return () => clearInterval(timer);
  }, [interval]);

  useEffect(() => {
    const messageListener = (message: any) => {
      if (message.message === 'UPDATE_INTERVAL') {
        setIntervalState(message.interval);
        storageController.setPortalIntervalTime(message.interval);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);
  
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
