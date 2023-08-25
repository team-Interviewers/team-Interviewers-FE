export interface Question {
  question: string;
  choices: string[];
  correct: string;
  explanation: string;
  sources: string[];
  tags: string[];
}

export type Questions = Question[];
