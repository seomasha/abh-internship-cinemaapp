package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FilterMovieRepository {
    Page<Movie> findMoviesByFilter(FilterMovie filter, Pageable pageable);
}
