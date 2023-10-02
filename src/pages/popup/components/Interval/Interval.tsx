import { INTERVAL } from '@root/src/constants';
import { storageController } from '@src/modules/StoreController';
import { useState } from 'react';
import styled from 'styled-components';

export const Interval = () => {
  const [intervalTime, setIntervalTime] = useState<number>(
    () => storageController.getPortalIntervalTime() || INTERVAL.DEFAULT
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
    <Wrapper>
      <Title htmlFor="intervalRange">Portal Interval (s): {intervalTime}</Title>
      <RangeInput
        id="intervalRange"
        type="range"
        min="1"
        max="60"
        step="1"
        value={intervalTime}
        onChange={handleRangeChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 1rem 1rem;
  gap: 0.25rem;
`;

const Title = styled.label``;

const RangeInput = styled.input`
  width: 100%;
`;
