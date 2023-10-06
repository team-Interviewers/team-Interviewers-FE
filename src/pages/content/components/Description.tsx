import React, { Children, isValidElement } from 'react';
import styled from 'styled-components';
import ButtonContainer from './ButtonContainer';
import { AiOutlineClose as CloseIcon } from 'react-icons/ai';

interface CommonProps {
  children: React.ReactNode;
}

interface DescriptionProps extends CommonProps {
  closeModal: () => void;
}

const Description = ({ children, closeModal }: DescriptionProps) => {
  let bottom = [];
  const otherChildren = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === Description.Close) {
      bottom = [...bottom, child];
      return null;
    }
    return child;
  });
  return (
    <Wrapper>
      <TopWrapper>
        <Top>
          <ButtonContainer onClick={closeModal}>
            <CloseIcon color="white" size={24} />
          </ButtonContainer>
        </Top>
        <Middle>{otherChildren}</Middle>
      </TopWrapper>

      <Bottom>{bottom}</Bottom>
    </Wrapper>
  );
};

export default Description;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: stretch;
  align-content: space-between;
  height: 100%;
  flex-grow: 1;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

Description.Question = ({ children }: CommonProps) => {
  return (
    <QuestionWrapper>
      <Title>❓ : {children}</Title>
    </QuestionWrapper>
  );
};

const QuestionWrapper = styled.div`
  display: flex;
`;

const Title = styled.span`
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 1.5rem;
`;

Description.Description = ({ children }: CommonProps) => {
  return (
    <DescriptionWrapper>
      <DescriptionText>📖 : {children}</DescriptionText>
    </DescriptionWrapper>
  );
};

const DescriptionWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  background-color: ${(props) => props.theme.palette.grey700};
  padding: 10px;
  border-radius: 8px;
`;

const DescriptionText = styled.span`
  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

Description.Answer = ({ children }: CommonProps) => {
  return <AnswerWrapper>{children}</AnswerWrapper>;
};

const AnswerWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

Description.Close = ({ children }: CommonProps) => {
  return <SubmitWrapper>{children}</SubmitWrapper>;
};

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
