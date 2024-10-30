package com.abhinternship.CinemaApp.utils;
import lombok.Data;

import java.util.Map;

@Data
public class FilterMovie {
    private Long venueId;

    public FilterMovie() {}

    public FilterMovie(Map<String, String> filters) {
        this.venueId = filters.containsKey("venueId") ? Long.valueOf(filters.get("venueId")) : null;
    }
}

