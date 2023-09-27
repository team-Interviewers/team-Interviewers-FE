export type QuestionTag = 'DB' | 'Network' | 'Java' | 'CS' | 'DS' | 'OS';
export interface UserConfig {
  question: QuestionConfig;
  trigger: TriggerConfig;
}

export type QuestionConfig = {
  tags: QuestionTag[];
  interval: number;
};

export type TriggerConfig = {
  isOpen: boolean;
};
