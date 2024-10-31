import axios from "axios";
import { apiService, BASE_URL } from "./apiService";

const MOVIE_ENDPOINT = "/movies";

const movieApiService = apiService(MOVIE_ENDPOINT);

export const movieService = {
  ...movieApiService,
  getMovies: async ({
    type = "currently-showing",
    page = 0,
    size = 4,
    ...filters
  } = {}) => {
    let endpoint = `${BASE_URL + MOVIE_ENDPOINT}/${type}`;

    const params = { page, size, ...filters };

    const response = await axios.get(endpoint, { params });
    return response.data;
  },
};
