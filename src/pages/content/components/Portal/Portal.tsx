import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { darkTheme } from '../../utils/theme';
import ContentLayer from '../ContentLayer';
import { storageController } from '@root/src/modules/StoreController';

export default function Portal() {
  // NOTE : 일단 편의를 위해서 모달이 계속 열려있도록 하였습니다.
  const { isOpen, Modal, openModal, closeModal } = useModal();

  const [interval, setIntervalState] = useState(
    storageController.getPortalIntervalTime() || 6000
  );

  useEffect(() => {
    const timer = setInterval(openModal, interval);

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
    <>
      <ThemeProvider theme={darkTheme}>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <>{`${interval}!!`}</>
          <ContentLayer closeModal={closeModal} />
        </Modal>
      </ThemeProvider>
    </>
  );
}
