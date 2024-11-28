import { apiService } from "./apiService";

const USER_ENDPOINT = "/users";

const userApiService = apiService(USER_ENDPOINT);

export const userService = {
  ...userApiService,
};
