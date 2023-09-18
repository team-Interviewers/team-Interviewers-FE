import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import { Interval, Tags } from '@root/src/pages/popup/components';
import styled from 'styled-components';

const Popup = () => {
  return (
    <div className="App">
      <Wrapper>
        <Tags />
        <Interval />
      </Wrapper>
    </div>
  );
};

export default withSuspense(Popup);

const Wrapper = styled.div`
  display: flex;
  padding: 0 0.5rem;
  align-items: flex-start;
  color: white;
`;
