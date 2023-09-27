import { LocalStorage } from '@src/modules/LocalStorage';
import { UserConfig } from '@src/types';
import { LOCAL_STORAGE, DEFAULT_USER_CONFIG } from '@src/constants';

/**
 * 휘발성 데이터를 저장하는 Controller.
 * 현재는 LocalStorage의 인스턴스를 사용하며, 추후엔 DB관련된 메서드 추상화.
 */
export class StorageController {
  constructor(private storage) {}

  getUserConfig(): UserConfig {
    return (
      this.storage.get(LOCAL_STORAGE.KEY.USER_CONFIG) ?? DEFAULT_USER_CONFIG
    );
  }

  /* Tags */
  getUserTags() {
    const {
      question: { tags },
    } = this.getUserConfig();

    return tags;
  }

  setUserTags(newTags) {
    const userConfig = this.getUserConfig();
    const newUserConfig = {
      ...userConfig,
      question: { ...userConfig.question, tags: newTags },
    };

    this.storage.set(LOCAL_STORAGE.KEY.USER_CONFIG, newUserConfig);
  }

  /* Interval */
  setPortalIntervalTime(newInterval: number) {
    const userConfig = this.getUserConfig();
    const newUserConfig = {
      ...userConfig,
      question: { ...userConfig.question, interval: newInterval },
    };

    this.storage.set(LOCAL_STORAGE.KEY.USER_CONFIG, newUserConfig);
  }

  getPortalIntervalTime(): number {
    const {
      question: { interval },
    } = this.getUserConfig();

    return interval || DEFAULT_USER_CONFIG.question.interval;
  }

  /* Trigger */
  async getTriggerStatus(): Promise<boolean> {
    const {
      trigger: { isOpen },
    } = this.getUserConfig();

    return isOpen;
  }

  setTriggerStatus(newStatus: boolean) {
    const userConfig = this.getUserConfig();
    const newUserConfig = {
      ...userConfig,
      trigger: { ...userConfig.trigger, isOpen: newStatus },
    };

    this.storage.set(LOCAL_STORAGE.KEY.USER_CONFIG, newUserConfig);
  }

  resetStorage() {
    this.storage.clear();
  }
}

const storageInstance = new LocalStorage();
export const storageController = new StorageController(storageInstance);
