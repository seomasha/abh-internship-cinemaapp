package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.service.MovieService;
import com.abhinternship.CinemaApp.service.ProjectionService;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;
    private final ProjectionService projectionService;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        try {
            List<Movie> movies = movieService.findAllMovies();
            return ResponseEntity.ok(movies);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to fetch movies.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) throws ResourceNotFoundException {
        try {
            return movieService.findMovieById(id)
                    .map(ResponseEntity::ok)
                    .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
        } catch (ResourceNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to fetch movie with id: " + id);
        }
    }

    @GetMapping("/venue/{venueId}")
    public ResponseEntity<List<Movie>> getMoviesByVenue(@PathVariable Venue venueId) {
        try {
            List<Movie> movies = movieService.findMoviesByVenueId(venueId);
            return ResponseEntity.ok(movies);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to fetch movies for venue with id: " + venueId);
        }
    }

    @PostMapping
    public ResponseEntity<Movie> createMovie(final @RequestBody Movie movie) {
        try {
            final Movie savedMovie = movieService.saveMovie(movie);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedMovie);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to create movie");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(final @PathVariable Long id) {
        try {
            movieService.deleteMovie(id);
            return ResponseEntity.noContent().build();
        } catch (Exception ex) {
            throw new RuntimeException("Failed to delete movie");
        }
    }
}
