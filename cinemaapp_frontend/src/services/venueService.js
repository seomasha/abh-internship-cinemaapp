import { apiService, request } from "./apiService";

const VENUE_ENDPOINT = "/venues";

const venueApiService = apiService(VENUE_ENDPOINT);

export const venueService = {
  ...venueApiService,
  getAllCities: async () => {
    const response = await request(`${VENUE_ENDPOINT}/cities`);
    return response;
  },
};
