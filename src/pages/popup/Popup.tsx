import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import { Tags } from '@pages/popup/components/Tag';
import styled from 'styled-components';

const Popup = () => {
  return (
    <div className="App">
      <Wrapper>
        <Tags />
      </Wrapper>
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
