import { useEffect, useState } from 'react';

export default function Portal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      setShowModal((prevShow) => !prevShow);
    };

    // window 객체에 이벤트 바인딩.
    window.addEventListener('click', handleClick);

    // Component 언마운트시 이벤트 리스너를 제거.
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return <div className="text-lime-400">{showModal && <div>Modal!</div>}</div>;
}
