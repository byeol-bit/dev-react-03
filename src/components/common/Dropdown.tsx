import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

interface IDropdownProps {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen?: boolean;
}

const Dropdown = ({ children, toggleButton, isOpen = false }: IDropdownProps) => {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownRef]);

  return (
    <DropdownStyled $open={open} ref={dropdownRef}>
      <button className='toggle' onClick={() => setOpen(!open)}>
        {toggleButton}
      </button>
      {
        open && (
          <div className='panel'>
            {children}
          </div>
        )
      }

    </DropdownStyled>
  )
}

interface IDropdownStyleProps {
  $open: boolean;
}

const DropdownStyled = styled.div<IDropdownStyleProps>`
  position: relative;
  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    svg {
      width: 30px;
      height: 30px;
      fill: ${({ theme, $open }) => $open ? theme.color.primary : theme.color.text};
    }
  }

  .panel {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 16px;
    background: ${({ theme }) => theme.name === "light" ? "#fff" : "#111"};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.default};
    z-index: 1000;
  }
`;

export default Dropdown