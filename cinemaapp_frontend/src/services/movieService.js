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
  getCurrentlyShowingMovies: async (page = 0, size = 5) => {
    const response = await axios.get(
      BASE_URL + MOVIE_ENDPOINT + "/currently-showing",
      { params: { page, size } }
    );
    return response.data;
  },
  getUpcomingMovies: async (page = 0, size = 5) => {
    const response = await axios.get(BASE_URL + MOVIE_ENDPOINT + "/upcoming", {
      params: { page, size },
    });
    return response.data;
  },
};
