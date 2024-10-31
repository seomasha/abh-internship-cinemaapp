package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Page<Movie> findByProjectionStartDateBeforeAndProjectionEndDateAfter(LocalDate endDate, LocalDate startDate, Pageable pageable);
    Page<Movie> findByProjectionStartDateGreaterThanEqual(LocalDate endDate, Pageable pageable);
}
