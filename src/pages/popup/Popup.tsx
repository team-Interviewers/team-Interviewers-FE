import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import { Tags } from '@pages/popup/Tag';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Tags />
      </header>
    </div>
  );
};

export default withSuspense(Popup);
