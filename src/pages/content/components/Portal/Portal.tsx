import { useState } from 'react';
import { useClickSpy } from '../../event';

export default function Portal() {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal((prevShow) => !prevShow);

  useClickSpy(handleClick);

  return <div className="text-lime-400">{showModal && <div>Modal!</div>}</div>;
}
