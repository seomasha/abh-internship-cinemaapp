package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Venue;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface MovieService {
    List<Movie> findAllMovies();
    Optional<Movie> findMovieById(Long id);
    void saveMovie(Movie movie);
    void deleteMovie(Long id);
    List<Movie> findCurrentlyShowingMovies(int page, int size);
    List<Movie> findUpcomingMovies(int page, int size);
    List<Movie> getCurrentlyShowingMoviesByVenue(Venue venue, int page, int size);
    List<Movie> getUpcomingMoviesByVenue(Venue venue, int page, int size);
}
