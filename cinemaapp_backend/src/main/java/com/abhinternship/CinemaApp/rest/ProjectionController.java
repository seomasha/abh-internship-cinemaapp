package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.ProjectionDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.service.ProjectionService;
import lombok.AllArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}")
    public ResponseEntity<Projection> getProjectionByID(@PathVariable Long id) {
        final Optional<Projection> projection = projectionService.findProjectionById(id);
        return projection.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<List<Projection>> getProjectionsByMovieID(@PathVariable Long id) {
        final List<Projection> projections = projectionService.findProjectionByMovieId(id);
        return ResponseEntity.ok(projections);
    }

    @GetMapping("/times")
    public ResponseEntity<List<LocalTime>> getAllDistinctProjectionTimes() {
        final List<LocalTime> projectionTimes = projectionService.findAllDistinctProjectionTimes();
        return ResponseEntity.ok(projectionTimes);
    }

    @GetMapping("/movie-venue")
    public ResponseEntity<Projection> getProjectionByMovieAndVenue(
            @RequestParam Long movieId,
            @RequestParam Long venueId) {
        final Optional<Projection> projection = projectionService.findProjectionByMovieIdAndVenueId(movieId, venueId);
        return projection.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/movie-times")
    public ResponseEntity<List<LocalTime>> getProjectionTimesByMovieAndVenue(
            @RequestParam String movieName,
            @RequestParam String city,
            @RequestParam String venueName) {
        final List<LocalTime> projectionTimes = projectionService.findProjectionTimesByMovieAndVenue(
                movieName, city, venueName);
        return ResponseEntity.ok(projectionTimes);
    }

    @PostMapping
    public ResponseEntity<String> createProjection(@RequestBody List<ProjectionDTO> projections) {
        projectionService.saveProjection(projections);
        return ResponseEntity.status(HttpStatus.CREATED).body("The projections have been successfully created");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProjection(@PathVariable Long id) {
        projectionService.deleteProjection(id);
        return ResponseEntity.ok("Projection with ID " + id + " successfully deleted.");
    }
}
