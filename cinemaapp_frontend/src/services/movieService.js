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
  getCurrentlyShowingMovies: async () => {
    const response = await axios.get(
      BASE_URL + MOVIE_ENDPOINT + "/currently-showing"
    );
    return response.data;
  },
  getUpcomingMovies: async () => {
    const response = await axios.get(BASE_URL + MOVIE_ENDPOINT + "/upcoming");
    return response.data;
  },
  getHeroMovies: async () => {
    const response = await axios.get(
      BASE_URL + MOVIE_ENDPOINT + "/hero-movies"
    );
    return response.data;
  },
};
