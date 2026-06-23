import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import type { ILoginProps } from "../pages/Login";
import type { ISignupProps } from "../pages/Signup";
import { login, fetchSignup } from "../api/auth.api";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { resetPassword, resetRequest } from "../api/auth.api";

export const useAuth = () => {
  // 상태
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // 메소드
  const userLogin = (data: ILoginProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token, res.expiresIn);

        showAlert("로그인 완료되었습니다.");
        navigate("/");
      },
      (error) => {
        showAlert("로그인에 실패했습니다.");
      },
    );
  };

  const userSignup = (data: ISignupProps) => {
  fetchSignup(data).then(() => {
    showAlert("회원가입 완료되었습니다. 로그인해 주세요.");
    navigate("/login");
  });
};

  const userResetPassword = (data: ISignupProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    });
  };

  const [resetRequested, setResetRequested] = useState(false);
  const userResetRequest = (data: ISignupProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  // 리턴
  return {
    userLogin,
    userSignup,
    userResetPassword,
    userResetRequest,
    resetRequested,
  };
};
