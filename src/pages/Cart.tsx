import { useState } from 'react'
import styled from 'styled-components'
import Title from '../components/common/Title'
import CartItem from '../components/cart/CartItem'
import { useCart } from '../hooks/useCart'
import Empty from '../components/common/Empty'
import { FaShoppingCart } from 'react-icons/fa'
import CartSummary from '../components/cart/CartSummary'
import { useMemo } from 'react'
import { useAlert } from '../hooks/useAlert'
import { useNavigate } from 'react-router-dom'
import { OrderSheet } from '../models/order.model'
import Button from '../components/common/Button'

const Cart = () => {
  const { carts, deleteCartItem, isEmpty } = useCart();
  const { showAlert, showConfirm } = useAlert();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    };
  };

  const handleDeleteItem = (id: number) => {
    deleteCartItem(id);
  };

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert("주문할 상품을 선택해 주세요.");
      return;
    }

    // 주문 액션 -> 주문서 작성으로 데이터 전달
    const orderData: Omit<OrderSheet, "delivery"> = {
      items: checkedItems,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
      firstBookTitle: carts.find((cart) => checkedItems.includes(cart.id))?.title || "",
    };
    showConfirm("주문하시겠습니까?", () => {
      navigate("/order", { state: orderData });
    });
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.price * cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {isEmpty && (
          <Empty
            icon={<FaShoppingCart />}
            title="장바구니가 비었습니다."
            description={<>장바구니를 채워보세요.</>}
          />
        )}
        {!isEmpty && (
          <>
            <div className="content">
              {
                carts.map((cart) => (
                  <CartItem key={cart.id} cart={cart} checkedItems={checkedItems} onCheck={handleCheckItem} onDelete={handleDeleteItem} />
                ))
              }
            </div>
            <div className="summary">
              <CartSummary
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
              />
              <Button size='medium' scheme='primary' onClick={handleOrder}>주문하기</Button>
            </div>

          </>
        )}
      </CartStyle>
    </>
  )
}

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }

    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }
      
      .input {
        flex: 1;

        input {
          width: 100%;
        }
      }
    }

    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`;

export default Cart