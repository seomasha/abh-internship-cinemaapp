package com.abhinternship.CinemaApp.utils;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
public class FilterMovie {
    private final Long venueId;
    private final LocalDate projectionStartDate;
    private final LocalDate projectionEndDate;
    private final LocalDate selectedDate;
    private final String name;
    private final List<String> projectionTimes;
    private final List<String> genres;
    private final List<String> cities;
    private final List<String> venues;

    public FilterMovie(final Map<String, String> filters) {
        this.venueId = filters.containsKey("venueId") ? Long.valueOf(filters.get("venueId")) : null;
        this.projectionStartDate = LocalDate.now();
        this.projectionEndDate = LocalDate.now().plusDays(10);
        this.selectedDate = filters.containsKey("selectedDate")
                ? LocalDate.parse(filters.get("selectedDate"))
                : null;
        this.name = filters.getOrDefault("name", null);
        this.cities = filters.containsKey("cities")
                ? Arrays.stream(filters.get("cities").split(",")).map(String::trim).collect(Collectors.toList())
                : new ArrayList<>();
        this.venues = filters.containsKey("venues")
                ? Arrays.stream(filters.get("venues").split(",")).map(String::trim).collect(Collectors.toList())
                : new ArrayList<>();
        this.genres = filters.containsKey("genres")
                ? Arrays.asList(filters.get("genres").split(","))
                : new ArrayList<>();

        if (filters.containsKey("projectionTimes")) {
            this.projectionTimes = Arrays.stream(filters.get("projectionTimes").split(","))
                    .map(String::trim)
                    .collect(Collectors.toList());
        } else {
            this.projectionTimes = new ArrayList<>();
        }
    }

    public boolean isEmpty() {
        return venueId == null &&
                name == null &&
                projectionTimes.isEmpty() &&
                genres.isEmpty() &&
                venues.isEmpty() &&
                cities.isEmpty();
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

        if (!cities.isEmpty()) {
            predicates.add("LOWER(p.venueId.city) IN :cities");
            parameters.put("cities", cities.stream().map(String::toLowerCase).collect(Collectors.toList()));
        }

        if (!venues.isEmpty()) {
            predicates.add("LOWER(p.venueId.name) IN :venues");
            parameters.put("venues", venues.stream().map(String::toLowerCase).collect(Collectors.toList()));
        }

        if (selectedDate != null) {
            predicates.add(":selectedDate BETWEEN m.projectionStartDate AND m.projectionEndDate");
            parameters.put("selectedDate", selectedDate);
        }

        if (!projectionTimes.isEmpty()) {
            List<String> timeConditions = projectionTimes.stream()
                    .map(time -> "FUNCTION('TO_CHAR', p.projectionTime, 'HH24:MI') = :time" + time.replace(":", ""))
                    .collect(Collectors.toList());

            predicates.add("(" + String.join(" OR ", timeConditions) + ")");

            projectionTimes.forEach(time -> {
                parameters.put("time" + time.replace(":", ""), time);
            });
        }

        if (!genres.isEmpty()) {
            List<String> genreConditions = genres.stream()
                    .map(genre -> "LOWER(g.name) = :genre" + genre.replace(" ", ""))
                    .collect(Collectors.toList());
            predicates.add("(" + String.join(" OR ", genreConditions) + ")");

            genres.forEach(genre -> {
                parameters.put("genre" + genre.replace(" ", ""), genre.toLowerCase());
            });
        }

        return String.join(" AND ", predicates);
    }
}

