import { useEffect, useState } from "react";
import { Cart } from "../models/cart.model";
import { fetchCarts, deleteCart } from "../api/carts.api";

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const deleteCartItem = (id: number) => {
    deleteCart(id).then(() => {
      setCarts(carts.filter((cart) => cart.id !== id));
    });
  };

  useEffect(() => {
    fetchCarts().then((carts) => {
      setCarts(carts);
      setIsEmpty(carts.length === 0);
    });
  }, []);

  useEffect(() => {
    setIsEmpty(carts.length === 0);
  }, [carts]);

  return { carts, isEmpty, deleteCartItem };
};
