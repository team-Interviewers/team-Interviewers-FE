import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import QuestionsData from '../../../../questions/questions.json';
import useLife from '../hooks/useLife';
import useTimer from '../hooks/useTimer';
import useUserAnswer from '../hooks/useUserAnswer';
import type { Question as QuestionType } from '../types/question';
import { getFilteredQuestion, getRandomQuestion } from '../utils/question';
import Answer from './Answer';
import Button from './Button';
import Question from './Question';

interface ContentLayerProps {
  closeModal: () => void;
}

const ContentLayer = ({ closeModal }: ContentLayerProps) => {
  // 타이머
  const { formattedTime, isActive, start } = useTimer(60 * 5);
  useEffect(() => {
    start();
  }, []);
  useEffect(() => {
    if (!isActive) {
      alert('시간이 초과되었습니다!');
      decrement();
    }
  }, [isActive]);

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
      setQuestion(getFilteredQuestion(selectedTags, QuestionsData));
      setIsSubmitted(false);
    } catch (error) {
      console.error(error);
    }
  }, [isSubmitted, selectedTags]);

  // 2. 사용자 정답 작성 및 확인
  const { isCorrect, answer, handleChange, resetAnswer } = useUserAnswer({
    question,
  });

  // 3. 사용자 라이프 감소
  // TODO : 전역으로 관리가 필요해 보임
  const { lifeCount, decrement } = useLife();

  const handleSubmit = () => {
    // 입력값이 없을 경우
    if (!answer) {
      alert('답을 입력해주세요!');
      return;
    }
    // 정답일 경우
    if (isCorrect) {
      alert('정답입니다!');
      setIsSubmitted(true);
      resetAnswer();
    }
    // 오답일 경우
    if (!isCorrect) {
      alert('오답입니다!');
      decrement();
    }
  };
  return (
    <>
      {question && (
        <ModalWrapper>
          <div>
            !!
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
      )}
    </>
  );
};

export default ContentLayer;

const ModalWrapper = styled.div`
  position: relative;
  width: 50vw;
  min-height: 40vh;
  max-height: 50vh;
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
