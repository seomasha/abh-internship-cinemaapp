package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Page<Movie> findByProjectionStartDateBeforeAndProjectionEndDateAfterAndStatus(LocalDate endDate, LocalDate startDate, Pageable pageable, String status);
    Page<Movie> findByProjectionStartDateGreaterThanEqualAndStatus(LocalDate endDate, Pageable pageable, String status);
    @Query("SELECT m FROM Movie m WHERE m.status LIKE 'draft%'")
    List<Movie> findAllByStatus();
}
