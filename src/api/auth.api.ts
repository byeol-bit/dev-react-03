import { httpClient } from "./http";
import { Category } from "../models/category.model";
import { ISignupProps } from "../pages/Signup";

export const fetchSignup = async (userData: ISignupProps) => {
  const response = await httpClient.post("/users/join", userData);
  return response.data;
};
