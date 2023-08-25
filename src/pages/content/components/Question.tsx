import { Children, isValidElement } from 'react';
import {
  AiOutlineClose as CloseIcon,
  AiFillHeart as HeartIcon,
} from 'react-icons/ai';
import { RiTimerLine as TimerIcon } from 'react-icons/ri';
import { styled } from 'styled-components';
import IconWrapper from './IconWrapper';

interface CommonProps {
  children: React.ReactNode;
}

interface QuestionProps extends CommonProps {
  formattedTime: string;
  closeModal: () => void;
}

const Question = ({ children, formattedTime, closeModal }: QuestionProps) => {
  let actions = [];
  const otherChildren = Children.map(children, (child) => {
    if (
      isValidElement(child) &&
      (child.type === Question.Life || child.type === Question.Submit)
    ) {
      actions = [...actions, child];
      return null;
    }
    return child;
  });

  return (
    <>
      <Top>
        <TimerWrapper>
          <TimerIcon color="yellow" size={24} />
          <Time>{formattedTime}</Time>
        </TimerWrapper>
        <IconWrapper onClick={closeModal}>
          <CloseIcon color="white" size={24} />
        </IconWrapper>
      </Top>
      <Middle>{otherChildren}</Middle>
      <Bottom>{actions}</Bottom>
    </>
  );
};

Question.Question = ({ children }: CommonProps) => {
  return (
    <QuestionWrapper>
      <Title>{children}</Title>
    </QuestionWrapper>
  );
};

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const Time = styled.span`
  color: white;
  font-size: 16px;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const QuestionWrapper = styled.div`
  display: flex;
`;

const Title = styled.div`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

Question.Answer = ({ children }: CommonProps) => {
  return <>{children}</>;
};

Question.Life = ({ children }: CommonProps) => {
  return (
    <LifeWrapper>
      <HeartIcon color="red" size={24} />
      <LifeText>{` : ${children}`}</LifeText>
    </LifeWrapper>
  );
};

const LifeWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
`;

const LifeText = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

Question.Submit = ({ children }: CommonProps) => {
  return <SubmitWrapper>{children}</SubmitWrapper>;
};

const SubmitWrapper = styled.div`
  display: flex;
  padding-right: 40px;
`;

export default Question;
