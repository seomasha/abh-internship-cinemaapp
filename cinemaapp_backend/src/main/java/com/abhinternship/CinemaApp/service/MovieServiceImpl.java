package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.MovieListDTO;
import com.abhinternship.CinemaApp.dto.MovieWithProjectionsDTO;
import com.abhinternship.CinemaApp.enums.MovieStatus;
import com.abhinternship.CinemaApp.model.Genre;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.repository.FilterMovieRepositoryImpl;
import com.abhinternship.CinemaApp.repository.GenreRepository;
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
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final ProjectionRepository projectionRepository;
    private final GenreRepository genreRepository;
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
    public List<Movie> findMoviesByStatus(final String status) {
        return movieRepository.findAllByStatus(status);
    }

    @Override
    public void saveMovie(final Movie movie) throws ResourceNotFoundException {
        final Set<Genre> genres = new HashSet<>();
        for (final Genre genre : movie.getGenres()) {
            final Genre existingGenre = genreRepository.findById(genre.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Genre not found for id: " + genre.getId()));
            genres.add(existingGenre);
        }

        movie.setGenres(genres);

        movieRepository.save(movie);
    }

    @Override
    public void updateMovieStatus(final Long id, String status) throws ResourceNotFoundException {
        final Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));

        if (status.equalsIgnoreCase(MovieStatus.PUBLISHED.toString())
                && (movie.getStatus().equalsIgnoreCase(MovieStatus.DRAFT1.toString())
                || movie.getStatus().equalsIgnoreCase(MovieStatus.DRAFT2.toString()))) {
            throw new IllegalArgumentException("The movie cannot be published as it is not completed yet.");
        }

        if (status.equalsIgnoreCase(MovieStatus.PUBLISHED.toString())) {
            final LocalDateTime now = LocalDateTime.now();

            if (movie.getProjectionStartDate() != null && movie.getProjectionEndDate() != null) {
                final LocalDate startDate = movie.getProjectionStartDate();
                final LocalDate endDate = movie.getProjectionEndDate();

                if (now.isAfter(startDate.atStartOfDay()) &&
                        now.isBefore(endDate.plusDays(1).atStartOfDay())) {
                    status = MovieStatus.PUBLISHED.toString().toLowerCase();
                } else if (now.isBefore(startDate.atStartOfDay())) {
                    status = MovieStatus.PUBLISHED_UPCOMING.toString().toLowerCase();
                }
            } else {
                throw new IllegalArgumentException("Projection dates must be set to publish the movie.");
            }
        }

        movie.setStatus(status.toLowerCase());
        movieRepository.save(movie);
    }

    @Override
    public void updateMoviesStatus(final List<Long> ids, final String status) throws ResourceNotFoundException {
        for (final Long id : ids) {
            updateMovieStatus(id, status);
        }
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
                ? movieRepository.findByProjectionStartDateBeforeAndProjectionEndDateAfterAndStatus(endDate, today, pageable, "published")
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
                ? movieRepository.findByProjectionStartDateGreaterThanEqualAndStatus(endDate, pageable, "published_upcoming")
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
