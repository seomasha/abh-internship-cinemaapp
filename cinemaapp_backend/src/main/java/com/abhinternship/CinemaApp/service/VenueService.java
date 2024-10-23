package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Venue;

import java.util.List;
import java.util.Optional;

public interface VenueService {
    List<Venue> findAllVenues();
    Optional<Venue> findVenueById(Long id);
    Venue saveVenue(Venue venue);
    void deleteVenue(Long id);
}
