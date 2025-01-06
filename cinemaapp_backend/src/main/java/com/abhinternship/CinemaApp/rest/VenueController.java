package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.VenueDTO;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.service.VenueService;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAllCities() {
        final List<String> cities = venueService.findAllCities();
        return ResponseEntity.of(Optional.ofNullable(cities));
    }

    @GetMapping("/cities-by-movie")
    public ResponseEntity<List<String>> getCitiesByMovieName(@RequestParam String movieName) {
        final List<String> cities = venueService.findCitiesByMovieName(movieName);
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/venues-for-movie")
    public ResponseEntity<List<String>> getCitiesByMovieName(@RequestParam String movieName,
                                                             @RequestParam String cityName) {
        final List<String> venues = venueService.findVenuesByCityAndMovieName(movieName, cityName);
        return ResponseEntity.ok(venues);
    }

    @GetMapping("/venues-by-movie-name")
    public ResponseEntity<List<String>> getVenuesByMovieName(@RequestParam String movieName) {
        final List<String> venues = venueService.findVenueByMovieName(movieName);
        return ResponseEntity.ok(venues);
    }

    @GetMapping("/venues-by-city")
    public ResponseEntity<List<Venue>> getVenuesByCity(@RequestParam String cityName) {
        final List<Venue> venues = venueService.findVenuesByCity(cityName);
        return ResponseEntity.ok(venues);
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

    @PutMapping("/{id}")
    public ResponseEntity<Venue> updateVenue(@PathVariable Long id, @RequestParam Long photoImageId) {
        final Venue venue = venueService.updateVenueImage(id, photoImageId);
        return ResponseEntity.ok(venue);
    }
}
