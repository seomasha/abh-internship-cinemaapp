package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.MovieDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface MovieService {
    List<Movie> findAllMovies();
    Optional<Movie> findMovieById(Long id);
    void saveMovie(Movie movie);
    void deleteMovie(Long id);
    MovieDTO findCurrentlyShowingMovies(FilterMovie filterMovie, int page, int size);
    MovieDTO findUpcomingMovies(FilterMovie filterMovie, int page, int size);
}
