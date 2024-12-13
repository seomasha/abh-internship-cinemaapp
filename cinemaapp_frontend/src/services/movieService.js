import { apiService, request } from "./apiService";

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
    let endpoint = `${MOVIE_ENDPOINT}/${type}`;

    const params = { page, size, ...filters };

    const response = await request(endpoint, { params });
    return response;
  },
  getDraftMovies: async () => {
    const response = await request(`${MOVIE_ENDPOINT}/draft`);
    return response;
  },
};
