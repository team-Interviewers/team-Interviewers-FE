import React, { useEffect, useState } from 'react';
import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';

const Popup = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
  }, [selectedTags]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className="tags">
            {['DB', 'Network', 'Java', 'CS', 'DS', 'OS'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={selectedTags.includes(tag) ? 'active' : ''}
              >
                {tag}
              </button>
            ))}
          </div>
          <div>
            {selectedTags.map((v) => (
              <div>{`${v}!!`}</div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default withSuspense(Popup);
