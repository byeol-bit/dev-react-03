import React, { useState } from 'react'
import Title from '../components/common/Title'
import InputText from '../components/common/InputText'
import Button from '../components/common/Button'
import { SignupStyle } from './Signup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../api/auth.api'
import { useAlert } from '../hooks/useAlert'
import { useAuthStore } from '../store/authStore'

export interface ISignupProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const { storeLogin } = useAuthStore();

  const obSubmit = (data: ISignupProps) => {
    login(data).then((res) => {
      storeLogin(res.token);

      showAlert('로그인 완료되었습니다.');
      navigate('/');
    }, (error) => {
      showAlert("로그인에 실패했습니다.");
    })
  }

  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignupProps>();

  return (
    <>
      <Title size="large">로그인</Title>
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
            <Link to="/reset">로그인</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  )
}

export default Login