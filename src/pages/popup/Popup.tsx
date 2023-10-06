import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import { Interval, Tags } from '@root/src/pages/popup/components';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from '../content/utils/theme';

const Popup = () => {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <Wrapper>
          <LeftMenu>
            <Tags />
            <Interval />
          </LeftMenu>
        </Wrapper>
      </ThemeProvider>
    </div>
  );
};

export default withSuspense(Popup);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: flex-start;
  color: white;
  height: 100%;
  background: #282c34;
`;

const LeftMenu = styled.div`
  gap: 0.25rem;
  display: flex;
  flex-direction: column;
`;
