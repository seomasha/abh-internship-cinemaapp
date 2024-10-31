package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.VenueDTO;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VenueServiceImpl implements VenueService{
    private final VenueRepository venueRepository;

    @Override
    public VenueDTO findAllVenues(final int page, final int size) {
        if(size == 0) {
            List<Venue> allVenues = venueRepository.findAll();
            return new VenueDTO(allVenues, allVenues.size());
        } else {
            final Page<Venue> venues = venueRepository.findAll(PageRequest.of(page, size));
            final long totalSize = venues.getTotalElements();

            return new VenueDTO(venues.getContent(), totalSize);
        }
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
