import React from 'react'
import styled from 'styled-components';
import useToastStore from '../../../store/toastStore';
import Toast from './Toast';

const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <ToastContainerStyle>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastContainerStyle>
  )
}

const ToastContainerStyle = styled.div`
  position: fixed;
  top: 32px;
  right: 24px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap:12px;
`;

export default ToastContainer