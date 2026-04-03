import React from 'react'
import { Pagenation as IPagenation } from '../../models/pagenation.model'
import { LIMIT } from '../../costants/pagenation';
import styled from 'styled-components';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../costants/querystring';

interface IPagenationProps {
  pagenation: IPagenation;
}

const Pagenation = ({
  pagenation
}: IPagenationProps) => {
  const { bookCount, currentPage } = pagenation;
  const pages: number = Math.ceil(bookCount / LIMIT);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.PAGE, page.toString());
    setSearchParams(newSearchParams);
  }

  return (
    <PagenationStyle>
      {
        pages > 0 && (
          <ol>
            {
              Array(pages).fill(0).map((_, index) => (
                <li>
                  <Button
                    size='small'
                    scheme={index + 1 === currentPage ? 'primary' : 'normal'}
                    onClick={() => handleClickPage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))
            }

          </ol>
        )
      }
    </PagenationStyle>
  )
}

const PagenationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px 0;

  ol {
    display: flex;
    list-style: none;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;

export default Pagenation