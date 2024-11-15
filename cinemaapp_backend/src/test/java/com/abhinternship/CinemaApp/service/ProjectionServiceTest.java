package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class ProjectionServiceTest {

    @Mock
    private ProjectionRepository projectionRepository;

    @InjectMocks
    private ProjectionServiceImpl projectionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAllDistinctProjectionTimes() {
        final List<LocalTime> distinctTimes = Arrays.asList(
                LocalTime.of(10, 0),
                LocalTime.of(14, 0),
                LocalTime.of(18, 0)
        );
        when(projectionRepository.findAllDistinctProjectionTimes()).thenReturn(distinctTimes);

        final List<LocalTime> result = projectionService.findAllDistinctProjectionTimes();

        assertEquals(distinctTimes.size(), result.size());
        assertEquals(distinctTimes, result);
    }

    @Test
    void testFindAllDistinctProjectionTimesWithEmptyList() {
        when(projectionRepository.findAllDistinctProjectionTimes()).thenReturn(List.of());

        final List<LocalTime> result = projectionService.findAllDistinctProjectionTimes();

        assertEquals(0, result.size());
    }
}
