package com.abhinternship.CinemaApp.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class ProjectionDTO {
    private Long movieId;
    private String venue;
    private Long hallId;
    private LocalTime projectionTime;

}
