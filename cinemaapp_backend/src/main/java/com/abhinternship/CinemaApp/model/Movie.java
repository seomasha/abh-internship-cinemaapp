package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "movie_genre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres;

    @OneToMany(mappedBy = "entityId", cascade = CascadeType.ALL)
    private List<Photo> photos;
}
