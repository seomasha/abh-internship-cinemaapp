package com.abhinternship.CinemaApp.dto;


import com.abhinternship.CinemaApp.model.Venue;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;


@Data
@AllArgsConstructor
public class VenueDTO {
    private final List<Venue> venues;
    private final long totalSize;
}
