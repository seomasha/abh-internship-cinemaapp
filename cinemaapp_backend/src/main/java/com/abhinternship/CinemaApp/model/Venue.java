package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "venue")
@Data
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "phone_no")
    private String phoneNo;

    private String street;

    @Column(name = "street_no")
    private int streetNo;

    private String city;

    @OneToOne
    @JoinColumn(name = "photo_image_id", referencedColumnName = "id")
    private Photo photoImageId;
}
