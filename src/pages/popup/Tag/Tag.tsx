import { storageController } from '@root/src/modules/StoreController';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Tag = ({ tag }: { tag: string }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(
    () => storageController.getUserTags() || []
  );

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: 'SELECTED_TAGS_UPDATE',
        tags: selectedTags,
      });
    });

    storageController.setUserTags(selectedTags);
  }, [selectedTags]);

  return (
    <CheckBoxWrapper key={tag}>
      <CheckBox
        id={`checkbox_${tag}`}
        checked={selectedTags.includes(tag)}
        onChange={() => handleTagToggle(tag)}
      />
      <CheckBoxLabel htmlFor={`checkbox_${tag}`}>{tag}</CheckBoxLabel>
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const CheckBoxLabel = styled.label`
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  user-select: none;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border: 2px solid #aaa;
    border-radius: 4px;
    background-color: #fff;
  }
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;

  &:checked + ${CheckBoxLabel}:before {
    background-color: #2196f3;
    border-color: #2196f3;
  }
`;
