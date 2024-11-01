import axios from "axios";
import { apiService, BASE_URL } from "./apiService";

const VENUE_ENDPOINT = "/venues";

const venueApiService = apiService(VENUE_ENDPOINT);

export const venueService = {
  ...venueApiService,
  getAllCities: async () => {
    const response = await axios.get(`${BASE_URL}${VENUE_ENDPOINT}/cities`);
    return response.data;
  },
};
