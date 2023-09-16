import { Tag } from '@pages/popup/Tag';

export const Tags = () => {
  return (
    <>
      {['DB', 'Network', 'Java', 'CS', 'DS', 'OS'].map((tag) => (
        <Tag tag={tag} />
      ))}
    </>
  );
};
