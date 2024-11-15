package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.VenueDTO;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.VenueRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class VenueServiceTest {

    @Mock
    private VenueRepository venueRepository;

    @InjectMocks
    private VenueServiceImpl venueService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAllVenues_WhenSizeIsZero() {
        final List<Venue> allVenues = List.of(new Venue(), new Venue());
        when(venueRepository.findAll()).thenReturn(allVenues);

        final VenueDTO result = venueService.findAllVenues(0, 0);

        verify(venueRepository, times(1)).findAll();
        assertEquals(allVenues.size(), result.getTotalSize());
        assertEquals(allVenues, result.getVenues());
    }

    @Test
    void testFindAllVenues_WhenSizeIsNotZero() {
        final int page = 1;
        final int size = 2;
        final List<Venue> paginatedVenues = List.of(new Venue(), new Venue());
        final Page<Venue> paginatedResult = new PageImpl<>(paginatedVenues);
        when(venueRepository.findAll(PageRequest.of(page, size))).thenReturn(paginatedResult);

        final VenueDTO result = venueService.findAllVenues(page, size);

        verify(venueRepository, times(1)).findAll(PageRequest.of(page, size));
        assertEquals(paginatedResult.getTotalElements(), result.getTotalSize());
        assertEquals(paginatedVenues, result.getVenues());
    }
}
