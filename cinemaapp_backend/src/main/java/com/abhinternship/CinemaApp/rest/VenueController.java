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
        try {
            final List<Venue> venues = venueService.findAllVenues();
            return ResponseEntity.ok(venues);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to fetch venues");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(final @PathVariable Long id) {
        try {
            return venueService.findVenueById(id)
                    .map(ResponseEntity::ok)
                    .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));
        } catch (Exception | ResourceNotFoundException ex) {
            throw new RuntimeException("Error occurred while fetching the venue.");
        }
    }

    @PostMapping
    public ResponseEntity<Venue> createVenue(final @RequestBody Venue venue) {
        try {
            final Venue savedVenue = venueService.saveVenue(venue);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedVenue);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Invalid venue details provided: " + ex.getMessage());
        } catch (Exception ex) {
            throw new RuntimeException("Failed to create venue.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenue(final @PathVariable Long id) {
        try {
            venueService.deleteVenue(id);
            return ResponseEntity.noContent().build();
        } catch (Exception ex) {
            throw new RuntimeException("Failed to delete venue.");
        }
    }
}
