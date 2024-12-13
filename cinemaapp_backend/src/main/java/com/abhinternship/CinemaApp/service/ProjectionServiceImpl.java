package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.ProjectionDTO;
import com.abhinternship.CinemaApp.model.Hall;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.HallRepository;
import com.abhinternship.CinemaApp.repository.MovieRepository;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import com.abhinternship.CinemaApp.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProjectionServiceImpl implements ProjectionService {

    private final ProjectionRepository projectionRepository;
    private final VenueRepository venueRepository;
    private final MovieRepository movieRepository;
    private final HallRepository hallRepository;

    @Override
    public List<Projection> findAllProjections() {
        return projectionRepository.findAll();
    }

    @Override
    public Optional<Projection> findProjectionById(final Long id) {
        return projectionRepository.findById(id);
    }

    @Override
    public void saveProjection(final List<ProjectionDTO> projections) {
        for (ProjectionDTO projection : projections) {
            final Venue venue = venueRepository.findByName(projection.getVenue());

            final Movie movie = movieRepository.findById(projection.getMovieId())
                    .orElseThrow(() -> new RuntimeException("Movie with ID " + projection.getMovieId() + " not found"));

            final Hall hall = hallRepository.findById(projection.getHallId())
                    .orElseThrow(() -> new RuntimeException("Hall with ID " + projection.getHallId() + " not found"));


            final Projection savedProjection = new Projection();
            savedProjection.setMovieId(movie);
            savedProjection.setVenueId(venue);
            savedProjection.setHallId(hall);
            savedProjection.setProjectionTime(projection.getProjectionTime());

            projectionRepository.save(savedProjection);
        }
    }

    @Override
    public void deleteProjection(final Long id) {
        projectionRepository.deleteById(id);
    }

    @Override
    public List<LocalTime> findAllDistinctProjectionTimes() {
        return projectionRepository.findAllDistinctProjectionTimes();
    }

    @Override
    public List<LocalTime> findProjectionTimesByMovieAndVenue(final String movieName,
                                                              final String city,
                                                              final String venueName) {
        return projectionRepository.findDistinctProjectionTimesByMovieAndVenue(
                movieName, city, venueName);
    }

    @Override
    public Optional<Projection> findProjectionByMovieIdAndVenueId(Long movieId, Long venueId) {
        return projectionRepository.findProjectionByMovieId_IdAndVenueId_Id(movieId, venueId);
    }
}
