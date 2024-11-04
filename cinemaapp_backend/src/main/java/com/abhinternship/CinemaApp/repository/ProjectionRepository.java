package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Repository
public interface ProjectionRepository extends JpaRepository<Projection, Long> {
    @Query("SELECT DISTINCT p.projectionTime FROM Projection p ORDER BY p.projectionTime")
    List<LocalTime> findAllDistinctProjectionTimes();
    Set<Projection> findByMovieIdOrderByProjectionTime(Movie movieId);
}
