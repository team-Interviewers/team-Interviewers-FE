import { Question } from '@root/src/pages/content/types/question';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const GITHUB_RAW_URL =
  'https://raw.githubusercontent.com/team-Interviewers/team-interviewers-questions/main/questions.json';

const getQuestionData = async (): Promise<Question[]> => {
  const { data } = await axios.get<Question[]>(GITHUB_RAW_URL);

  return data;
};

const GET_QUESTION_KEY = ['questions'];

export const useGETQuestionQuery = () => {
  return useQuery(GET_QUESTION_KEY, getQuestionData);
};
