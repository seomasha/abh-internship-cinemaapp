package com.abhinternship.CinemaApp.utils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ErrorHandlerTest {

    private ErrorHandler errorHandler;

    @Mock
    private WebRequest webRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        errorHandler = new ErrorHandler();
    }

    @Test
    void handleResourceNotFound_ShouldReturnNotFoundResponse() {
        final String errorMessage = "Resource not found";
        final ResourceNotFoundException exception = new ResourceNotFoundException(errorMessage);

        final ResponseEntity<Object> response = errorHandler.handleResourceNotFound(exception, webRequest);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        final Map<String, Object> body = (Map<String, Object>) response.getBody();
        assertEquals(errorMessage, body.get("message"));
        assertEquals(HttpStatus.NOT_FOUND.value(), body.get("status"));
    }

    @Test
    void handleBadRequest_ShouldReturnBadRequestResponse() {
        final String errorMessage = "Bad request";
        final IllegalArgumentException exception = new IllegalArgumentException(errorMessage);

        final ResponseEntity<Object> response = errorHandler.handleBadRequest(exception, webRequest);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        final Map<String, Object> body = (Map<String, Object>) response.getBody();
        assertEquals(errorMessage, body.get("message"));
        assertEquals(HttpStatus.BAD_REQUEST.value(), body.get("status"));
    }

    @Test
    void handleValidationExceptions_ShouldReturnValidationErrorResponse() {
        BindingResult bindingResult = mock(BindingResult.class);
        FieldError fieldError = new FieldError("objectName", "fieldName", "must not be empty");
        List<FieldError> fieldErrors = Collections.singletonList(fieldError);

        when(bindingResult.getFieldErrors()).thenReturn(fieldErrors);
        final MethodArgumentNotValidException exception = mock(MethodArgumentNotValidException.class);
        when(exception.getBindingResult()).thenReturn(bindingResult);

        ResponseEntity<Object> response = errorHandler.handleValidationExceptions(exception, webRequest);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        final Map<String, Object> body = (Map<String, Object>) response.getBody();
        assertEquals(HttpStatus.BAD_REQUEST.value(), body.get("status"));
        assertTrue(body.get("message").toString().contains("fieldName: must not be empty"));
    }

    @Test
    void handleGlobalException_ShouldReturnInternalServerErrorResponse() {
        final String errorMessage = "An unexpected error occurred";
        final Exception exception = new Exception(errorMessage);

        final ResponseEntity<Object> response = errorHandler.handleGlobalException(exception, webRequest);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        final Map<String, Object> body = (Map<String, Object>) response.getBody();
        assertEquals(errorMessage, body.get("message"));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR.value(), body.get("status"));
    }
}
