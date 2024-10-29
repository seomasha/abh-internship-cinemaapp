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
}
