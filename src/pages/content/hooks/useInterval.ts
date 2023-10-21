'use client';
import { INTERVAL } from '@root/src/constants';
import { storageController } from '@root/src/modules/StoreController';
import { useEffect, useState } from 'react';

export interface TM_FILENAME_BASEProps {}

const useInterval = () => {
  const [intervalTime, setIntervalState] = useState<number>(INTERVAL.DEFAULT);

  useEffect(() => {
    (async () => {
      const intervalTime =
        (await storageController.getPortalIntervalTime()) ?? INTERVAL.DEFAULT;
      intervalTime && setIntervalState(intervalTime);
    })();
  }, []);

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

  return {
    intervalTime,
  };
};

export default useInterval;
