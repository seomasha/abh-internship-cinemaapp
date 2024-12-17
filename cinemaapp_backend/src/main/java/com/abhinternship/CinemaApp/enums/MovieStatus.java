package com.abhinternship.CinemaApp.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MovieStatus {
    DRAFT1("draft1"),
    DRAFT2("draft2"),
    DRAFT3("draft3"),
    PUBLISHED("published"),
    ARCHIVED("archived"),
    PUBLISHED_UPCOMING("published_upcoming");

    private final String status;

    public static MovieStatus fromString(final String status) {
        for (MovieStatus movieStatus : MovieStatus.values()) {
            if (movieStatus.getStatus().equalsIgnoreCase(status)) {
                return movieStatus;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + status);
    }
}
