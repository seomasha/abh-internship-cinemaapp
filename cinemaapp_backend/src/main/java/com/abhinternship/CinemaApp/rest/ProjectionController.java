package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.service.ProjectionService;
import lombok.AllArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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

    @GetMapping("/times")
    public ResponseEntity<List<LocalTime>> getAllDistinctProjectionTimes() {
        final List<LocalTime> projectionTimes = projectionService.findAllDistinctProjectionTimes();
        return ResponseEntity.ok(projectionTimes);
    }

    @GetMapping("/movie-times")
    public ResponseEntity<List<LocalTime>> getProjectionTimesByMovieAndVenue(
            @RequestParam String movieName,
            @RequestParam String city,
            @RequestParam String venueName) {
        List<LocalTime> projectionTimes = projectionService.findProjectionTimesByMovieAndVenue(
                movieName, city, venueName);
        return ResponseEntity.ok(projectionTimes);
    }
}
