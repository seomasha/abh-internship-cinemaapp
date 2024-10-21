import { apiService } from "./apiService";

const MOVIE_ENDPOINT = "/movies";

const movieApiService = apiService(MOVIE_ENDPOINT);

export const movieService = {
    ...movieApiService
}
