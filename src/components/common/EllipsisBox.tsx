import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button';
import { FaAngleDown } from 'react-icons/fa';

interface IEllipsisBoxProps {
  children: React.ReactNode;
  lineLimit: number;
}

const EllipsisBox = ({ children, lineLimit }: IEllipsisBoxProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <EllipsisBoxStyle lineLimit={lineLimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size='small'
          scheme='normal'
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "접기" : "펼치기"}
          <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxStyle>
  )
}

interface EllipsisBoxStyleProps {
  lineLimit: number;
  $expanded: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
 p {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ lineLimit, $expanded }) =>
    $expanded ? 'none' : lineLimit};
  -webkit-box-orient: vertical;
  padding: 20px 0;
  margin 0;
 }

 .toggle {
  display: flex;
  justify-content: end;
  svg {
    transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : "rotate(0)"};
  }
 }
`;

export default EllipsisBox