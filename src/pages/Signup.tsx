import React, { useState } from 'react'
import Title from '../components/common/Title'
import InputText from '../components/common/InputText'
import Button from '../components/common/Button'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { fetchSignup } from '../api/auth.api'
import { useAlert } from '../hooks/useAlert'

export interface ISignupProps {
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const obSubmit = (data: ISignupProps) => {
    fetchSignup(data).then((res) => {
      showAlert('회원가입이 완료되었습니다.');
      navigate('/login');
    });
  }

  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignupProps>();

  return (
    <>
      <Title size="large">회원가입</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(obSubmit)}>
          <fieldset>
            <InputText
              placeholder='이메일'
              inputType='email'
              {...register("email", { required: true })}
            />
            {errors.email && <p className='error-text'>이메일을 입력해주세요.</p>}
          </fieldset>
          <fieldset>
            <InputText
              placeholder='비밀번호'
              inputType='password'
              {...register("password", { required: true })}
            />
            {errors.password && <p className='error-text'>비밀번호를 입력해주세요.</p>}
          </fieldset>
          <fieldset>
            <Button
              size="medium"
              scheme='primary'
              type='submit'
            >
              회원가입
            </Button>
          </fieldset>
          <div className='info'>
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  )
}

const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }
  
  button {
    width: 100%;
  }
  
  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default Signup