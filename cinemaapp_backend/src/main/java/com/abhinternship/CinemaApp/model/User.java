package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "app_user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String phoneNo;

    private String city;

    private String country;

    @OneToOne
    @JoinColumn(name = "profile_photo_id", referencedColumnName = "id")
    private Photo profilePhotoId;

    private String status;

    private String role;
}
