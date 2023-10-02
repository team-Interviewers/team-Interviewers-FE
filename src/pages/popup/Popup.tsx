import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import { Interval, Tags } from '@root/src/pages/popup/components';
import styled, { ThemeProvider } from 'styled-components';
import Button from '../content/components/Button';
import { storageController } from '@root/src/modules/StoreController';
import { lightTheme } from '../content/utils/theme';

const Popup = () => {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <Wrapper>
          <Button onClick={() => storageController.resetStorage()}>리셋</Button>
          <Tags />
          <Interval />
        </Wrapper>
      </ThemeProvider>
    </div>
  );
};

export default withSuspense(Popup);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  align-items: flex-start;
  color: white;
`;
