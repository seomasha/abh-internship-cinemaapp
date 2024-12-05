import { apiService, request } from "./apiService";

const PAYMENT_ENDPOINT = "/payments";

const paymentApiService = apiService(PAYMENT_ENDPOINT);

export const paymentService = {
  ...paymentApiService,
  createPaymentIntent: async (data) => {
    const response = await request(`${PAYMENT_ENDPOINT}/create`, {
      method: "POST",
      data: data,
    });

    return response;
  },
  confirmPayment: async (email) => {
    const response = await request(
      `${PAYMENT_ENDPOINT}/confirm-payment?email=${email}`,
      {
        method: "POST",
      }
    );

    return response;
  },
};
