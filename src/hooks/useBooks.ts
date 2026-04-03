import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { Pagenation } from "../models/pagenation.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../costants/querystring";
import { LIMIT } from "../costants/pagenation";

export const useBooks = () => {
  const location = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const [pagenation, setPagenation] = useState<Pagenation>({
    bookCount: 0,
    currentPage: 1,
  });
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    fetchBooks({
      category_id: params.get(QUERYSTRING.CATEGORY_ID)
        ? Number(params.get(QUERYSTRING.CATEGORY_ID))
        : undefined,
      news: params.get(QUERYSTRING.NEWS) ? true : undefined,
      currentPage: params.get(QUERYSTRING.PAGE)
        ? Number(params.get(QUERYSTRING.PAGE))
        : 1,
      limit: LIMIT,
    }).then((res) => {
      setBooks(res.books);
      setPagenation(res.pagenation);
      setIsEmpty(res.books.length === 0);
    });
  }, [location.search]);

  return { books, pagenation, isEmpty };
};
