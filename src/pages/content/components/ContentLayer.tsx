import { useEffect } from 'react';
import { styled } from 'styled-components';
import useTimer from '../hooks/useTimer';
import useUserAnswer from '../hooks/useUserAnswer';
import Answer from './Answer';
import Button from './Button';
import Question from './Question';
import useToast from '@root/src/shared/ui/toast/useToast';
import Description from './Description';
import useQuestion from '../hooks/useQuestion';

interface ContentLayerProps {
  lifeCount: number;
  decreaseLifeCount: () => void;
  closeModal: () => void;
}

const ContentLayer = ({
  lifeCount,
  decreaseLifeCount,
  closeModal,
}: ContentLayerProps) => {
  const { fireToast } = useToast();
  const { question } = useQuestion();

  const {
    isCorrect,
    answer,
    isSubmitted,
    handleChange,
    resetAnswer,
    setSubmitted,
  } = useUserAnswer({
    question,
  });

  // 타이머
  const { formattedTime, start, isActive } = useTimer(60 * 5);
  useEffect(() => {
    start();
  }, []);

  const handleSubmit = () => {
    // 입력값이 없을 경우
    if (!answer) {
      fireToast({ message: '정답을 입력해주세요!', mode: 'ERROR' });
      return;
    }
    // 정답일 경우
    if (isCorrect) fireToast({ message: '정답입니다!' });
    // 오답일 경우
    if (!isCorrect) {
      fireToast({ message: '오답입니다!', mode: 'DELETE' });
      if (lifeCount === 1) {
        fireToast({ message: '라이프가 모두 소진되었습니다!', mode: 'ERROR' });
      }
      decreaseLifeCount();
    }
    resetAnswer();
    setSubmitted();
  };

  useEffect(() => {
    if (isActive === false) {
      fireToast({ message: '시간이 초과되었습니다!', mode: 'ERROR' });
      decreaseLifeCount();
      resetAnswer();
      setSubmitted();
    }
  }, [isActive]);

  if (!question) return null;

  return (
    <>
      {!isSubmitted && (
        <>
          <ModalWrapper>
            {/* <Tags /> */}
            <Question formattedTime={formattedTime} closeModal={closeModal}>
              <Question.Question>{question.question}</Question.Question>
              <Question.Answer>
                <Answer
                  question={question}
                  answer={answer}
                  mode="question"
                  handleChange={handleChange}
                />
              </Question.Answer>
              <Question.Life>{lifeCount}</Question.Life>
              <Question.Submit>
                <Button height={2.5} onClick={handleSubmit}>
                  <ButtonText>제출하기</ButtonText>
                </Button>
              </Question.Submit>
            </Question>
          </ModalWrapper>
        </>
      )}
      {!!isSubmitted && (
        <ModalWrapper>
          <Description closeModal={closeModal}>
            <Description.Question>{question.question}</Description.Question>
            {!!question.explanation && (
              <Description.Description>
                {question.explanation}
              </Description.Description>
            )}
            <Description.Answer>
              <Answer
                question={question}
                answer={answer}
                mode="description"
                handleChange={handleChange}
              />
            </Description.Answer>
            <Description.Close>
              <Button onClick={closeModal}>
                <ButtonText>닫기</ButtonText>
              </Button>
            </Description.Close>
          </Description>
        </ModalWrapper>
      )}
    </>
  );
};

export default ContentLayer;

const ModalWrapper = styled.div`
  position: relative;
  width: 50vw;
  max-height: 70vh;

  background-color: ${({ theme }) => theme.background.default};
  padding: 20px;
  border-radius: 10px;
`;

const ButtonText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 13px;
  padding: 0 10px;
`;
