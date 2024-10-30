package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.MovieDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.MovieRepository;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.*;


@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final ProjectionRepository projectionRepository;

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
        final Page<Movie> currentlyShowingMoviesPage = movieRepository.findByProjectionStartDateBeforeAndProjectionEndDateAfter(today.plusDays(10), today, pageable);

        final List<Movie> movies = currentlyShowingMoviesPage.getContent();
        final long totalSize = currentlyShowingMoviesPage.getTotalElements();

        return new MovieDTO(movies, totalSize);
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
    public MovieDTO getCurrentlyShowingMoviesByVenue(final Venue venue, final int page, final int size) {
        final Page<Projection> projectionPage = projectionRepository.findAllByVenueId(venue, PageRequest.of(page, size));
        final List<Projection> projections = projectionPage.getContent();
        final List<Movie> currentlyShowing = new ArrayList<>();

        final LocalDate today = LocalDate.now();
        final LocalDate endDate = today.plusDays(10);

        for (Projection projection : projections) {
            final Movie movie = projection.getMovieId();
            final LocalDate projectionStartDate = movie.getProjectionStartDate();
            final LocalDate projectionEndDate = movie.getProjectionEndDate();

            if (projectionStartDate.isBefore(endDate) && projectionEndDate.isAfter(today)) {
                currentlyShowing.add(movie);
            }
        }

        final long totalCurrentlyShowingSize = currentlyShowing.size();

        return new MovieDTO(currentlyShowing, totalCurrentlyShowingSize);
    }

    @Override
    public MovieDTO getUpcomingMoviesByVenue(final Venue venue, final int page, final int size) {
        final Page<Projection> projectionPage = projectionRepository.findAllByVenueId(venue, PageRequest.of(page, size));
        final List<Projection> projections = projectionPage.getContent();
        final List<Movie> upcoming = new ArrayList<>();

        final LocalDate today = LocalDate.now();
        final LocalDate endDate = today.plusDays(10);

        for (Projection projection : projections) {
            final Movie movie = projection.getMovieId();
            final LocalDate projectionStartDate = movie.getProjectionStartDate();

            if (projectionStartDate.isAfter(endDate)) {
                upcoming.add(movie);
            }
        }

        final long upcomingSize = upcoming.size();

        return new MovieDTO(upcoming, upcomingSize);
    }
}
