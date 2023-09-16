import { Tag } from '@pages/popup/Tag';
import styled from 'styled-components';

export const Tags = () => {
  return (
    <Wrapper>
      <Title>Tags</Title>
      <TagList>
        {['DB', 'Network', 'Java', 'CS', 'DS', 'OS'].map((tag) => (
          <Tag tag={tag} />
        ))}
      </TagList>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  gap: 0.5rem;
  max-height: 232px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: start;
`;

const TagList = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 0.25rem;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  height: 100%;
  max-width: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;
