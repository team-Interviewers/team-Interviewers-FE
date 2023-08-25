import { Question, Questions } from '../types/question';

export const getRandomQuestion = (questions: Questions): Question => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};
