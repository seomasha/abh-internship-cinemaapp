package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.MovieListDTO;
import com.abhinternship.CinemaApp.dto.MovieWithProjectionsDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.service.MovieService;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<MovieWithProjectionsDTO> getMovieById(@PathVariable Long id) throws ResourceNotFoundException {
        MovieWithProjectionsDTO movieWithProjections = movieService.findMovieWithProjectionsById(id);
        return ResponseEntity.ok(movieWithProjections);
    }

    @GetMapping("/currently-showing")
    public ResponseEntity<MovieListDTO> getCurrentlyShowingMovies(@RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "4") int size,
                                                                  @RequestParam(required = false) Map<String, String> filters) {
        final MovieListDTO currentlyShowingMovies;

        final FilterMovie filterMovie = (filters == null || filters.isEmpty()) ? FilterMovie.empty() : new FilterMovie(filters);
        currentlyShowingMovies = movieService.findCurrentlyShowingMovies(filterMovie, page, size);

        return ResponseEntity.ok(currentlyShowingMovies);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<MovieListDTO> getUpcomingMovies(@RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "4") int size,
                                                          @RequestParam(required = false) Map<String, String> filters) {
        final MovieListDTO upcomingMovies;

        final FilterMovie filterMovie = (filters == null || filters.isEmpty()) ? FilterMovie.empty() : new FilterMovie(filters);
        upcomingMovies = movieService.findUpcomingMovies(filterMovie, page, size);

        return ResponseEntity.ok(upcomingMovies);
    }

    @GetMapping("/draft")
    public ResponseEntity<List<Movie>> getDraftMovies() {
        final List<Movie> movies = movieService.findMoviesByStatus("draft%");
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/archived")
    public ResponseEntity<List<Movie>> getArchivedMovies() {
        final List<Movie> movies = movieService.findMoviesByStatus("archived");
        return ResponseEntity.ok(movies);
    }

    @PostMapping
    public ResponseEntity<Long> createMovie(final @RequestBody Movie movie) throws ResourceNotFoundException {
        movieService.saveMovie(movie);
        return ResponseEntity
                .status(HttpStatus.CREATED).body(movie.getId());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<String> updateMovieStatus(@PathVariable Long id, @RequestParam String status) throws ResourceNotFoundException {
        movieService.updateMovieStatus(id, status);
        return ResponseEntity.ok("Movie status updated successfully.");
    }

    @PatchMapping("/status")
    public ResponseEntity<String> updateMoviesStatus(@RequestBody List<Long> ids, @RequestParam String status) throws ResourceNotFoundException {
        movieService.updateMoviesStatus(ids, status);
        return ResponseEntity.ok("Movies status updated successfully.");
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMovie(final @PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok("Movie with ID " + id + " was successfully deleted.");
    }
}
