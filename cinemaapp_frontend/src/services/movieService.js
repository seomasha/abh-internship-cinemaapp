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
  getArchivedMovies: async () => {
    const response = await request(`${MOVIE_ENDPOINT}/archived`);
    return response;
  },
  updateMovie: async (id, status) => {
    const response = await request(
      `${MOVIE_ENDPOINT}/${id}/status?status=${status}`,
      { method: "PATCH" }
    );
    return response;
  },
  updateMovies: async (ids, status) => {
    const response = await request(
      `${MOVIE_ENDPOINT}/status?status=${status}`,
      { method: "PATCH", data: ids }
    );
    return response;
  },
};
