import { apiService, request } from "./apiService";

const PAYMENT_ENDPOINT = "/payments";

const paymentApiService = apiService(PAYMENT_ENDPOINT);

export const paymentService = {
  ...paymentApiService,
  createPaymentIntent: async (data) => {
    const response = await request(`${PAYMENT_ENDPOINT}/create-intent`, {
      method: "POST",
      data: data,
    });

    return response;
  },
  confirmPayment: async (email) => {
    const response = await request(
      `${PAYMENT_ENDPOINT}/send-confirmation-email?email=${email}`,
      {
        method: "POST",
      }
    );

    return response;
  },
  createCustomer: async (data) => {
    const response = await request(`${PAYMENT_ENDPOINT}/create-customer`, {
      method: "POST",
      data: data,
    });

    return response;
  },
  attachPaymentMethod: async (paymentMethodId, customerId) => {
    const response = await request(
      `${PAYMENT_ENDPOINT}/attach-payment-method?paymentMethodId=${paymentMethodId}&customerId=${customerId}`,
      {
        method: "POST",
      }
    );
    return response;
  },
  getPaymentMethods: async (customerId) => {
    const response = await request(
      `${PAYMENT_ENDPOINT}/payment-methods?customerId=${customerId}`
    );

    return response;
  },
  deletePaymentMethod: async (id) => {
    const response = await request(
      `${PAYMENT_ENDPOINT}/payment-methods/delete/${id}`,
      { method: "DELETE" }
    );

    return response;
  },
};
