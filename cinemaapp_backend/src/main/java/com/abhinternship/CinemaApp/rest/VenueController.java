package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.service.VenueService;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/venues")
public class VenueController {
    private final VenueService venueService;

    @GetMapping
    public ResponseEntity<List<Venue>> getAllVenues() {
        final List<Venue> venues = venueService.findAllVenues();
        return ResponseEntity.ok(venues);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(final @PathVariable Long id) throws ResourceNotFoundException {
        return venueService.findVenueById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<Venue> createVenue(final @RequestBody Venue venue) {
        final Venue savedVenue = venueService.saveVenue(venue);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVenue);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVenue(final @PathVariable Long id) {
        venueService.deleteVenue(id);
        return ResponseEntity.ok("Venue with ID " + id + " was successfully deleted.");
    }
}
