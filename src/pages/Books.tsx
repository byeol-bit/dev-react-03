import React from 'react'
import styled from 'styled-components'
import Title from '../components/common/Title'
import BooksFilter from '../components/books/BooksFilter'
import BooksList from '../components/books/BooksList'
import BooksEmpty from '../components/books/BooksEmpty'
import Pagenation from '../components/books/Pagenation'
import BooksViewSwitcher from '../components/books/BooksViewSwitcher'
import { useBooks } from '../hooks/useBooks'

const Books = () => {
  const { books, pagenation, isEmpty } = useBooks();
  console.log('books', books);
  console.log('pagenation', pagenation);

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BookStyle>
        {/* 필터 */}
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {/* 목록 */}
        {!isEmpty && <BooksList books={books} />}
        {/* empty */}
        {isEmpty && <BooksEmpty />}
        {/* 페이지네이션 */}
        {!isEmpty && <Pagenation pagenation={pagenation} />}

      </BookStyle>
    </>
  )
}

const BookStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books