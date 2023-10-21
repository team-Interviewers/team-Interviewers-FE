export type QuestionTag = 'DB' | 'Network' | 'Java' | 'CS' | 'DS' | 'OS';
export interface UserConfig {
  question: QuestionConfig;
  trigger: TriggerConfig;
  life: LifeConfig;
  time: Date;
}

export type QuestionConfig = {
  tags: QuestionTag[];
  interval: number;
};

export type TriggerConfig = {
  isOpen: boolean;
};

export type LifeConfig = {
  lifeCount: number;
};
