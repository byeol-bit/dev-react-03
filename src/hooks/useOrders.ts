import { useEffect, useState } from "react";
import { OrderListItem, OrderDetail } from "../models/order.model";
import { fetchOrders, fetchOrder } from "../api/order.api";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  const selectOrder = (id: number) => {
    // 요청 방어
    if (orders.filter((item) => item.id === id)[0].details) {
      setSelectedOrder(id);
      return;
    }

    fetchOrder(id).then((orderDetail) => {
      setSelectedOrder(id);
      setOrders(
        orders.map((order) => {
          if (order.id === id) {
            return {
              ...order,
              details: orderDetail,
            };
          }
          return order;
        }),
      );
    });
  };

  return { orders, selectedOrder, selectOrder };
};
