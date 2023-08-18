import { styled } from 'styled-components';

interface QuestionProps {
  children: React.ReactNode;
}

export const Question = ({ children }: QuestionProps) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  padding: 2rem;
`;
