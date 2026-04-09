import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { IToastItem } from '../../../store/toastStore';
import { FaPlus, FaBan, FaInfoCircle } from 'react-icons/fa';
import useToastStore from '../../../store/toastStore';
export const TOAST_REMOVE_TIME = 3000;

const Toast = ({ id, message, type }: IToastItem) => {
  const { removeToast } = useToastStore();
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleRemoveToast = () => {
    removeToast(id);
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      removeToast(id);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemoveToast();
    }, TOAST_REMOVE_TIME);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastStyle
      className={`${isFadingOut ? "fadeOut" : "fadeIn"}`}
      onAnimationEnd={handleAnimationEnd}
    >

      <p>
        {type === 'error' && <FaBan />}
        {type === 'info' && <FaInfoCircle />}
      </p>
      <p>{message}</p>
      <button onClick={handleRemoveToast}>
        <FaPlus />
      </button>
    </ToastStyle >
  )
}

const ToastStyle = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    } 
    to {
      opacity: 0;
    }
  }

  &.fadeIn {
    animation: fadeIn 0.3s ease-in-out forwards;
  }

  &.fadeOut {
    animation: fadeOut 0.3s ease-in-out forwards;
  }


  
  background: ${({ theme }) => theme.color.background};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  justify-content: center;
  align-items: start;
  gap: 12px;

  p {
    color: ${({ theme }) => theme.color.text};
    line-height: 1;
    margin: 0;

    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;

    svg {
      transform: rotate(45deg);
    }
  }
`;

export default Toast