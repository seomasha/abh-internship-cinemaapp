package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProjectionServiceTest {

    @Mock
    private ProjectionRepository projectionRepository;

    @InjectMocks
    private ProjectionServiceImpl projectionService;

    private static final LocalTime MORNING_SHOW = LocalTime.of(10, 0);
    private static final LocalTime AFTERNOON_SHOW = LocalTime.of(12, 30);
    private static final LocalTime EVENING_SHOW = LocalTime.of(15, 0);

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAllDistinctProjectionTimes() {
        final List<LocalTime> projectionTimesWithDuplicates = Arrays.asList(
                MORNING_SHOW,
                AFTERNOON_SHOW,
                EVENING_SHOW,
                MORNING_SHOW,
                EVENING_SHOW
        );

        when(projectionRepository.findAllDistinctProjectionTimes()).thenReturn(projectionTimesWithDuplicates);

        final List<LocalTime> actualProjectionTimes = projectionService.findAllDistinctProjectionTimes();

        final Set<LocalTime> actualProjectionTimesSet = new HashSet<>(actualProjectionTimes);

        final List<LocalTime> expectedProjectionTimes = Arrays.asList(
                MORNING_SHOW,
                AFTERNOON_SHOW,
                EVENING_SHOW
        );

        assertNotNull(actualProjectionTimes);
        assertEquals(expectedProjectionTimes.size(), actualProjectionTimesSet.size());
        assertTrue(actualProjectionTimesSet.containsAll(expectedProjectionTimes));

        verify(projectionRepository, times(1)).findAllDistinctProjectionTimes();
    }
}
