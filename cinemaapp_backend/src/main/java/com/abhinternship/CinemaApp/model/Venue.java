package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phoneNo;

    private String street;

    private int streetNo;

    private String city;

    @OneToOne
    @JoinColumn(name = "photo_image_id", referencedColumnName = "id")
    private Photo photoImageId;
}
