import { UserConfig } from '@src/types';
import { LOCAL_STORAGE, DEFAULT_USER_CONFIG } from '@src/constants';
import { ChromeStorage } from './ChromeStorage';

/**
 * 휘발성 데이터를 저장하는 Controller.
 * 현재는 LocalStorage의 인스턴스를 사용하며, 추후엔 DB관련된 메서드 추상화.
 */
export class StorageController {
  constructor(private storage: ChromeStorage) {}

  async getUserConfig(): Promise<UserConfig> {
    const userConfig = (await this.storage.get(
      LOCAL_STORAGE.KEY.USER_CONFIG
    )) as UserConfig;

    if (userConfig === null) {
      this.storage.set(LOCAL_STORAGE.KEY.USER_CONFIG, DEFAULT_USER_CONFIG);
      return DEFAULT_USER_CONFIG;
    }
    return userConfig;
  }

  /* Tags */
  async getUserTags() {
    const {
      question: { tags },
    } = await this.getUserConfig();

    return tags;
  }

  async setUserTags(newTags) {
    const userConfig = await this.getUserConfig();
    const newUserConfig = {
      ...userConfig,
      question: { ...userConfig.question, tags: newTags },
    };

    this.storage.set(LOCAL_STORAGE.KEY.USER_CONFIG, newUserConfig);
  }

  /* Interval */
  async setPortalIntervalTime(newInterval: number) {
    const userConfig = await this.getUserConfig();
    const newUserConfig = {
      ...userConfig,
      question: { ...userConfig.question, interval: newInterval },
    };

    this.storage.set(LOCAL_STORAGE.KEY.USER_CONFIG, newUserConfig);
  }

  async getPortalIntervalTime(): Promise<number> {
    const {
      question: { interval },
    } = await this.getUserConfig();

    return interval;
  }

  /* Trigger */
  async getTriggerStatus(): Promise<boolean> {
    const {
      trigger: { isOpen },
    } = await this.getUserConfig();

    return isOpen;
  }

  async setTriggerStatus(newStatus: boolean) {
    const userConfig = await this.getUserConfig();
    const newUserConfig = {
      ...userConfig,
      trigger: { ...userConfig.trigger, isOpen: newStatus },
    };

    this.storage.set(LOCAL_STORAGE.KEY.USER_CONFIG, newUserConfig);
  }

  resetStorage() {
    this.storage.clear();
  }

  /* Life */
  async getLifeCount(): Promise<number> {
    const {
      life: { lifeCount },
    } = await this.getUserConfig();

    return lifeCount;
  }

  async setLifeCount(newLifeCount: number) {
    const userConfig = await this.getUserConfig();
    const newUserConfig = {
      ...userConfig,
      life: { ...userConfig.life, lifeCount: newLifeCount },
    };

    this.storage.set(LOCAL_STORAGE.KEY.USER_CONFIG, newUserConfig);
  }

  /** Time */
  async getTime(): Promise<Date> {
    const { time } = await this.getUserConfig();
    return time;
  }

  async setTime(newStartTime: Date) {
    const userConfig = await this.getUserConfig();
    const newUserConfig = {
      ...userConfig,
      time: newStartTime,
    };
    this.storage.set(LOCAL_STORAGE.KEY.USER_CONFIG, newUserConfig);
  }
}

const storageInstance = new ChromeStorage();

export const storageController = new StorageController(storageInstance);
