package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.service.ProjectionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
