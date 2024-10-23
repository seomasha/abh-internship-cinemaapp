package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectionServiceImpl implements ProjectionService{

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
    public List<Projection> findAllByVenueId(Venue venueId) {
        return projectionRepository.findAllByVenueId(venueId);
    }
}
