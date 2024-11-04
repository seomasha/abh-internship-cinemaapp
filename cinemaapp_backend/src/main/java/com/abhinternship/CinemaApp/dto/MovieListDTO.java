package com.abhinternship.CinemaApp.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class MovieListDTO {
    private final List<MovieWithProjectionsDTO> movies;
    private final long totalSize;

    public static MovieListDTO fromMoviesWithProjections(final List<MovieWithProjectionsDTO> movies, final long totalSize) {
        return new MovieListDTO(movies, totalSize);
    }
}
