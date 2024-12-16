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
    @Query("SELECT DISTINCT v.city FROM Venue v " +
            "JOIN Projection p ON p.venueId.id = v.id " +
            "JOIN Movie m ON m.id = p.movieId.id " +
            "WHERE m.name LIKE %?1%")
    List<String> findCitiesByMovieName(String movieName);
    @Query("SELECT DISTINCT v.id, v.name FROM Venue v " +
            "JOIN Projection p ON p.venueId.id = v.id " +
            "JOIN Movie m ON m.id = p.movieId.id " +
            "WHERE m.name LIKE %?1% AND v.city LIKE %?2%")
    List<String> findVenuesByCityAndMovieName(String movieName, String cityName);
    List<Venue> findVenueByCity(String city);
    Venue findByName(String name);
    @Query("SELECT DISTINCT v.name FROM Venue v " +
            "JOIN Projection p ON p.venueId.id = v.id " +
            "JOIN Movie m ON m.id = p.movieId.id " +
            "WHERE m.name LIKE %?1%")
    List<String> findVenuesByMovieName(String movieName);
}
