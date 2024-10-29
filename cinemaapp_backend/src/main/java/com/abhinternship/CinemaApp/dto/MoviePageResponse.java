package com.abhinternship.CinemaApp.dto;

import com.abhinternship.CinemaApp.model.Movie;

import java.util.List;

public class MoviePageResponse {
    private List<Movie> movies;
    private long totalSize;

    public MoviePageResponse(List<Movie> movies, long totalSize) {
        this.movies = movies;
        this.totalSize = totalSize;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    public long getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(long totalSize) {
        this.totalSize = totalSize;
    }
}
