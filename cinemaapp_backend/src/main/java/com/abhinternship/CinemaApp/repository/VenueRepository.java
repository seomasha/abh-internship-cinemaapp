package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
    @Query("SELECT DISTINCT v.city FROM Venue v ")
    List<String> findAllCities();
}
