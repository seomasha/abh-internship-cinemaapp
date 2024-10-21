import { apiService } from "./apiService";

const MOVIE_ENDPOINT = "/movies";

export const movieService = {
    getAllMovies: () => apiService.getAll(MOVIE_ENDPOINT),
    getMovieById: (id) => apiService.get(`${MOVIE_ENDPOINT}/${id}`),
    createMovie: (movieData) => apiService.create(MOVIE_ENDPOINT, movieData),
    updateMovie: (id, movieData) => apiService.update(`${MOVIE_ENDPOINT}/${id}`, movieData),
    deleteMovie: (id) => apiService.delete(`${MOVIE_ENDPOINT}/${id}`)
}
