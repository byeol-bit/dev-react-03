import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BookItem from './BookItem';
import { Book } from '../../models/book.model';
import { useLocation } from 'react-router-dom';
import { QUERYSTRING } from '../../costants/querystring';
import { TViewMode } from './BooksViewSwitcher';

interface IBooksListProps {
  books: Book[];
}

const BooksList = ({ books }: IBooksListProps) => {
  const [view, setView] = useState<TViewMode>('grid');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as TViewMode);
    }
  }, [location.search])

  return (
    <BooksListStyle view={view}>
      {
        books.map((book) => (
          <BookItem book={book} view={view} />
        ))
      }

    </BooksListStyle>
  )
}
interface BooksListStyleProps {
  view: TViewMode;
}

const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) => (view === 'grid' ? "repeat(4, 1fr)" : "repeat(1, 1fr)")};
  gap: 24px;
`;

export default BooksList