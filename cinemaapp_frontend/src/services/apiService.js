import axios from "axios";
import ErrorHandler from "./errorHandler";

const BASE_URL = "http://localhost:8888";

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
    getAll: () => request(endpoint),
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
