package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService{

    private final MovieRepository movieRepository;

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
    public List<Movie> findCurrentlyShowingMovies(final int page, final int size) {
        final LocalDate today = LocalDate.now();
        final Pageable pageable = PageRequest.of(page, size);
        final Page<Movie> currentlyShowingMoviesPage = movieRepository.findByProjectionStartDateBeforeAndProjectionEndDateAfter(today.plusDays(10), today, pageable);
        return currentlyShowingMoviesPage.getContent();
    }

    @Override
    public List<Movie> findUpcomingMovies(final int page, final int size) {
        final LocalDate endDate = LocalDate.now().plusDays(10);
        final Pageable pageable = PageRequest.of(page, size);
        final Page<Movie> upcomingMoviesPage = movieRepository.findByProjectionStartDateGreaterThanEqual(endDate, pageable);
        return upcomingMoviesPage.getContent();
    }
}
