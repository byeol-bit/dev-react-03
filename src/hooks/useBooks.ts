import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../costants/querystring";
import { LIMIT } from "../costants/pagenation";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: ["books", location.search],
    queryFn: () =>
      fetchBooks({
        category_id: params.get(QUERYSTRING.CATEGORY_ID)
          ? Number(params.get(QUERYSTRING.CATEGORY_ID))
          : undefined,
        news: params.get(QUERYSTRING.NEWS) ? true : undefined,
        currentPage: params.get(QUERYSTRING.PAGE)
          ? Number(params.get(QUERYSTRING.PAGE))
          : 1,
        limit: LIMIT,
      }),
  });
  // const [books, setBooks] = useState<Book[]>([]);
  // const [pagenation, setPagenation] = useState<Pagenation>({
  //   bookCount: 0,
  //   currentPage: 1,
  // });
  // const [isEmpty, setIsEmpty] = useState(true);

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);

  //   fetchBooks({
  //     category_id: params.get(QUERYSTRING.CATEGORY_ID)
  //       ? Number(params.get(QUERYSTRING.CATEGORY_ID))
  //       : undefined,
  //     news: params.get(QUERYSTRING.NEWS) ? true : undefined,
  //     currentPage: params.get(QUERYSTRING.PAGE)
  //       ? Number(params.get(QUERYSTRING.PAGE))
  //       : 1,
  //     limit: LIMIT,
  //   }).then((res) => {
  //     setBooks(res.books);
  //     setPagenation(res.pagenation);
  //     setIsEmpty(res.books.length === 0);
  //   });
  // }, [location.search]);

  return {
    books: booksData?.books,
    pagenation: booksData?.pagenation,
    isEmpty: booksData?.books.length === 0,
    isBooksLoading,
  };
};
