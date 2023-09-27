import { AnimatePresence, motion } from 'framer-motion';
import { styled } from 'styled-components';
import { DEFAULT_VARIANTS } from '../../constants';
import { ModalProps } from '../../types';

export const Modal = ({ children, isOpen, closeModal }: ModalProps) => {
  const closeHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <Overlay
            onClick={closeHandler}
            variants={DEFAULT_VARIANTS}
            initial="from"
            animate="to"
            exit="exit"
          >
            {children}
          </Overlay>
        </AnimatePresence>
      )}
    </>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.6);
`;
