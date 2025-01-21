package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.VenueDTO;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.FilterVenueRepositoryImpl;
import com.abhinternship.CinemaApp.repository.VenueRepository;
import com.abhinternship.CinemaApp.utils.FilterVenue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class VenueServiceTest {

    @Mock
    private VenueRepository venueRepository;

    @Mock
    private FilterVenueRepositoryImpl filterVenueRepository;

    @InjectMocks
    private VenueServiceImpl venueService;

    private Pageable pageable;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        pageable = PageRequest.of(0, 2);
    }

    @Test
    void testFindAllVenues_WhenSizeIsNotZero() {
        final List<Venue> paginatedVenues = List.of(new Venue(), new Venue());
        final Page<Venue> paginatedResult = new PageImpl<>(paginatedVenues);

        when(venueRepository.findAll(pageable)).thenReturn(paginatedResult);

        final VenueDTO result = venueService.findAllVenues(FilterVenue.empty(), 0, 2);

        verify(venueRepository, times(1)).findAll(pageable);
        assertEquals(paginatedResult.getTotalElements(), result.getTotalSize());
        assertEquals(paginatedVenues, result.getVenues());
    }

    @Test
    void testFindAllVenues_WithNameFilter() {
        final String nameFilter = "VenueName";
        final FilterVenue filter = new FilterVenue(Map.of("name", nameFilter));

        final List<Venue> filteredVenues = List.of(new Venue(), new Venue());
        final Page<Venue> paginatedResult = new PageImpl<>(filteredVenues);

        when(filterVenueRepository.findVenuesByFilter(filter, pageable)).thenReturn(paginatedResult);

        final VenueDTO result = venueService.findAllVenues(filter, 0, 2);

        verify(filterVenueRepository, times(1)).findVenuesByFilter(filter, pageable);
        assertEquals(paginatedResult.getTotalElements(), result.getTotalSize());
        assertEquals(filteredVenues, result.getVenues());
    }

    @Test
    void testFindAllVenues_WithCitiesFilter() {
        final String citiesFilter = "City1,City2";
        final FilterVenue filter = new FilterVenue(Map.of("cities", citiesFilter));

        final List<Venue> filteredVenues = List.of(new Venue(), new Venue());
        final Page<Venue> paginatedResult = new PageImpl<>(filteredVenues);

        when(filterVenueRepository.findVenuesByFilter(filter, pageable)).thenReturn(paginatedResult);

        final VenueDTO result = venueService.findAllVenues(filter, 0, 2);

        verify(filterVenueRepository, times(1)).findVenuesByFilter(filter, pageable);
        assertEquals(paginatedResult.getTotalElements(), result.getTotalSize());
        assertEquals(filteredVenues, result.getVenues());
    }

    @Test
    void testFindAllVenues_WithNameAndCitiesFilter() {
        final String nameFilter = "VenueName";
        final String citiesFilter = "City1,City2";
        final FilterVenue filter = new FilterVenue(Map.of("name", nameFilter, "cities", citiesFilter));

        final List<Venue> filteredVenues = List.of(new Venue(), new Venue());
        final Page<Venue> paginatedResult = new PageImpl<>(filteredVenues);

        when(filterVenueRepository.findVenuesByFilter(filter, pageable)).thenReturn(paginatedResult);

        final VenueDTO result = venueService.findAllVenues(filter, 0, 2);

        verify(filterVenueRepository, times(1)).findVenuesByFilter(filter, pageable);
        assertEquals(paginatedResult.getTotalElements(), result.getTotalSize());
        assertEquals(filteredVenues, result.getVenues());
    }
}
