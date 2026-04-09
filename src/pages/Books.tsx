import React from 'react'
import styled from 'styled-components'
import Title from '../components/common/Title'
import BooksFilter from '../components/books/BooksFilter'
import BooksList from '../components/books/BooksList'
import BooksEmpty from '../components/books/BooksEmpty'
import Pagenation from '../components/books/Pagenation'
import BooksViewSwitcher from '../components/books/BooksViewSwitcher'
import { useBooks } from '../hooks/useBooks'
import Loading from '../components/common/Loading'

const Books = () => {
  const { books, pagenation, isEmpty, isBooksLoading } = useBooks();
  console.log('books', books);
  console.log('pagenation', pagenation);

  if (isEmpty) {
    return <BooksEmpty />
  }

  if (!books || !pagenation || isBooksLoading) {
    return <Loading />
  }

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
        <BooksList books={books} />
        {/* 페이지네이션 */}
        <Pagenation pagenation={pagenation} />

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