package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import com.abhinternship.CinemaApp.utils.FilterVenue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FilterVenueRepository {
    Page<Venue> findVenuesByFilter(FilterVenue filter, Pageable pageable);
}
