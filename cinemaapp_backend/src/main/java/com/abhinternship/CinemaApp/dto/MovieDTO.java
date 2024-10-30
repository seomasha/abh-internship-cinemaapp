package com.abhinternship.CinemaApp.dto;

import com.abhinternship.CinemaApp.model.Movie;
import lombok.Data;

import java.util.List;

@Data
public class MoviePageResponse { // Rename to MovieDTO
    private final List<Movie> movies;
    private final long totalSize;

    public MoviePageResponse(final List<Movie> movies, final long totalSize) {
        this.movies = movies;
        this.totalSize = totalSize;
    }
}
