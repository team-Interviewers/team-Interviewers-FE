import { Tag } from '@root/src/pages/popup/components';
import styled from 'styled-components';
import { storageController } from '@root/src/modules/StoreController';
import { useEffect, useState } from 'react';

export const Tags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const tags = await storageController.getUserTags();
      setSelectedTags(tags);
    })();
  }, []);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) => {
      const newTag = prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];

      if (newTag.length === 0) return prevTags;

      storageController.setUserTags(newTag);
      return newTag;
    });
  };

  useEffect(() => {
    chrome.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: 'SELECTED_TAGS_UPDATE',
        tags: selectedTags,
      });
    });
  }, [selectedTags]);

  return (
    <Wrapper>
      <Title>Tags</Title>
      <TagList>
        {['DB', 'Network', 'Java', 'CS', 'DS', 'OS'].map((tag) => (
          <Tag
            tag={tag}
            selectedTags={selectedTags}
            handleTagToggle={handleTagToggle}
          />
        ))}
      </TagList>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  gap: 0.5rem;
  max-height: 232px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: start;
`;

const TagList = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 0.25rem;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  height: 100%;
  max-width: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;
