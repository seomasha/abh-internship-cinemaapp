package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.VenueDTO;
import com.abhinternship.CinemaApp.model.Photo;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.PhotoRepository;
import com.abhinternship.CinemaApp.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VenueServiceImpl implements VenueService {
    private final VenueRepository venueRepository;
    private final PhotoRepository photoRepository;

    @Override
    public VenueDTO findAllVenues(final int page, final int size) {
        if (size == 0) {
            final List<Venue> allVenues = venueRepository.findAll();
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

    @Override
    public List<String> findAllCities() {
        return venueRepository.findAllCities();
    }

    @Override
    public List<String> findCitiesByMovieName(final String movieName) {
        return venueRepository.findCitiesByMovieName(movieName);
    }

    @Override
    public List<String> findVenuesByCityAndMovieName(final String movieName, final String cityName) {
        return venueRepository.findVenuesByCityAndMovieName(movieName, cityName);
    }

    @Override
    public List<Venue> findVenuesByCity(final String city) {
        return venueRepository.findVenueByCity(city);
    }

    @Override
    public Venue findVenueByName(final String name) {
        return venueRepository.findByName(name);
    }

    @Override
    public List<String> findVenueByMovieName(final String name) {
        return venueRepository.findVenuesByMovieName(name);
    }

    @Override
    public Venue updateVenueImage(final Long id, final Long photoId) {
        return venueRepository.findById(id).map(existingVenue -> {
            final Photo photo = photoRepository.findById(photoId)
                    .orElseThrow(() -> new IllegalArgumentException("Photo not found with id: " + photoId));
            existingVenue.setPhotoImageId(photo);

            return venueRepository.save(existingVenue);
        }).orElseThrow(() -> new IllegalArgumentException("Venue not found with id: " + id));
    }
}
