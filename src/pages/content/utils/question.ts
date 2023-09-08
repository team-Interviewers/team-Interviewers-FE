import { Question, Questions } from '../types/question';
import { MESSAGE } from '@src/pages/content/constants';

export const getRandomQuestion = (questions: Questions): Question => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

export const getFilteredQuestion = (
  selectedTags: string[],
  questions: Questions
): Question => {
  const filteredQuestions = questions.filter(
    (question) =>
      selectedTags.length === 0 ||
      selectedTags.some((tag) => question.tags.includes(tag))
  );

  if (filteredQuestions.length === 0)
    throw new Error(MESSAGE.ERROR.QUESTION_NOT_FOUND);

  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);

  return filteredQuestions[randomIndex];
};
