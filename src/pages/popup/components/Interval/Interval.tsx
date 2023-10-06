import { INTERVAL } from '@root/src/constants';
import { storageController } from '@src/modules/StoreController';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Interval = () => {
  const [intervalTime, setIntervalTime] = useState<number>(INTERVAL.DEFAULT);

  useEffect(() => {
    (async () => {
      const intervalTime = await storageController.getPortalIntervalTime();
      setIntervalTime(intervalTime || INTERVAL.DEFAULT);
    })();
  }, []);

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
      <Title htmlFor="intervalRange">Portal Interval (m): {intervalTime}</Title>
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
  gap: 0.25rem;
  padding-top: 0.5rem;
`;

const Title = styled.label``;

const RangeInput = styled.input`
  overflow: hidden;
  height: 0.5rem;
  -webkit-appearance: none;
  background: rgba(111, 111, 111, 0.6);

  :focus {
    outline: none;
  }

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 5px;
    background: #30b198;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 100%;
    background: whitesmoke;
    border: none;
    cursor: pointer;
    box-shadow: -100vw 0 0 100vw #30b198;
  }
`;
