package com.abhinternship.CinemaApp.utils;

import com.abhinternship.CinemaApp.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secretKey", "testSecretKey");
    }

    @Test
    void generateToken_ShouldReturnValidToken() {
        final User user = new User();
        user.setEmail("test@example.com");
        user.setRole("USER");

        String token = jwtUtil.generateToken(user);

        assertNotNull(token);
        assertEquals(user.getEmail(), jwtUtil.extractEmail(token));
    }

    @Test
    void extractEmail_ShouldReturnCorrectEmail() {
        final User user = new User();
        user.setEmail("test@example.com");
        user.setRole("USER");
        final String token = jwtUtil.generateToken(user);

        final String extractedEmail = jwtUtil.extractEmail(token);

        assertEquals(user.getEmail(), extractedEmail);
    }

    @Test
    void isTokenExpired_ShouldReturnFalseForValidToken() {
        final User user = new User();
        user.setEmail("test@example.com");
        user.setRole("USER");
        final String token = jwtUtil.generateToken(user);

        boolean isExpired = jwtUtil.isTokenExpired(token);

        assertFalse(isExpired);
    }

    @Test
    void isTokenExpired_ShouldReturnTrueForExpiredToken() throws InterruptedException {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secretKey", "testSecretKey");
        ReflectionTestUtils.setField(jwtUtil, "expirationTime", 100L);
        final User user = new User();
        user.setEmail("test@example.com");
        user.setRole("USER");
        final String token = jwtUtil.generateToken(user);

        Thread.sleep(1000);

        final boolean isExpired = jwtUtil.isTokenExpired(token);

        assertTrue(isExpired);
    }

    @Test
    void validateToken_ShouldReturnTrueForValidToken() {
        final User user = new User();
        user.setEmail("test@example.com");
        user.setRole("USER");
        final String token = jwtUtil.generateToken(user);

        final boolean isValid = jwtUtil.validateToken(token, user);

        assertTrue(isValid);
    }

    @Test
    void validateToken_ShouldReturnFalseForInvalidToken() {
        final User user = new User();
        user.setEmail("test@example.com");
        user.setRole("USER");
        final String token = jwtUtil.generateToken(user);

        final User differentUser = new User();
        differentUser.setEmail("different@example.com");
        differentUser.setRole("ADMIN");

        final boolean isValid = jwtUtil.validateToken(token, differentUser);

        assertFalse(isValid);
    }
}
