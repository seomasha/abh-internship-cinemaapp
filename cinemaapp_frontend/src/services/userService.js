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
};
