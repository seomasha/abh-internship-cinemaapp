package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService{

    private final MovieRepository movieRepository;
    private final ProjectionService projectionService;

    @Override
    public List<Movie> findAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Optional<Movie> findMovieById(final Long id) {
        return movieRepository.findById(id);
    }

    @Override
    public Movie saveMovie(final Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public void deleteMovie(final Long id) {
        movieRepository.deleteById(id);
    }

    @Override
    public List<Movie> findMovieByProjectionDateRange() {
        final LocalDate today = LocalDate.now();
        return movieRepository.findMovieByProjectionDateRange(today, today.plusDays(10));
    }

    @Override
    public List<Movie> findUpcomingMovies() {
        LocalDate endDate = LocalDate.now().plusDays(10);
        return movieRepository.findUpcomingMovies(endDate);
    }

    @Override
    public List<Movie> findHeroMovies(final int count) {
        final List<Movie> allMovies = movieRepository.findAll();
        if (allMovies.size() <= count) {
            return allMovies;
        }

        final Random random = new Random();
        return random.ints(0, allMovies.size())
                .distinct()
                .limit(count)
                .mapToObj(allMovies::get)
                .toList();
    }
}
