package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "movie")
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "pg_rating")
    private String pgRating;

    @Column(name = "language")
    private String language;

    @Column(name = "movie_duration")
    private int movieDuration;

    private String director;

    @Column(name = "trailer_link")
    private String trailerLink;

    private String synopsis;

    private String writers;

    private String actors;

    private String status;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "movie_genre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres;
}