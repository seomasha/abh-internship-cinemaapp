package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;

@Repository
public interface ProjectionRepository extends JpaRepository<Projection, Long> {
    @Query("SELECT p FROM Projection p WHERE p.venueId = :venue " +
            "AND p.movieId.projectionStartDate > :endDate")
    Page<Projection> findUpcomingProjectionsByVenueAndMovieDates(
            Venue venue, LocalDate endDate, Pageable pageable);

    @Query("SELECT p FROM Projection p WHERE p.venueId = :venue " +
            "AND p.movieId.projectionStartDate < :endDate " +
            "AND p.movieId.projectionEndDate > :startDate")
    Page<Projection> findCurrentlyShowingProjectionsByVenueAndMovieDates(
            Venue venue, LocalDate startDate, LocalDate endDate, Pageable pageable);
}
