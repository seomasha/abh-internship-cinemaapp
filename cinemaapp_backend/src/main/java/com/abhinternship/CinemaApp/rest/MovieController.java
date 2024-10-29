package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Movie;
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
        return movieService.findMovieById(id).map(ResponseEntity::ok).orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));

    }

    @GetMapping("/overview")
    public ResponseEntity<Map<String, List<Movie>>> getMoviesOverview(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
        final Map<String, List<Movie>> moviesOverview = new HashMap<>();

        final List<Movie> heroMovies = movieService.findHeroMovies(3);
        final List<Movie> currentlyShowingMovies = movieService.findCurrentlyShowingMovies(page, size);
        final List<Movie> upcomingMovies = movieService.findUpcomingMovies(page, size);

        moviesOverview.put("heroMovies", heroMovies);
        moviesOverview.put("currentlyShowingMovies", currentlyShowingMovies);
        moviesOverview.put("upcomingMovies", upcomingMovies);

        return ResponseEntity.ok(moviesOverview);
    }

    @PostMapping
    public ResponseEntity<Movie> createMovie(final @RequestBody Movie movie) {
        final Movie savedMovie = movieService.saveMovie(movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMovie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMovie(final @PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok("Movie with ID " + id + " was successfully deleted.");
    }
}
