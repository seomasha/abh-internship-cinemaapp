package com.abhinternship.CinemaApp.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ConflictException extends ResponseStatusException {
    public ConflictException(final String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
