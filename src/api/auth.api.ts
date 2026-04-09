import { httpClient } from "./http";
import { ISignupProps } from "../pages/Signup";
export const fetchSignup = async (userData: ISignupProps) => {
  const response = await httpClient.post("/users/join", userData);
  return response.data;
};

export const resetRequest = async (userData: ISignupProps) => {
  const response = await httpClient.post("/users/reset", userData);
  return response.data;
};

export const resetPassword = async (userData: ISignupProps) => {
  const response = await httpClient.put("/users/reset", userData);
  return response.data;
};

interface ILoginResponse {
  token: string;
  /** 로그인 직후부터 만료까지 남은 시간(초) */
  expiresIn: number;
}
export const login = async (userData: ISignupProps) => {
  const response = await httpClient.post<ILoginResponse>(
    "/users/login",
    userData,
  );
  return response.data;
};
