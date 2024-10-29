package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Venue;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

@Repository
public interface ProjectionRepository extends JpaRepository<Projection, Long> {
    Page<Projection> findAllByVenueId(Venue venueId, Pageable pageable);
}
