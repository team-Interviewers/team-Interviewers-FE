import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import Toast from './Toast';
import useToastStore from './store/toast';
import styled from 'styled-components';

const ModalPortals = ({ children }: { children: ReactNode }) => {
  const modalDiv = document.createElement('div');
  modalDiv.id = 'modal';
  document.body.insertBefore(modalDiv, document.body.firstChild);
  return createPortal(children, modalDiv);
};

const ToastList = () => {
  const { toasts } = useToastStore();

  if (!toasts.length) {
    return <></>;
  }

  return (
    <ModalPortals>
      <Layout>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} mode={toast.mode} />
        ))}
      </Layout>
    </ModalPortals>
  );
};

export default ToastList;

const Layout = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 99999999999;
`;
