import { apiService, request } from "./apiService";

const TICKET_ENDPOINT = "/tickets";

const ticketApiService = apiService(TICKET_ENDPOINT);

export const ticketService = {
  ...ticketApiService,
  buyTickets: async (data) => {
    const response = await request(`${TICKET_ENDPOINT}/buy`, {
      method: "POST",
      data: data,
    });
    return response;
  },
};
