package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VenueServiceImpl implements VenueService{
    private final VenueRepository venueRepository;

    @Override
    public List<Venue> findAllVenues() {
        return venueRepository.findAll();
    }

    @Override
    public Optional<Venue> findVenueById(final Long id) {
        return venueRepository.findById(id);
    }

    @Override
    public Venue saveVenue(final Venue venue) {
        return venueRepository.save(venue);
    }

    @Override
    public void deleteVenue(final Long id) {
        venueRepository.deleteById(id);
    }
}
