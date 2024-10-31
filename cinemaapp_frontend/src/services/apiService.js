import axios from "axios";
import ErrorHandler from "./errorHandler";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const apiPath = import.meta.env.VITE_API_PATH;
export const BASE_URL = `${backendUrl}${apiPath}`;

const request = async (url, options = {}) => {
  try {
    const response = await axios({ url: `${BASE_URL}${url}`, ...options });
    return response.data;
  } catch (error) {
    ErrorHandler.handleError(error);
  }
};

export const apiService = (endpoint) => {
  return {
    get: () => request(endpoint),
    getAll: (page = 0, size = 0) =>
      request(endpoint, {
        params: { page, size },
      }),
    create: (data) =>
      request(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    update: (data) =>
      request(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    delete: () => request(endpoint, { method: "DELETE" }),
  };
};
