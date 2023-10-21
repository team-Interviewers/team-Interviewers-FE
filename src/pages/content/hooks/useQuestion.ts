import { useEffect, useState } from 'react';
import type { Question as QuestionType } from '../types/question';
import { getFilteredQuestion } from '../utils/question';
import useTags from './useTags';
import { useGETQuestionQuery } from '@root/src/shared/api/question';

const useQuestion = () => {
  const { data: QuestionsData } = useGETQuestionQuery();
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const { selectedTags } = useTags();

  useEffect(() => {
    try {
      if (!QuestionsData?.length || !selectedTags?.length) return;
      setQuestion(getFilteredQuestion(selectedTags, QuestionsData));
    } catch (error) {
      console.error(error);
    }
  }, [selectedTags, QuestionsData]);

  return { question };
};

export default useQuestion;
