import { Book, BookDetail } from "../models/book.model";
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

export const fetchBookDetail = async (bookId: string) => {
  try {
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
    return response.data;
  } catch (error) {}
};

export const likeBook = async (bookId: number) => {
  try {
    const response = await httpClient.post(`/likes/${bookId}`);
    return response.data;
  } catch (error) {}
};

export const unlikeBook = async (bookId: number) => {
  try {
    const response = await httpClient.delete(`/likes/${bookId}`);
    return response.data;
  } catch (error) {}
};
