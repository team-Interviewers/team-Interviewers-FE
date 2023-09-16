import { UserConfig, QuestionTag } from '@src/types';

export const QUESTION_TAGS = [
  'DB',
  'Network',
  'Java',
  'CS',
  'DS',
  'OS',
] as QuestionTag[];

export const DEFAULT_USER_CONFIG: UserConfig = {
  question: {
    tags: QUESTION_TAGS,
    interval: 2000,
  },
};

export const LOCAL_STORAGE = Object.freeze({
  KEY: Object.freeze({
    USER_CONFIG: 'userConfig',
  }),
});
