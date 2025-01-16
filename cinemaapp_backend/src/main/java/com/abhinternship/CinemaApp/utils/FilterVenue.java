package com.abhinternship.CinemaApp.utils;

import lombok.Data;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
public class FilterVenue {
    private final String name;
    private final List<String> cities;

    public FilterVenue(final Map<String, String> filters) {
        this.name = filters.getOrDefault("name", null);
        this.cities = parseCommaSeparatedList(filters, "cities");
    }

    public boolean isEmpty() {
        return name == null &&
                cities.isEmpty();
    }

    public static FilterVenue empty() {
        return new FilterVenue(Map.of());
    }

    public String toQueryString(final Map<String, Object> parameters) {
        final List<String> predicates = new ArrayList<>();

        if (name != null && !name.isBlank()) {
            predicates.add("LOWER(v.name) LIKE :name");
            parameters.put("name", "%" + name.toLowerCase() + "%");
        }

        if (!cities.isEmpty()) {
            predicates.add("LOWER(v.city) IN :cities");
            parameters.put("cities", cities.stream().map(String::toLowerCase).collect(Collectors.toList()));
        }

        return String.join(" AND ", predicates);
    }

    private static List<String> parseCommaSeparatedList(final Map<String, String> filters, final String key) {
        return filters.containsKey(key)
                ? Arrays.stream(filters.get(key).split(","))
                .map(String::trim)
                .collect(Collectors.toList())
                : new ArrayList<>();
    }
}
