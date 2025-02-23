package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.VenueDTO;
import com.abhinternship.CinemaApp.dto.VenueUpdateDTO;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.utils.FilterVenue;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface VenueService {
    VenueDTO findAllVenues(FilterVenue filterVenue, int page, int size);
    Optional<Venue> findVenueById(Long id);
    Venue saveVenue(Venue venue);
    void deleteVenue(Long id);
    List<String> findAllCities();
    List<String> findCitiesByMovieName(String movieName);
    List<String> findVenuesByCityAndMovieName(String movieName, String cityName);
    List<Venue> findVenuesByCity(String city);
    Venue findVenueByName(String name);
    List<String> findVenueByMovieName(String name);
    Venue updateVenue(Long id, VenueUpdateDTO venueUpdateDTO);
}
