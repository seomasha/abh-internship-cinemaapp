import axios from "axios";
import { apiService, BASE_URL } from "./apiService";

const MOVIE_ENDPOINT = "/movies";

const movieApiService = apiService(MOVIE_ENDPOINT);

export const movieService = {
  ...movieApiService,
  getMoviesByVenueId: async (venueId) => {
    const response = await axios.get(
      BASE_URL + MOVIE_ENDPOINT + `/venue/${venueId}`
    );
    return response.data;
  },
};
