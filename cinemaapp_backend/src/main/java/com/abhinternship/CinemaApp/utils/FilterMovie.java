package com.abhinternship.CinemaApp.utils;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class FilterMovie {
    private final Long venueId;
    private final LocalDate projectionStartDate;
    private final LocalDate projectionEndDate;

    public FilterMovie(final Map<String, String> filters) {
        this.venueId = filters.containsKey("venueId") ? Long.valueOf(filters.get("venueId")) : null;
        this.projectionStartDate = LocalDate.now();
        this.projectionEndDate = LocalDate.now().plusDays(10);
    }

    public boolean isEmpty() {
        return venueId == null;
    }

    public static FilterMovie empty() {
        return new FilterMovie(Map.of());
    }

    public String toQueryString(final List<Object> parameters, final boolean currentlyShowing) {
        final List<String> predicates = new ArrayList<>();

        if (venueId != null) {
            predicates.add("p.venueId.id = ?1");
            parameters.add(getVenueId());
        }

        if (currentlyShowing) {
            predicates.add("m.projectionStartDate <= ?2 AND m.projectionEndDate >= ?3");
            parameters.add(projectionEndDate);
            parameters.add(projectionStartDate);
        } else {
            predicates.add("m.projectionStartDate > ?2");
            parameters.add(projectionEndDate);
        }

        return String.join(" AND ", predicates);
    }
}

