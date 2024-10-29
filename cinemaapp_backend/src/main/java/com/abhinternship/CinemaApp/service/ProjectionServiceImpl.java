package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public Map<String, List<Movie>> getMoviesByVenue(final Venue venue, final int page, final int size) {
        final Page<Projection> projectionPage = projectionRepository.findAllByVenueId(venue, PageRequest.of(page, size));
        final List<Projection> projections = projectionPage.getContent();
        final List<Movie> currentlyShowing = new ArrayList<>();
        final List<Movie> upcoming = new ArrayList<>();

        final LocalDate today = LocalDate.now();
        final LocalDate endDate = today.plusDays(10);

        for (Projection projection : projections) {
            final Movie movie = projection.getMovieId();

            final LocalDate projectionStartDate = movie.getProjectionStartDate();
            final LocalDate projectionEndDate = movie.getProjectionEndDate();

            if (projectionStartDate.isBefore(endDate) && projectionEndDate.isAfter(today)) {
                currentlyShowing.add(movie);
            } else if (projectionStartDate.isAfter(endDate)) {
                upcoming.add(movie);
            }
        }

        final Map<String, List<Movie>> response = new HashMap<>();
        response.put("currentlyShowing", currentlyShowing);
        response.put("upcoming", upcoming);

        return response;
    }

}
