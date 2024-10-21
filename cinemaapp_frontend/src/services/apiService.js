import axios from "axios";

const BASE_URL = "http://localhost:8888";

const request = async (url, options = {}) => {
  try {
    const response = await axios({ url: `${BASE_URL}${url}`, ...options });
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Something went wrong";
      throw new Error(`Error: ${error.response.status} - ${errorMessage}`);
    } else {
      throw new Error("API Error: " + error.message);
    }
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
