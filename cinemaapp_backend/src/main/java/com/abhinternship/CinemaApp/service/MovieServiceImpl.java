package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.MovieDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
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
    public MovieDTO findCurrentlyShowingMovies(final int page, final int size) {
        final LocalDate today = LocalDate.now();
        final Pageable pageable = PageRequest.of(page, size);
        final Page<Movie> currentlyShowingMoviesPage = movieRepository
                .findByProjectionStartDateBeforeAndProjectionEndDateAfter(today.plusDays(10), today, pageable);

        final List<Movie> movies = currentlyShowingMoviesPage.getContent();
        final long totalSize = currentlyShowingMoviesPage.getTotalElements();

        return new MovieDTO(movies, totalSize);
    }

    @Override
    public MovieDTO findCurrentlyShowingMovies(final FilterMovie filterMovie, final int page, final int size) {
        if (filterMovie.isEmpty()) {
            return findCurrentlyShowingMovies(page, size);
        }

        Optional<Venue> venue = venueRepository.findById(filterMovie.getVenueId());

        if (venue.isEmpty()) {
            return new MovieDTO(new ArrayList<>(), 0);
        }

        final LocalDate today = LocalDate.now();
        final LocalDate endDate = today.plusDays(10);
        final Page<Projection> projectionPage = projectionRepository.findCurrentlyShowingProjectionsByVenueAndMovieDates(
                venue.get(), today, endDate, PageRequest.of(page, size));

        final List<Movie> currentlyShowingMovies = projectionPage.stream()
                .map(Projection::getMovieId)
                .distinct()
                .collect(Collectors.toList());

        return new MovieDTO(currentlyShowingMovies, projectionPage.getTotalElements());

    }


    @Override
    public MovieDTO findUpcomingMovies(final int page, final int size) {
        final LocalDate endDate = LocalDate.now().plusDays(10);
        final Pageable pageable = PageRequest.of(page, size);
        final Page<Movie> upcomingMoviesPage = movieRepository
                .findByProjectionStartDateGreaterThanEqual(endDate, pageable);

        final List<Movie> movies = upcomingMoviesPage.getContent();
        final long totalSize = upcomingMoviesPage.getTotalElements();

        return new MovieDTO(movies, totalSize);
    }


    @Override
    public MovieDTO findUpcomingMovies(final FilterMovie filterMovie, final int page, final int size) {
        if (filterMovie.isEmpty()) {
            return findUpcomingMovies(page, size);
        }

        Optional<Venue> venue = venueRepository.findById(filterMovie.getVenueId());
        if (venue.isEmpty()) {
            return new MovieDTO(new ArrayList<>(), 0);
        }

        final LocalDate endDate = LocalDate.now().plusDays(10);
        final Page<Projection> projectionPage = projectionRepository.findUpcomingProjectionsByVenueAndMovieDates(
                venue.get(), endDate, PageRequest.of(page, size));

        final List<Movie> upcoming = projectionPage.stream()
                .map(Projection::getMovieId)
                .distinct()
                .collect(Collectors.toList());

        return new MovieDTO(upcoming, projectionPage.getTotalElements());
    }
}
