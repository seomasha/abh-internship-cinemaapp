const BASE_URL = "http://localhost:8888";

const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Error: ${response.status} - ${
          errorDetails.message || "Something went wrong"
        }`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const apiService = {
  get: (endpoint) => request(endpoint),
  getAll: (endpoint) => request(endpoint),
  create: (endpoint, data) =>
    request(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  update: (endpoint, data) =>
    request(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
