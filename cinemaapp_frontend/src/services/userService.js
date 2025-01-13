import { apiService, request } from "./apiService";

const USER_ENDPOINT = "/users";

const userApiService = apiService(USER_ENDPOINT);

export const userService = {
  ...userApiService,
  login: async (data) => {
    const response = await request(`${USER_ENDPOINT}/login`, {
      method: "POST",
      data: data,
    });

    return response;
  },
  findUserByEmail: async (email) => {
    const response = await request(`${USER_ENDPOINT}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
      },
    });

    return response;
  },
  resetPassword: async ({ email, password }) => {
    const response = await request(`${USER_ENDPOINT}/reset-password`, {
      method: "POST",
      data: { email, password },
    });

    return response;
  },
  sendOtp: async (data) => {
    const response = await request(`${USER_ENDPOINT}/otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
    });
    return response;
  },
  verifyOtp: async (data) => {
    const response = await request(`${USER_ENDPOINT}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response;
  },
  verifyPassword: async (data) => {
    const response = await request(`${USER_ENDPOINT}/verify-password`, {
      method: "POST",
      data: data,
    });
    return response;
  },
  deactivateAccount: async (data) => {
    const response = await request(`${USER_ENDPOINT}/deactivate-account`, {
      method: "POST",
      data: data,
    });
  },
  editProfile: async (id, data) => {
    const response = await request(`${USER_ENDPOINT}/${id}`, {
      method: "PUT",
      data: data,
    });
  },
};
