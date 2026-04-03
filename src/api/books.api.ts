import { Book } from "../models/book.model";
import { Pagenation } from "../models/pagenation.model";
import { httpClient } from "./http";

interface IFetchBooksParams {
  category_id?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagenation: Pagenation;
}

export const fetchBooks = async (params: IFetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>("/books", {
      params,
    });
    return response.data;
  } catch (error) {
    return {
      books: [],
      pagenation: {
        bookCount: 0,
        currentPage: 1,
      },
    };
  }
};
