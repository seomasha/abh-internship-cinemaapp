package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProjectionServiceImpl implements ProjectionService {

    private final ProjectionRepository projectionRepository;

    @Override
    public List<Projection> findAllProjections() {
        return projectionRepository.findAll();
    }

    @Override
    public Optional<Projection> findProjectionById(Long id) {
        return projectionRepository.findById(id);
    }

    @Override
    public Projection saveProjection(Projection projection) {
        return projectionRepository.save(projection);
    }

    @Override
    public void deleteProjection(Long id) {
        projectionRepository.deleteById(id);
    }

    @Override
    public Map<String, List<Movie>> getMoviesByVenue(Venue venue) {
        List<Projection> projections = projectionRepository.findAllByVenueId(venue);
        List<Movie> currentlyShowing = new ArrayList<>();
        List<Movie> upcoming = new ArrayList<>();

        LocalDate today = LocalDate.now();
        LocalDate endDate = today.plusDays(10);

        // Filter projections based on their start and end dates
        for (Projection projection : projections) {
            Movie movie = projection.getMovieId();

            // Parse the strings to LocalDate
            LocalDate projectionStartDate = movie.getProjectionStartDate();
            LocalDate projectionEndDate = movie.getProjectionEndDate();

            if (projectionStartDate.isBefore(endDate) && projectionEndDate.isAfter(today)) {
                currentlyShowing.add(movie);
            } else if (projectionStartDate.isAfter(endDate)) {
                upcoming.add(movie);
            }
        }

        Map<String, List<Movie>> response = new HashMap<>();
        response.put("currentlyShowing", currentlyShowing);
        response.put("upcoming", upcoming);

        return response;
    }

}
