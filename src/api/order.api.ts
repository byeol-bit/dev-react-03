import { httpClient } from "./http";
import { Order, OrderSheet, OrderDetail } from "../models/order.model";

export const createOrder = async (order: OrderSheet) => {
  console.log(order);
  const response = await httpClient.post("/orders", order);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await httpClient.get<Order[]>("/orders");
  return response.data;
};

export const fetchOrder = async (id: number) => {
  const response = await httpClient.get<OrderDetail[]>(`/orders/${id}`);
  return response.data;
};
