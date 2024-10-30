package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.MovieDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.service.MovieService;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<MovieDTO> getCurrentlyShowingMovies(@RequestParam(defaultValue = "0") int page, final @RequestParam(defaultValue = "5") int size) {
        final MovieDTO currentlyShowingMovies = movieService.findCurrentlyShowingMovies(page, size);
        return ResponseEntity.ok(currentlyShowingMovies);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<MovieDTO> getUpcomingMovies(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        final MovieDTO upcomingMovies = movieService.findUpcomingMovies(page, size);
        return ResponseEntity.ok(upcomingMovies);
    }

    @GetMapping("/venue/{venueId}/currently-showing")
    public ResponseEntity<MovieDTO> getCurrentlyShowingMoviesByVenue(@PathVariable Venue venueId,
                                                                     @RequestParam(defaultValue = "0") int page,
                                                                     @RequestParam(defaultValue = "4") int size) {
        final MovieDTO movies = movieService.getCurrentlyShowingMoviesByVenue(venueId, page, size);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/venue/{venueId}/upcoming")
    public ResponseEntity<MovieDTO> getUpcomingMoviesByVenue(@PathVariable Venue venueId,
                                                             @RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "4") int size) {
        final MovieDTO movies = movieService.getUpcomingMoviesByVenue(venueId, page, size);
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
