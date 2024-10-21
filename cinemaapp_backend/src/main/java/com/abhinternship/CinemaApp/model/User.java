package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "phone_no", length = 25)
    private String phoneNo;

    private String city;

    private String country;

    @OneToOne
    @JoinColumn(name = "profile_photo_id", referencedColumnName = "id")
    private Photo profilePhotoId;

    private String status;

    private String role;
}
