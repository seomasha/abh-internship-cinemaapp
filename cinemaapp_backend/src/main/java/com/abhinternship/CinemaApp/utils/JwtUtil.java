package com.abhinternship.CinemaApp.utils;

import com.abhinternship.CinemaApp.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secretKey;

    private long expirationTime = 1000 * 60 * 60; // Final keyword je izostavljen kako bi se
                                                  // vrijednost mogla promijeniti unutar testa putem Reflectiona
                                                  // Komentar ce se poslije izbrisati haha :D

    public String generateToken(final User user) {
        return JWT.create()
                .withSubject(user.getEmail())
                .withClaim("role", user.getRole())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(Algorithm.HMAC256(secretKey));
    }

    public String extractEmail(final String token) {
        return JWT.decode(token).getSubject();
    }

    public boolean isTokenExpired(final String token) {
        return JWT.decode(token).getExpiresAt().before(new Date());
    }

    public boolean validateToken(final String token, final User user) {
        return !isTokenExpired(token) && user.getEmail().equals(extractEmail(token));
    }
}
