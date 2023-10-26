import styled from 'styled-components';

interface TagProps {
  tag: string;
  selectedTags: string[];
  handleTagToggle: (tag: string) => void;
}

const TAG_MAP = Object.freeze({
  DB: '데이터베이스',
  Network: '네트워크',
  Java: 'Java',
  CS: '컴퓨터구조',
  DS: '자료구조',
  OS: '운영체제',
});

export const Tag = ({ tag, selectedTags, handleTagToggle }: TagProps) => {
  return (
    <CheckBoxWrapper key={tag}>
      <CheckBox
        id={`checkbox_${tag}`}
        checked={selectedTags.includes(tag)}
        onChange={() => handleTagToggle(tag)}
      />
      <CheckBoxLabel htmlFor={`checkbox_${tag}`}>{TAG_MAP[tag]}</CheckBoxLabel>
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
    background: transparent;
  }
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;

  &:checked + ${CheckBoxLabel}:before {
    background-color: #7d8aff;
  }
`;
