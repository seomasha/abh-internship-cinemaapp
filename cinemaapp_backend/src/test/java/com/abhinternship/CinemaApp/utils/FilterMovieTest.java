package com.abhinternship.CinemaApp.utils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class FilterMovieTest {

    private Map<String, String> filters;
    private Map<String, Object> parameters;

    @BeforeEach
    void setUp() {
        filters = new HashMap<>();
        parameters = new HashMap<>();
    }

    @Test
    void testToQueryStringWithVenueId() {
        filters.put("venueId", "1");
        FilterMovie filterMovie = new FilterMovie(filters);

        String queryString = filterMovie.toQueryString(parameters, true);

        assertEquals("p.venueId.id = :venueId AND m.projectionStartDate < :endDate AND m.projectionEndDate >= :startDate", queryString);
        assertEquals(1L, parameters.get("venueId"));
        assertTrue(parameters.containsKey("startDate"));
        assertTrue(parameters.containsKey("endDate"));
    }

    @Test
    void testToQueryStringWithUpcomingDates() {
        filters.put("upcomingStartDate", LocalDate.now().toString());
        filters.put("upcomingEndDate", LocalDate.now().plusDays(10).toString());
        FilterMovie filterMovie = new FilterMovie(filters);

        String queryString = filterMovie.toQueryString(parameters, false);

        assertTrue(queryString.contains("m.projectionStartDate BETWEEN :upcomingStartDate AND :upcomingEndDate"));
        assertEquals(LocalDate.now(), parameters.get("upcomingStartDate"));
        assertEquals(LocalDate.now().plusDays(10), parameters.get("upcomingEndDate"));
        assertTrue(parameters.containsKey("endDate"));
    }

    @Test
    void testToQueryStringWithNameFilter() {
        filters.put("name", "Inception");
        FilterMovie filterMovie = new FilterMovie(filters);

        String queryString = filterMovie.toQueryString(parameters, false);

        assertTrue(queryString.contains("LOWER(m.name) LIKE :name"));
        assertEquals("%inception%", parameters.get("name"));
    }

    @Test
    void testToQueryStringWithCitiesAndVenues() {
        filters.put("cities", "New York,Los Angeles");
        filters.put("venues", "AMC,Regal");
        FilterMovie filterMovie = new FilterMovie(filters);

        String queryString = filterMovie.toQueryString(parameters, true);

        assertTrue(queryString.contains("LOWER(p.venueId.city) IN :cities"));
        assertTrue(queryString.contains("LOWER(p.venueId.name) IN :venues"));
        assertEquals(List.of("new york", "los angeles"), parameters.get("cities"));
        assertEquals(List.of("amc", "regal"), parameters.get("venues"));
    }

    @Test
    void testToQueryStringWithSelectedDate() {
        filters.put("selectedDate", LocalDate.now().toString());
        FilterMovie filterMovie = new FilterMovie(filters);

        String queryString = filterMovie.toQueryString(parameters, false);

        assertTrue(queryString.contains(":selectedDate BETWEEN m.projectionStartDate AND m.projectionEndDate"));
        assertEquals(LocalDate.now(), parameters.get("selectedDate"));
    }

    @Test
    void testToQueryStringWithProjectionTimes() {
        filters.put("projectionTimes", "10:00,14:00");
        FilterMovie filterMovie = new FilterMovie(filters);

        String queryString = filterMovie.toQueryString(parameters, true);

        assertTrue(queryString.contains("FUNCTION('TO_CHAR', p.projectionTime, 'HH24:MI') = :time1000 OR FUNCTION('TO_CHAR', p.projectionTime, 'HH24:MI') = :time1400"));
        assertEquals("10:00", parameters.get("time1000"));
        assertEquals("14:00", parameters.get("time1400"));
    }

    @Test
    void testToQueryStringWithGenres() {
        filters.put("genres", "Action,Drama");
        FilterMovie filterMovie = new FilterMovie(filters);

        String queryString = filterMovie.toQueryString(parameters, true);

        assertTrue(queryString.contains("LOWER(g.name) = :genreAction OR LOWER(g.name) = :genreDrama"));
        assertEquals("action", parameters.get("genreAction"));
        assertEquals("drama", parameters.get("genreDrama"));
    }

    @Test
    void testToQueryStringEmptyFilters_CurrentlyShowing() {
        FilterMovie filterMovie = FilterMovie.empty();
        String queryString = filterMovie.toQueryString(parameters, true);

        assertTrue(queryString.contains("m.projectionStartDate < :endDate AND m.projectionEndDate >= :startDate"));
        assertTrue(parameters.containsKey("startDate"));
        assertTrue(parameters.containsKey("endDate"));
    }

    @Test
    void testToQueryStringEmptyFilters_Upcoming() {
        FilterMovie filterMovie = FilterMovie.empty();
        String queryString = filterMovie.toQueryString(parameters, false);

        assertTrue(queryString.contains("m.projectionStartDate >= :endDate"));
        assertTrue(parameters.containsKey("endDate"));
    }
}
