package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Venue;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MovieService {
    List<Movie> findAllMovies();
    Optional<Movie> findMovieById(Long id);
    Movie saveMovie(Movie movie);
    void deleteMovie(Long id);
    List<Movie> findMovieByProjectionDateRange();
    List<Movie> findUpcomingMovies();
    List<Movie> findHeroMovies(int count);
}
