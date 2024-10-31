package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ProjectionService {
    List<Projection> findAllProjections();
    Optional<Projection> findProjectionById(Long id);
    Projection saveProjection(Projection projection);
    void deleteProjection(Long id);
}
