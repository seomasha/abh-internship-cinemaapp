package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hall")
@Data
public class Hall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number")
    private int number;

    @ManyToOne
    @JoinColumn(name = "venue_id", referencedColumnName = "id")
    private Venue venueId;

    @ManyToOne
    @JoinColumn(name = "projection_id", referencedColumnName = "id")
    private Projection projectionId;
}
