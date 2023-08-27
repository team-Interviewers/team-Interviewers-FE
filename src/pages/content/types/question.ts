export interface Question {
  question: string;
  choices: string[];
  correct: string;
  explanation: string;
  sources: string[];
  tags: string[];
}

export type Questions = Question[];

export type QuestionType = 'objective' | 'subjective';

export enum QUESTION_TYPE {
  OBJECTIVE = 'objective',
  SUBJECTIVE = 'subjective',
}
