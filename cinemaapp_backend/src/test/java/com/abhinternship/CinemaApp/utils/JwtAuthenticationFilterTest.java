package com.abhinternship.CinemaApp.utils;

import com.abhinternship.CinemaApp.model.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtAuthenticationFilterTest {

    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private JwtUtil jwtUtil;
    private HttpServletRequest request;
    private HttpServletResponse response;
    private FilterChain filterChain;

    @BeforeEach
    void setUp() {
        jwtUtil = mock(JwtUtil.class);
        jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtUtil);

        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);
        filterChain = mock(FilterChain.class);

        SecurityContextHolder.clearContext();
    }

    @Test
    void doFilterInternal_ShouldValidateToken_WhenTokenIsValid() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn("Bearer validToken");
        final User user = new User();
        user.setEmail("test@example.com");
        user.setRole("USER");

        final Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(user);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        when(jwtUtil.validateToken("validToken", user)).thenReturn(true);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(jwtUtil).validateToken("validToken", user);
        verify(filterChain).doFilter(request, response);
    }


    @Test
    void doFilterInternal_ShouldSkipValidation_WhenTokenIsNull() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn(null);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(jwtUtil, never()).validateToken(anyString(), any());
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void doFilterInternal_ShouldSkipValidation_WhenPrincipalIsNotUser() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn("Bearer validToken");

        final Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn("NonUserPrincipal");
        SecurityContextHolder.getContext().setAuthentication(authentication);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(jwtUtil, never()).validateToken(anyString(), any());
        verify(filterChain).doFilter(request, response);
    }


    @Test
    void doFilterInternal_ShouldHandleInvalidTokenAndContinueFilterChain() throws ServletException, IOException {
        when(request.getHeader("Authorization")).thenReturn("Bearer malformedToken");

        final User user = new User();
        user.setEmail("test@example.com");
        user.setRole("USER");

        final Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(user);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        doThrow(new RuntimeException("Invalid token")).when(jwtUtil).validateToken("malformedToken", user);

        assertDoesNotThrow(() -> jwtAuthenticationFilter.doFilterInternal(request, response, filterChain));

        verify(jwtUtil).validateToken("malformedToken", user);
        verify(filterChain).doFilter(request, response);
    }
}
