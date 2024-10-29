import axios from "axios";
import { apiService, BASE_URL } from "./apiService";

const MOVIE_ENDPOINT = "/movies";

const movieApiService = apiService(MOVIE_ENDPOINT);

export const movieService = {
  ...movieApiService,
  getCurrentlyShowingMovies: async (page = 0, size = 4) => {
    const response = await axios.get(
      BASE_URL + MOVIE_ENDPOINT + "/currently-showing",
      { params: { page, size } }
    );
    return response.data;
  },
  getUpcomingMovies: async (page = 0, size = 4) => {
    const response = await axios.get(BASE_URL + MOVIE_ENDPOINT + "/upcoming", {
      params: { page, size },
    });
    return response.data;
  },
  getCurrentlyShowingMoviesByVenueId: async (venueId, page = 0, size = 4) => {
    const response = await axios.get(
      BASE_URL + MOVIE_ENDPOINT + `/venue/${venueId}/currently-showing`,
      {
        params: { page, size },
      }
    );
    return response.data;
  },
  getUpcomingMoviesByVenueId: async (venueId, page = 0, size = 4) => {
    const response = await axios.get(
      BASE_URL + MOVIE_ENDPOINT + `/venue/${venueId}/upcoming`,
      {
        params: { page, size },
      }
    );
    return response.data;
  },
};
