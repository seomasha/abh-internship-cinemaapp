package com.abhinternship.CinemaApp.dto;

import com.abhinternship.CinemaApp.model.Movie;
import lombok.Data;

import java.util.List;

@Data
public class MoviePageResponse {
    private List<Movie> movies;
    private long totalSize;

    public MoviePageResponse(List<Movie> movies, long totalSize) {
        this.movies = movies;
        this.totalSize = totalSize;
    }
}
