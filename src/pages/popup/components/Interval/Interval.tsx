import { storageController } from '@src/modules/StoreController';
import { useState } from 'react';
import styled from 'styled-components';

export const Interval = () => {
  const [intervalTime, setIntervalTime] = useState<number>(
    () => storageController.getPortalIntervalTime() || 6000
  );

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setIntervalTime(newValue);
    storageController.setPortalIntervalTime(newValue);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: 'UPDATE_INTERVAL',
        interval: newValue,
      });
    });
  };

  return (
    <RangeWrapper>
      <label htmlFor="intervalRange">
        Portal Interval (ms): {intervalTime}
      </label>
      <RangeInput
        id="intervalRange"
        type="range"
        min="1000"
        max="10000"
        step="1000"
        value={intervalTime}
        onChange={handleRangeChange}
      />
    </RangeWrapper>
  );
};

const RangeWrapper = styled.div`
  margin-top: 1rem;
`;

const RangeInput = styled.input`
  width: 100%;
`;
