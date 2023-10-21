import { ChangeEvent, useState } from 'react';
import { Question } from '../types/question';

interface UseUserAnswerReturn {
  isCorrect: boolean;
  answer: string;
  handleChange: (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => void;
  resetAnswer: () => void;
  isSubmitted: boolean;
  setSubmitted: () => void;
  resetSubmitted: () => void;
}

interface UseUserAnswerProps {
  question: Question | undefined;
}

/**
 * 사용자의 답을 관리하는 커스텀 훅
 * @param question 문제
 * @example
 * const { answer, isCorrect, handleChange } = useUserAnswer(question);
 */

const useUserAnswer = ({
  question,
}: UseUserAnswerProps): UseUserAnswerReturn => {
  const [answer, setAnswer] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => {
    setAnswer(e.target.value);
  };

  const isCorrect = answer === question?.correct;

  const resetAnswer = () => {
    setAnswer('');
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const setSubmitted = () => {
    setIsSubmitted(true);
  };

  const resetSubmitted = () => {
    setIsSubmitted(false);
  };

  return {
    answer,
    isCorrect,
    isSubmitted,
    handleChange,
    resetAnswer,
    setSubmitted,
    resetSubmitted,
  };
};

export default useUserAnswer;
