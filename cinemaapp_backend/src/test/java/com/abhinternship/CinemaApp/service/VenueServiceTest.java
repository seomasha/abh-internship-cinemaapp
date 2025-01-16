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

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAllVenues_WhenSizeIsNotZero() {
        final int page = 1;
        final int size = 2;
        final List<Venue> paginatedVenues = List.of(new Venue(), new Venue());
        final Page<Venue> paginatedResult = new PageImpl<>(paginatedVenues);
        when(venueRepository.findAll(PageRequest.of(page, size))).thenReturn(paginatedResult);

        final VenueDTO result = venueService.findAllVenues(FilterVenue.empty(), page, size);

        verify(venueRepository, times(1)).findAll(PageRequest.of(page, size));
        assertEquals(paginatedResult.getTotalElements(), result.getTotalSize());
        assertEquals(paginatedVenues, result.getVenues());
    }

    @Test
    void testFindAllVenues_WithNameFilter() {
        final int page = 0;
        final int size = 2;
        final String nameFilter = "VenueName";
        final FilterVenue filter = new FilterVenue(Map.of("name", nameFilter));

        final List<Venue> filteredVenues = List.of(new Venue(), new Venue());
        final Page<Venue> paginatedResult = new PageImpl<>(filteredVenues);
        when(filterVenueRepository.findVenuesByFilter(filter, PageRequest.of(page, size))).thenReturn(paginatedResult);

        final VenueDTO result = venueService.findAllVenues(filter, page, size);

        verify(filterVenueRepository, times(1)).findVenuesByFilter(filter, PageRequest.of(page, size));
        assertEquals(paginatedResult.getTotalElements(), result.getTotalSize());
        assertEquals(filteredVenues, result.getVenues());
    }

    @Test
    void testFindAllVenues_WithCitiesFilter() {
        final int page = 0;
        final int size = 2;
        final String citiesFilter = "City1,City2";
        final FilterVenue filter = new FilterVenue(Map.of("cities", citiesFilter));

        final List<Venue> filteredVenues = List.of(new Venue(), new Venue());
        final Page<Venue> paginatedResult = new PageImpl<>(filteredVenues);
        when(filterVenueRepository.findVenuesByFilter(filter, PageRequest.of(page, size))).thenReturn(paginatedResult);

        final VenueDTO result = venueService.findAllVenues(filter, page, size);

        verify(filterVenueRepository, times(1)).findVenuesByFilter(filter, PageRequest.of(page, size));
        assertEquals(paginatedResult.getTotalElements(), result.getTotalSize());
        assertEquals(filteredVenues, result.getVenues());
    }

    @Test
    void testFindAllVenues_WithNameAndCitiesFilter() {
        final int page = 0;
        final int size = 2;
        final String nameFilter = "VenueName";
        final String citiesFilter = "City1,City2";
        final FilterVenue filter = new FilterVenue(Map.of("name", nameFilter, "cities", citiesFilter));

        final List<Venue> filteredVenues = List.of(new Venue(), new Venue());
        final Page<Venue> paginatedResult = new PageImpl<>(filteredVenues);
        when(filterVenueRepository.findVenuesByFilter(filter, PageRequest.of(page, size))).thenReturn(paginatedResult);

        final VenueDTO result = venueService.findAllVenues(filter, page, size);

        verify(filterVenueRepository, times(1)).findVenuesByFilter(filter, PageRequest.of(page, size));
        assertEquals(paginatedResult.getTotalElements(), result.getTotalSize());
        assertEquals(filteredVenues, result.getVenues());
    }
}
