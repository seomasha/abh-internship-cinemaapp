package com.abhinternship.CinemaApp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNo;
    private String city;
    private String country;
    private Long profilePhotoId;
}
