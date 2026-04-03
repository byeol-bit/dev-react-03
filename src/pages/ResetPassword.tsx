import React, { useState } from 'react'
import Title from '../components/common/Title'
import InputText from '../components/common/InputText'
import Button from '../components/common/Button'
import { SignupStyle } from './Signup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { resetPassword, resetRequest } from '../api/auth.api'
import { useAlert } from '../hooks/useAlert'

export interface ISignupProps {
  email: string;
  password: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [resetRequested, setResetRequested] = useState(false);

  const obSubmit = (data: ISignupProps) => {
    if (resetRequested) {
      resetPassword(data).then(() => {
        showAlert("비밀번호가 초기화되었습니다.");
        navigate('/login');
      })
    } else {
      resetRequest(data).then(() => {
        setResetRequested(true);
      })
    }

  }

  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignupProps>();

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
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
          {resetRequested && (
            <fieldset>
              <InputText
                placeholder='비밀번호'
                inputType='password'
                {...register("password", { required: true })}
              />
              {errors.password && <p className='error-text'>비밀번호를 입력해주세요.</p>}
            </fieldset>
          )}
          <fieldset>
            <Button
              size="medium"
              scheme='primary'
              type='submit'
            >
              {resetRequested ? "비밀번호 초기화" : "초기화 요청"}

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

export default ResetPassword