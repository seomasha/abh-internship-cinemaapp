package com.abhinternship.CinemaApp.utils;
import lombok.Data;

import java.util.Map;

@Data
public class FilterMovie {
    private final Long venueId;

    public FilterMovie(final Map<String, String> filters) {
        this.venueId = filters.containsKey("venueId") ? Long.valueOf(filters.get("venueId")) : null;
    }

    public boolean isEmpty() {
        return venueId == null;
    }
}

