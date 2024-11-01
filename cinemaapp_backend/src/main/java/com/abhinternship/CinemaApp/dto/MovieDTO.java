package com.abhinternship.CinemaApp.dto;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class MovieDTO {
    private final List<MovieWithProjectionsDTO> movies;
    private final long totalSize;

    public static MovieDTO fromMoviePage(Page<Movie> moviePage, ProjectionRepository projectionRepository) {
        List<MovieWithProjectionsDTO> moviesWithProjections = moviePage.getContent().stream()
                .map(movie -> {
                    Set<Projection> projections = projectionRepository.findByMovieIdIdOrderByProjectionTime(movie.getId());
                    return MovieWithProjectionsDTO.fromMovie(movie, projections);
                })
                .collect(Collectors.toList());

        return new MovieDTO(moviesWithProjections, moviePage.getTotalElements());
    }
}
