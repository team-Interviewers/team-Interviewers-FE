export type QuestionTag = 'DB' | 'Network' | 'Java' | 'CS' | 'DS' | 'OS';
export interface UserConfig {
  question: QuestionConfig;
}

export type QuestionConfig = {
  tags: QuestionTag[];
};
