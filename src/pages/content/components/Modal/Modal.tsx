import { styled } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { DEFAULT_VARIANTS } from '../../constants';
import { ModalProps } from '../../types';

export const Modal = ({ children, isOpen, closeModal }: ModalProps) => {
  const closeHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
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
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
`;
