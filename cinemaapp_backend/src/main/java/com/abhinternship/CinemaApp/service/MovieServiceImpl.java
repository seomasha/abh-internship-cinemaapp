package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.MovieListDTO;
import com.abhinternship.CinemaApp.dto.MovieWithProjectionsDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.repository.FilterMovieRepositoryImpl;
import com.abhinternship.CinemaApp.repository.MovieRepository;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final ProjectionRepository projectionRepository;
    private final FilterMovieRepositoryImpl filterMovieRepositoryImpl;

    @Override
    public List<Movie> findAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Optional<Movie> findMovieById(final Long id) {
        return movieRepository.findById(id);
    }

    @Override
    public MovieWithProjectionsDTO findMovieWithProjectionsById(final Long id) throws ResourceNotFoundException {
        final Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));

        final Set<Projection> projections = projectionRepository.findByMovieIdOrderByProjectionTime(movie);
        return MovieWithProjectionsDTO.fromMovie(movie, projections);
    }

    @Override
    public List<Movie> findAllDraftMovies() {
        return movieRepository.findAllByStatus();
    }


    @Override
    public void saveMovie(final Movie movie) {
        movieRepository.save(movie);
    }

    @Override
    public void deleteMovie(final Long id) {
        movieRepository.deleteById(id);
    }

    @Override
    public MovieListDTO findCurrentlyShowingMovies(final FilterMovie filterMovie, final int page, final int size) {
        final LocalDate today = LocalDate.now();
        final LocalDate endDate = today.plusDays(10);
        final Pageable pageable = PageRequest.of(page, size);

        final Page<Movie> moviePage = filterMovie.isEmpty()
                ? movieRepository.findByProjectionStartDateBeforeAndProjectionEndDateAfter(endDate, today, pageable)
                : filterMovieRepositoryImpl.findMoviesByFilter(filterMovie, pageable, true);

        final List<MovieWithProjectionsDTO> moviesWithProjections = moviePage.getContent().stream()
                .map(movie -> {
                    final Set<Projection> projections = projectionRepository.findByMovieIdOrderByProjectionTime(movie);
                    return MovieWithProjectionsDTO.fromMovie(movie, projections);
                })
                .collect(Collectors.toList());

        return MovieListDTO.fromMoviesWithProjections(moviesWithProjections, moviePage.getTotalElements());
    }

    @Override
    public MovieListDTO findUpcomingMovies(final FilterMovie filterMovie, final int page, final int size) {
        final LocalDate endDate = LocalDate.now().plusDays(10);
        final Pageable pageable = PageRequest.of(page, size);

        final Page<Movie> moviePage = filterMovie.isEmpty()
                ? movieRepository.findByProjectionStartDateGreaterThanEqual(endDate, pageable)
                : filterMovieRepositoryImpl.findMoviesByFilter(filterMovie, pageable, false);

        final List<MovieWithProjectionsDTO> moviesWithProjections = moviePage.getContent().stream()
                .map(movie -> {
                    final Set<Projection> projections = projectionRepository.findByMovieIdOrderByProjectionTime(movie);
                    return MovieWithProjectionsDTO.fromMovie(movie, projections);
                })
                .collect(Collectors.toList());

        return MovieListDTO.fromMoviesWithProjections(moviesWithProjections, moviePage.getTotalElements());
    }


}
