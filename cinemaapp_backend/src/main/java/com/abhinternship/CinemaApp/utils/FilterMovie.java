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
    private final String name;

    public FilterMovie(final Map<String, String> filters) {
        this.venueId = filters.containsKey("venueId") ? Long.valueOf(filters.get("venueId")) : null;
        this.projectionStartDate = LocalDate.now();
        this.projectionEndDate = LocalDate.now().plusDays(10);
        this.name = filters.getOrDefault("name", null);
    }

    public boolean isEmpty() {
        return venueId == null && name == null;
    }

    public static FilterMovie empty() {
        return new FilterMovie(Map.of());
    }

    public String toQueryString(final Map<String, Object> parameters, final boolean currentlyShowing) {
        final List<String> predicates = new ArrayList<>();

        if (venueId != null) {
            predicates.add("p.venueId.id = :venueId");
            parameters.put("venueId", venueId);
        }

        if (currentlyShowing) {
            predicates.add("m.projectionStartDate < :endDate AND m.projectionEndDate >= :startDate");
            parameters.put("startDate", projectionStartDate);
            parameters.put("endDate", projectionEndDate);
        } else {
            predicates.add("m.projectionStartDate >= :endDate");
            parameters.put("endDate", projectionEndDate);
        }

        if (name != null && !name.isBlank()) {
            predicates.add("LOWER(m.name) LIKE :name");
            parameters.put("name", "%" + name.toLowerCase() + "%");
        }

        return String.join(" AND ", predicates);
    }
}

