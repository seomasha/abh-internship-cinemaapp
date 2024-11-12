package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.VenueDTO;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.VenueRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class VenueServiceTest {

    @Mock
    private VenueRepository venueRepository;

    @InjectMocks
    private VenueServiceImpl venueService;

    private Venue venue1;
    private Venue venue2;

    private static final long VENUE_1_ID = 1L;
    private static final long VENUE_2_ID = 2L;
    private static final String VENUE_1_NAME = "Venue 1";
    private static final String VENUE_2_NAME = "Venue 2";
    private static final int PAGE_SIZE = 2;
    private static final int PAGE_NUMBER = 0;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        venue1 = new Venue();
        venue1.setId(VENUE_1_ID);
        venue1.setName(VENUE_1_NAME);

        venue2 = new Venue();
        venue2.setId(VENUE_2_ID);
        venue2.setName(VENUE_2_NAME);
    }

    @Test
    void testFindAllVenues_withZeroSize() {
        final List<Venue> venuesList = Arrays.asList(venue1, venue2);
        when(venueRepository.findAll()).thenReturn(venuesList);

        final VenueDTO result = venueService.findAllVenues(0, 0);

        assertNotNull(result);
        assertEquals(2, result.getTotalSize());
        assertEquals(venuesList, result.getVenues());
        verify(venueRepository, times(1)).findAll();
    }

    @Test
    void testFindAllVenues_withPagination() {
        final List<Venue> venuesList = Arrays.asList(venue1, venue2);
        final Page<Venue> venuePage = new PageImpl<>(venuesList, PageRequest.of(PAGE_NUMBER, PAGE_SIZE), venuesList.size());
        when(venueRepository.findAll(PageRequest.of(PAGE_NUMBER, PAGE_SIZE))).thenReturn(venuePage);

        final VenueDTO result = venueService.findAllVenues(PAGE_NUMBER, PAGE_SIZE);

        assertNotNull(result);
        assertEquals(2, result.getTotalSize());
        assertEquals(venuesList, result.getVenues());
        verify(venueRepository, times(1)).findAll(PageRequest.of(PAGE_NUMBER, PAGE_SIZE));
    }
}
