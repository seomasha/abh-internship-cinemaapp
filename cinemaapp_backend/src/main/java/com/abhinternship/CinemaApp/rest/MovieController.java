package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.MovieDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.VenueRepository;
import com.abhinternship.CinemaApp.service.MovieService;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;
    private final VenueRepository venueRepository;

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
    public ResponseEntity<MovieDTO> getCurrentlyShowingMovies(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "4") int size,
                                                              @RequestParam(required = false) Map<String, String> filters) {
        final MovieDTO currentlyShowingMovies;

        if(filters.isEmpty()) {
            currentlyShowingMovies = movieService.findCurrentlyShowingMovies(page, size);
        } else {
            currentlyShowingMovies = movieService.findCurrentlyShowingMovies(new FilterMovie(filters), page, size);
        }
        return ResponseEntity.ok(currentlyShowingMovies);
    }


    @GetMapping("/upcoming")
    public ResponseEntity<MovieDTO> getUpcomingMovies(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "4") int size,
                                                      @RequestParam(required = false) Map<String, String> filters) {
        final MovieDTO upcomingMovies;

        if (filters == null || filters.isEmpty()) {
            upcomingMovies = movieService.findUpcomingMovies(page, size);
        } else {
            FilterMovie filterMovie = new FilterMovie(filters);
            upcomingMovies = movieService.findUpcomingMovies(filterMovie, page, size);
        }

        return ResponseEntity.ok(upcomingMovies);
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
