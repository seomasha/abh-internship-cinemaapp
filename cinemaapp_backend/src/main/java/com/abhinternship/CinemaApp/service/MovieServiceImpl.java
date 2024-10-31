package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.MovieDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.FilterMovieRepositoryImpl;
import com.abhinternship.CinemaApp.repository.MovieRepository;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import com.abhinternship.CinemaApp.repository.VenueRepository;
import com.abhinternship.CinemaApp.utils.FilterMovie;
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
    private final VenueRepository venueRepository;
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
    public void saveMovie(final Movie movie) {
        movieRepository.save(movie);
    }

    @Override
    public void deleteMovie(final Long id) {
        movieRepository.deleteById(id);
    }

    @Override
    public MovieDTO findCurrentlyShowingMovies(final FilterMovie filterMovie, final int page, final int size) {
        final LocalDate today = LocalDate.now();
        final LocalDate endDate = today.plusDays(10);
        final Pageable pageable = PageRequest.of(page, size);

        if (filterMovie.isEmpty()) {
            final Page<Movie> currentlyShowingMoviesPage = movieRepository
                    .findByProjectionStartDateBeforeAndProjectionEndDateAfter(endDate, today, pageable);
            return new MovieDTO(currentlyShowingMoviesPage);
        }

        final Page<Movie> moviePage = filterMovieRepositoryImpl.findMoviesByFilter(
                filterMovie, pageable);

        final List<Movie> currentlyShowingMovies = moviePage.getContent().stream()
                .filter(movie -> !movie.getProjectionStartDate().isAfter(endDate)
                        && !movie.getProjectionEndDate().isBefore(today))
                .collect(Collectors.toList());

        return new MovieDTO(currentlyShowingMovies, currentlyShowingMovies.size());
    }

    @Override
    public MovieDTO findUpcomingMovies(final FilterMovie filterMovie, final int page, final int size) {
        final LocalDate endDate = LocalDate.now().plusDays(10);
        final Pageable pageable = PageRequest.of(page, size);

        if (filterMovie.isEmpty()) {
            final Page<Movie> upcomingMoviesPage = movieRepository
                    .findByProjectionStartDateGreaterThanEqual(endDate, pageable);
            return new MovieDTO(upcomingMoviesPage);
        }

        final Page<Movie> moviePage = filterMovieRepositoryImpl.findMoviesByFilter(
                filterMovie, pageable);

        final List<Movie> upcomingMovies = moviePage.getContent().stream()
                .filter(movie -> movie.getProjectionStartDate().isAfter(endDate))
                .collect(Collectors.toList());

        return new MovieDTO(upcomingMovies, upcomingMovies.size());
    }
}
