import { apiService } from "../services/apiService";

const GENRE_ENDPOINT = "/genres";

const genreApiService = apiService(GENRE_ENDPOINT);

export const genreService = {
  ...genreApiService,
};
