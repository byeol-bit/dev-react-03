import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { OrderSheet } from '../models/order.model'
import Title from '../components/common/Title'
import { CartStyle } from './Cart'
import CartSummary from '../components/cart/CartSummary'
import Button from '../components/common/Button'
import InputText from '../components/common/InputText'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Delivery } from '../models/order.model'
import FindAddress from '../components/order/FindAddress'
import { createOrder } from '../api/order.api'
import { useAlert } from '../hooks/useAlert'
import { useNavigate } from 'react-router-dom'

interface IDeleveryForm extends Delivery {
  addressDetail: string;
}

const Order = () => {
  const { showAlert, showConfirm } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  const orderDataFromCart = location.state as OrderSheet;
  console.log(orderDataFromCart);
  const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart;
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IDeleveryForm>();

  const handlePay = (data: IDeleveryForm) => {
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      }
    };

    showConfirm("주문하시겠습니까?", () => {
      createOrder(orderData).then((response) => {
        showAlert("주문이 완료되었습니다.");
        navigate("/orderlist");
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  return (
    <>
      <Title size='large'>주문서 작성</Title>
      <CartStyle>
        <div className="content">
          <div className="order-info">
            <Title size='medium' color='text'>배송 정보</Title>
            <form className="delivery">
              <fieldset>
                <label htmlFor="address">주소</label>
                <div className="input">
                  <InputText inputType="text" {...register("address", { required: true })} />
                </div>
                <FindAddress onCompleted={(address) => { setValue("address", address); }} />
              </fieldset>
              <fieldset>
                <label htmlFor="address">상세 주소</label>
                <div className="input">
                  <InputText inputType="text" {...register("addressDetail", { required: true })} />
                </div>
              </fieldset>
              {(errors.address || errors.addressDetail) && <p className='error-text'>{"주소를 입력해 주세요."}</p>}
              <fieldset>
                <label htmlFor="receiver">수령인</label>
                <div className="input">
                  <InputText inputType="text" {...register("receiver", { required: true })} />
                </div>
              </fieldset>
              {errors.receiver && <p className='error-text'>{"수령인을 입력해 주세요."}</p>}
              <fieldset>
                <label htmlFor="contact">연락처</label>
                <div className="input">
                  <InputText inputType="text" {...register("contact", { required: true })} />
                </div>
              </fieldset>
              {errors.contact && <p className='error-text'>{"연락처를 입력해 주세요."}</p>}
            </form>
          </div>
          <div className="order-info">
            <Title size='medium' color='text'>주문 상품</Title>
            <strong>{firstBookTitle} 등 총 {totalQuantity}권</strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary
            totalQuantity={totalQuantity}
            totalPrice={totalPrice}
          />
          <Button size='medium' scheme='primary' onClick={handleSubmit(handlePay)}>결제하기</Button>
        </div>
      </CartStyle>
    </>
  )
}

const OrderStyle = styled.div``;

export default Order