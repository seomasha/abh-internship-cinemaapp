package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.MoviePageResponse;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.service.MovieService;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        final List<Movie> movies = movieService.findAllMovies();
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) throws ResourceNotFoundException {
        return movieService.findMovieById(id).
                map(ResponseEntity::ok).
                orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));

    }

    @GetMapping("/currently-showing")
    public ResponseEntity<MoviePageResponse> getCurrentlyShowingMovies(@RequestParam(defaultValue = "0") int page, final @RequestParam(defaultValue = "5") int size) {
        final MoviePageResponse currentlyShowingMovies = movieService.findCurrentlyShowingMovies(page, size);
        return ResponseEntity.ok(currentlyShowingMovies);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<MoviePageResponse> getUpcomingMovies(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        final MoviePageResponse upcomingMovies = movieService.findUpcomingMovies(page, size);
        return ResponseEntity.ok(upcomingMovies);
    }

    @GetMapping("/venue/{venueId}/currently-showing")
    public ResponseEntity<MoviePageResponse> getCurrentlyShowingMoviesByVenue(@PathVariable Venue venueId,
                                                                              @RequestParam(defaultValue = "0") int page,
                                                                              @RequestParam(defaultValue = "4") int size) {
        final MoviePageResponse movies = movieService.getCurrentlyShowingMoviesByVenue(venueId, page, size);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/venue/{venueId}/upcoming")
    public ResponseEntity<MoviePageResponse> getUpcomingMoviesByVenue(@PathVariable Venue venueId,
                                                                      @RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "4") int size) {
        final MoviePageResponse movies = movieService.getUpcomingMoviesByVenue(venueId, page, size);
        return ResponseEntity.ok(movies);
    }


    @PostMapping
    public ResponseEntity<Long> createMovie(final @RequestBody Movie movie) {
        movieService.saveMovie(movie);
        return ResponseEntity
                .status(HttpStatus.CREATED).body(movie.getId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMovie(final @PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok("Movie with ID " + id + " was successfully deleted.");
    }
}
