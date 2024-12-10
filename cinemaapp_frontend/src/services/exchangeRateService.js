import axios from "axios";
import { request } from "./apiService";
import ErrorHandler from "./errorHandler";

const EXCHANGE_RATE_URL = import.meta.env.VITE_EXCHANGE_RATE_URL;
const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

const getExchangeRate = async (currency) => {
  try {
    const response = await axios.get(
      `${EXCHANGE_RATE_URL}/${API_KEY}/latest/${currency}`
    );
    return response.data;
  } catch (error) {
    ErrorHandler.handleError(error);
  }
};

export default {
  getExchangeRate,
};
