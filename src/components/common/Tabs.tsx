import React, { useState } from 'react'
import styled from 'styled-components'

interface ITabProps {
  title: string;
  children: React.ReactNode;
  active?: boolean;
}

const Tab = ({ title, children }: ITabProps) => {
  return (
    <>
      {children}
    </>
  )
}

interface ITabsProps {
  children: React.ReactNode;
}

const Tabs = ({ children }: ITabsProps) => {

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const tabs = React.Children.toArray(children) as React.ReactElement<ITabProps>[];

  return (
    <TabsStyle>
      <div className='tab-header'>
        {
          tabs.map((tab, index) => (
            <button
              onClick={() => setActiveIndex(index)}
              className={activeIndex === index ? 'active' : ''}
              key={index}
            >
              {tab.props.title}
            </button>
          ))
        }
      </div>
      <div className='tab-content'>
        {
          tabs[activeIndex]
        }
      </div>
    </TabsStyle >
  )
}

const TabsStyle = styled.div`
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid #ddd;

    button {
      border:none;
      background: #ddd;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color.text};
      border-radius: ${({ theme }) => theme.borderRadius.default} ${({ theme }) => theme.borderRadius.default} 0 0;
      
      &.active {
        color: #fff;
        background: ${({ theme }) => theme.color.primary};
      }

      .tab-content {
        padding: 24px 0;
      }
    }
  }
`;

export { Tabs, Tab };