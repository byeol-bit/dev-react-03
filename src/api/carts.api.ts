import { httpClient } from "./http";
import { Cart } from "../models/cart.model";

interface AddCartParams {
  bookId: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  console.log(params);
  const response = await httpClient.post("/cart", params);
  return response.data;
};

export const fetchCarts = async () => {
  const response = await httpClient.get<Cart[]>("/cart");
  return response.data;
};

export const deleteCart = async (id: number) => {
  const response = await httpClient.delete(`/cart/${id}`);
  return response.data;
};
