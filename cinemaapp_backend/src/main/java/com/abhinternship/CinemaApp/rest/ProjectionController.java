package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.service.ProjectionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/projections")
@AllArgsConstructor
public class ProjectionController {
    private final ProjectionService projectionService;

    @GetMapping
    public ResponseEntity<List<Projection>> getAllProjections() {
        List<Projection> projections = projectionService.findAllProjections();
        return ResponseEntity.ok(projections);
    }

    @GetMapping("/venue/{venueId}")
    public ResponseEntity<List<Projection>> getAllProjectionsByVenueId(@PathVariable Venue venueId) {
        List<Projection> projections = projectionService.findAllByVenueId(venueId);
        return ResponseEntity.ok(projections);
    }
}
