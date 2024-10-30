import axios from "axios";
import { apiService, BASE_URL } from "./apiService";

const VENUE_ENDPOINT = "/venues";

const venueApiService = apiService(VENUE_ENDPOINT);

export const venueService = {
  ...venueApiService,
  getAll: async (page = 0, size = 4) => {
    const response = await axios.get(BASE_URL + VENUE_ENDPOINT, {
      params: { page, size },
    });

    return response.data;
  },
};
