import {
  type SignupDto,
  type LoginDto,
  type ForgotPasswordDto,
  type ResetPasswordDto,
} from "@lir/lib/dto";
import { type UserProps } from "@lir/lib/schema";

import { type AxiosResponse } from "axios";

import { apiClient } from "~/shared/api/api-client";

export const sessionKeys = {
  session: {
    root: ["session"],
    currentUser: () => [...sessionKeys.session.root, "currentUser"],
  },

  mutation: {
    login: () => [...sessionKeys.session.root, "login"],
    signup: () => [...sessionKeys.session.root, "signup"],
    logout: () => [...sessionKeys.session.root, "logout"],
  },
};

export const signup = async (data: SignupDto) => {
  const response = await apiClient.post<
    UserProps,
    AxiosResponse<UserProps>,
    SignupDto
  >("/auth/signup", data);

  return response.data;
};

export const login = async (data: LoginDto) => {
  const response = await apiClient.post<
    UserProps,
    AxiosResponse<UserProps>,
    LoginDto
  >("/auth/login", data);

  return response.data;
};

export const logout = async () => await apiClient.post("/auth/logout");

export const forgotPassword = async (data: ForgotPasswordDto) => {
  const response = await apiClient.post<
    void,
    AxiosResponse<void>,
    ForgotPasswordDto
  >("/auth/forgot-password", data);

  return response.data;
};

export const verifyResetRequest = async (data: { requestId: string }) => {
  const response = await apiClient.post("/auth/verify-reset-password", data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordDto) => {
  const response = await apiClient.post<any, AxiosResponse<any>, ResetPasswordDto>(
    "/auth/reset-password",
    data
  );

  return response.data;
};
