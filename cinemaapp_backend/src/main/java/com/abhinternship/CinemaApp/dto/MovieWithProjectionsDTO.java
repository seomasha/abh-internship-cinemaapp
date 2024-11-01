package com.abhinternship.CinemaApp.dto;

import com.abhinternship.CinemaApp.model.Genre;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Photo;
import com.abhinternship.CinemaApp.model.Projection;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class MovieWithProjectionsDTO {
    private Long id;
    private String name;
    private String pgRating;
    private String language;
    private int movieDuration;
    private String director;
    private String trailerLink;
    private String synopsis;
    private String writers;
    private String actors;
    private LocalDate projectionStartDate;
    private LocalDate projectionEndDate;
    private List<Photo> photos;
    private Set<Genre> genres;
    private Set<LocalTime> projectionTimes;

    public static MovieWithProjectionsDTO fromMovie(Movie movie, Set<Projection> projections) {
        return new MovieWithProjectionsDTO(
                movie.getId(),
                movie.getName(),
                movie.getPgRating(),
                movie.getLanguage(),
                movie.getMovieDuration(),
                movie.getDirector(),
                movie.getTrailerLink(),
                movie.getSynopsis(),
                movie.getWriters(),
                movie.getActors(),
                movie.getProjectionStartDate(),
                movie.getProjectionEndDate(),
                movie.getPhotos(),
                movie.getGenres(),
                projections.stream()
                        .map(Projection::getProjectionTime)
                        .sorted()
                        .collect(Collectors.toCollection(LinkedHashSet::new))
        );
    }
}
