import { QUESTION_TAGS } from '@root/src/constants';
import { storageController } from '@root/src/modules/StoreController';
import { useEffect, useState } from 'react';

const useTags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const tags = (await storageController.getUserTags()) ?? QUESTION_TAGS;
      setSelectedTags(tags);
    })();
  }, []);

  useEffect(() => {
    const messageListener = (message: any) => {
      if (message.message === 'SELECTED_TAGS_UPDATE') {
        setSelectedTags(message.tags);
        storageController.setUserTags(message.tags);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return {
    selectedTags,
  };
};

export default useTags;
