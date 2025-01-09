package com.abhinternship.CinemaApp.dto;


import com.abhinternship.CinemaApp.model.Venue;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;


@Data
@AllArgsConstructor
public class VenueUpdateDTO {
    private final Venue venue;
    private final long photoImageId;
}
