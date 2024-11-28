package com.abhinternship.CinemaApp.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFound(final ResourceNotFoundException ex, final WebRequest request) {
        return new ResponseEntity<>(buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleBadRequest(final IllegalArgumentException ex, final WebRequest request) {
        return new ResponseEntity<>(buildErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(final MethodArgumentNotValidException ex, final WebRequest request) {
        final Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                fieldErrors.put(error.getField(), error.getDefaultMessage())
        );

        final Map<String, Object> errorDetails = buildErrorResponse("Validation failed", HttpStatus.BAD_REQUEST);
        errorDetails.put("errors", fieldErrors);

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGlobalException(final Exception ex, final WebRequest request) {
        return new ResponseEntity<>(buildErrorResponse("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<Object> handleConflictException(final ConflictException ex, final WebRequest request) {
        return new ResponseEntity<>(buildErrorResponse(ex.getReason(), HttpStatus.CONFLICT), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Object> handleResponseStatusException(final ResponseStatusException ex, final WebRequest request) {
        return new ResponseEntity<>(buildErrorResponse(ex.getReason(), (HttpStatus) ex.getStatusCode()), ex.getStatusCode());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentials(final BadCredentialsException ex, final WebRequest request) {
        return new ResponseEntity<>(buildErrorResponse("Invalid email or password", HttpStatus.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
    }

    private Map<String, Object> buildErrorResponse(final String message, final HttpStatus status) {
        final Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("timestamp", LocalDateTime.now());
        errorDetails.put("status", status.value());
        errorDetails.put("error", status.getReasonPhrase());
        errorDetails.put("message", message);
        return errorDetails;
    }
}
