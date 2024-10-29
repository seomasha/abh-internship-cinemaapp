package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Query("SELECT m FROM Movie m WHERE m.projectionStartDate <= :endDate AND m.projectionEndDate >= :startDate")
    Page<Movie> findMoviesByProjectionDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, Pageable pageable);

    @Query("SELECT m FROM Movie m WHERE m.projectionStartDate >= :endDate")
    Page<Movie> findUpcomingMovies(@Param("endDate") LocalDate endDate, Pageable pageable);
}
