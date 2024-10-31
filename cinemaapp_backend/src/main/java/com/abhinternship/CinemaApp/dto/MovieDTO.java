package com.abhinternship.CinemaApp.dto;

import com.abhinternship.CinemaApp.model.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@AllArgsConstructor
public class MovieDTO {
    private final List<Movie> movies;
    private final long totalSize;

    public MovieDTO(Page<Movie> moviePage) {
        this.movies = moviePage.getContent();
        this.totalSize = moviePage.getTotalElements();
    }
}
