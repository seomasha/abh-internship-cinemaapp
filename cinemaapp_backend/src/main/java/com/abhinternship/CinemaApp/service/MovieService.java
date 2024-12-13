package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.MovieListDTO;
import com.abhinternship.CinemaApp.dto.MovieWithProjectionsDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface MovieService {
    List<Movie> findAllMovies();
    Optional<Movie> findMovieById(Long id);
    void saveMovie(Movie movie);
    void deleteMovie(Long id);
    MovieListDTO findCurrentlyShowingMovies(FilterMovie filterMovie, int page, int size);
    MovieListDTO findUpcomingMovies(FilterMovie filterMovie, int page, int size);
    MovieWithProjectionsDTO findMovieWithProjectionsById(Long id) throws ResourceNotFoundException;
    List<Movie> findAllDraftMovies();
}
