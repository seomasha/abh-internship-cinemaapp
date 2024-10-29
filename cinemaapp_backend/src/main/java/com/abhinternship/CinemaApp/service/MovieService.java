package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Movie;
import java.util.List;
import java.util.Optional;

public interface MovieService {
    List<Movie> findAllMovies();
    Optional<Movie> findMovieById(Long id);
    Movie saveMovie(Movie movie);
    void deleteMovie(Long id);
    List<Movie> findCurrentlyShowingMovies(int page, int size);
    List<Movie> findUpcomingMovies(int page, int size);
    List<Movie> findHeroMovies(int count);
}
