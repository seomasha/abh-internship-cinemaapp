package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
