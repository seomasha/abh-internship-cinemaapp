package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.VenueDTO;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.service.VenueService;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<VenueDTO> getAllVenues(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "4") int size) {
        final VenueDTO venues = venueService.findAllVenues(page, size);
        return ResponseEntity.ok(venues);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) throws ResourceNotFoundException {
        return venueService.findVenueById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<Venue> createVenue(@RequestBody Venue venue) {
        final Venue savedVenue = venueService.saveVenue(venue);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVenue);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVenue(@PathVariable Long id) {
        venueService.deleteVenue(id);
        return ResponseEntity.ok("Venue with ID " + id + " was successfully deleted.");
    }
}
