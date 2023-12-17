import {
  type SignupDto,
  type LoginDto,
  type ForgotPasswordDto,
  type ResetPasswordDto,
  type ChangePasswordDto,
  type UpdateUserDto,
  type DeleteUserDto,
} from "@lir/lib/dto";
import { type UserProps } from "@lir/lib/schema";

import { type AxiosResponse } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { apiClient } from "~/shared/api/api-client";
import { queryClient } from "~/shared/api/query-client";

export const sessionKeys = {
  session: {
    root: ["session"],
    currentUser: () => [...sessionKeys.session.root, "currentUser"],
  },

  mutation: {
    login: () => [...sessionKeys.session.root, "login"],
    signup: () => [...sessionKeys.session.root, "signup"],
    logout: () => [...sessionKeys.session.root, "logout"],

    updateUser: () => [...sessionKeys.session.root, "updateUser"],
  },
};

// SESSION

const handleRefresh = async () => {
  try {
    await apiClient.post("/auth/refresh");
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const handleInvalidateRefresh = async () => {
  try {
    queryClient.removeQueries({
      queryKey: sessionKeys.session.currentUser(),
      type: "inactive",
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(apiClient, handleRefresh, {
  statusCodes: [401, 403],
});
createAuthRefreshInterceptor(apiClient, handleInvalidateRefresh);

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

// PASSWORD RECOVERY

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
  const response = await apiClient.post<void, AxiosResponse<void>, ResetPasswordDto>(
    "/auth/reset-password",
    data
  );

  return response.data;
};

export const changePassword = async (data: ChangePasswordDto) => {
  const response = await apiClient.post<
    void,
    AxiosResponse<void>,
    ChangePasswordDto
  >("/auth/change-password", data);

  return response.data;
};

// MUTATE USER

export const updateUser = async (data: UpdateUserDto) => {
  const response = await apiClient.patch<
    UserProps,
    AxiosResponse<UserProps>,
    UpdateUserDto
  >("/me", data);

  return response.data;
};

export const deleteUser = async (data: DeleteUserDto) => {
  const response = await apiClient.post<
    UserProps,
    AxiosResponse<UserProps>,
    DeleteUserDto
  >("/me", data);

  return response.data;
};
