package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.service.ProjectionService;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projections")
@AllArgsConstructor
public class ProjectionController {
    private final ProjectionService projectionService;

    @GetMapping
    public ResponseEntity<List<Projection>> getAllProjections() {
        final List<Projection> projections = projectionService.findAllProjections();
        return ResponseEntity.ok(projections);
    }

    @GetMapping("/venue/{venueId}")
    public ResponseEntity<Map<String, List<Movie>>> getMoviesByVenue(@PathVariable Venue venueId,
                                                                     @RequestParam(defaultValue = "0") int page,
                                                                     @RequestParam(defaultValue = "5") int size) {
        final Map<String, List<Movie>> movies = projectionService.getMoviesByVenue(venueId, page, size);
        return ResponseEntity.ok(movies);
    }
}
