import { apiService, request } from "./apiService";

const TICKET_ENDPOINT = "/tickets";

const ticketApiService = apiService(TICKET_ENDPOINT);

export const ticketService = {
  ...ticketApiService,
  reserveTickets: async (data) => {
    const response = await request(`${TICKET_ENDPOINT}/reserve`, {
      method: "POST",
      data: data,
    });
    return response;
  },
  getReservedSeats: async (projectionId, date) => {
    const response = await request(
      `${TICKET_ENDPOINT}/reserved-seats?projectionId=${projectionId}&date=${date}`
    );
    return response;
  },
  buyTickets: async (data) => {
    const response = await request(`${TICKET_ENDPOINT}/buy`, {
      method: "PUT",
      data: data,
    });
    return response;
  },
  getSeatPrice: async (data) => {
    const response = await request(`${TICKET_ENDPOINT}/seat-price`, {
      method: "POST",
      data: data,
    });
    return response;
  },
  getUserUpcomingProjections: async (id) => {
    const response = await request(`${TICKET_ENDPOINT}/user/${id}/upcoming`);
    return response;
  },
  getUserExpiredProjections: async (id) => {
    const response = await request(`${TICKET_ENDPOINT}/user/${id}/expired`);
    return response;
  },
};
