package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Projection;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface ProjectionService {
    List<Projection> findAllProjections();
    Optional<Projection> findProjectionById(Long id);
    Projection saveProjection(Projection projection);
    void deleteProjection(Long id);
    List<LocalTime> findAllDistinctProjectionTimes();
    List<LocalTime> findProjectionTimesByMovieAndVenue(
            String movieName, String city, String venueName);
    Optional<Projection> findProjectionByMovieIdAndVenueId(Long movieId, Long venueId);
}
