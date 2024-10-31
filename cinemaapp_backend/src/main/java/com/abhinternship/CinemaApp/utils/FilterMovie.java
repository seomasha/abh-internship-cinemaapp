package com.abhinternship.CinemaApp.utils;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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

    public static FilterMovie empty() {
        return new FilterMovie(Map.of());
    }

    public String toQueryString() {
        final List<String> predicates = new ArrayList<>();

        if (venueId != null) {
            predicates.add("p.venueId.id = " + getVenueId());
        }

        return String.join(" AND ", predicates);
    }
}

