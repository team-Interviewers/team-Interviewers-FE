import { UserConfig, QuestionTag } from '@src/types';
import { INTERVAL } from './interval';

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
    interval: INTERVAL.DEFAULT,
  },
  trigger: {
    isOpen: false,
  },
  life: {
    lifeCount: 3,
  },
};

export const LOCAL_STORAGE = Object.freeze({
  KEY: Object.freeze({
    USER_CONFIG: 'userConfig',
  }),
});
