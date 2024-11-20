package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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

    @NotBlank
    @Email(message = "Email should be valid.")
    private String email;

    @NotBlank
    @Size(min = 8, message = "Password must have at least 8 characters")
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
