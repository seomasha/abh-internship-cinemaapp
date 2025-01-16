package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.VenueDTO;
import com.abhinternship.CinemaApp.dto.VenueUpdateDTO;
import com.abhinternship.CinemaApp.model.Photo;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.FilterVenueRepositoryImpl;
import com.abhinternship.CinemaApp.repository.PhotoRepository;
import com.abhinternship.CinemaApp.repository.VenueRepository;
import com.abhinternship.CinemaApp.utils.FilterVenue;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VenueServiceImpl implements VenueService {
    private final VenueRepository venueRepository;
    private final PhotoRepository photoRepository;
    private final FilterVenueRepositoryImpl filterVenueRepository;

    @Override
    public VenueDTO findAllVenues(final FilterVenue filterVenue, final int page, final int size) {
        final Pageable pageable = size == 0 ? Pageable.unpaged() : PageRequest.of(page, size);

        final Page<Venue> venuePage = filterVenue.isEmpty()
                ? venueRepository.findAll(pageable)
                : filterVenueRepository.findVenuesByFilter(filterVenue, pageable);

        return new VenueDTO(venuePage.getContent(), venuePage.getTotalElements());
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
    public Venue updateVenue(final Long id, final VenueUpdateDTO venueUpdateDTO) {
        final Venue updatedVenue = venueUpdateDTO.getVenue();
        final long photoImageId = venueUpdateDTO.getPhotoImageId();

        return venueRepository.findById(id).map(existingVenue -> {
            if (updatedVenue.getName() != null) {
                existingVenue.setName(updatedVenue.getName());
            }

            if (updatedVenue.getPhoneNo() != null) {
                existingVenue.setPhoneNo(updatedVenue.getPhoneNo());
            }

            if (updatedVenue.getStreet() != null) {
                existingVenue.setStreet(updatedVenue.getStreet());
            }

            if (updatedVenue.getStreetNo() != 0) {
                existingVenue.setStreetNo(updatedVenue.getStreetNo());
            }

            if (updatedVenue.getCity() != null) {
                existingVenue.setCity(updatedVenue.getCity());
            }

            if (photoImageId != 0) {
                final Photo photo = photoRepository.findById(photoImageId)
                        .orElseThrow(() -> new IllegalArgumentException("Photo not found with id: " + photoImageId));
                existingVenue.setPhotoImageId(photo);
            }

            return venueRepository.save(existingVenue);
        }).orElseThrow(() -> new IllegalArgumentException("Venue not found with id: " + id));
    }
}
