import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useLife from '../hooks/useLife';
import useTimer from '../hooks/useTimer';
import useUserAnswer from '../hooks/useUserAnswer';
import type { Question as QuestionType } from '../types/question';
import { getFilteredQuestion } from '../utils/question';
import Answer from './Answer';
import Button from './Button';
import Question from './Question';
import useToast from '@root/src/shared/ui/toast/useToast';
import Description from './Description';
import { useGETQuestionQuery } from '@root/src/shared/api/question';

interface ContentLayerProps {
  closeModal: () => void;
}

const ContentLayer = ({ closeModal }: ContentLayerProps) => {
  const { fireToast } = useToast();
  const { data: QuestionsData } = useGETQuestionQuery();

  console.log(QuestionsData);

  // 타이머
  const { formattedTime, start } = useTimer(60 * 5);
  useEffect(() => {
    start();
  }, []);

  // 1. 문제 랜덤으로 가져오기
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 1-1. popup의 option 메시지로 받아와 tag update. 다만, state는 휘발성 메모리이기 때문에 추후 localStorage 써야 할 듯
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const messageListener = (message: any) => {
      if (message.message === 'SELECTED_TAGS_UPDATE')
        setSelectedTags(message.tags);
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  useEffect(() => {
    try {
      setQuestion(getFilteredQuestion(selectedTags, QuestionsData ?? []));
      setIsSubmitted(false);
    } catch (error) {
      console.error(error);
    }
  }, [selectedTags, QuestionsData]);

  // 2. 사용자 정답 작성 및 확인
  const { isCorrect, answer, handleChange, resetAnswer } = useUserAnswer({
    question,
  });

  // 3. 사용자 라이프 감소
  const { lifeCount, decrement } = useLife();

  const handleSubmit = () => {
    // 입력값이 없을 경우
    if (!answer) {
      fireToast({ message: '정답을 입력해주세요!', mode: 'ERROR' });
      return;
    }
    // 정답일 경우
    if (isCorrect) {
      fireToast({ message: '정답입니다!' });
    }
    // 오답일 경우
    if (!isCorrect) {
      fireToast({ message: '오답입니다!', mode: 'DELETE' });
      if (lifeCount === 1) {
        fireToast({ message: '라이프가 모두 소진되었습니다!', mode: 'ERROR' });
      }
      decrement();
    }
    resetAnswer();
    setIsSubmitted(true);
  };

  if (!question) return null;

  return (
    <>
      {!isSubmitted && (
        <>
          <ModalWrapper>
            <div>
              {selectedTags.map((v) => (
                <div>{`${v}!!`}</div>
              ))}
            </div>
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
                <Button onClick={handleSubmit}>
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
