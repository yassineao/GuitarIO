package org.authentification.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
    }

    @Test
    void generateToken_ShouldCreateValidToken() {
        // Arrange
        String subject = "test@example.com";
        Map<String, Object> claims = Map.of("uid", 1L, "role", "ROLE_USER");
        Duration ttl = Duration.ofMinutes(15);

        // Act
        String token = jwtService.generateToken(subject, claims, ttl);

        // Assert
        assertNotNull(token);
        assertTrue(token.length() > 0);
    }

    @Test
    void parse_ShouldReturnValidClaims_WhenTokenIsValid() {
        // Arrange
        String subject = "test@example.com";
        Map<String, Object> claims = Map.of("uid", 1L, "role", "ROLE_USER");
        Duration ttl = Duration.ofMinutes(15);
        String token = jwtService.generateToken(subject, claims, ttl);

        // Act
        Jws<Claims> parsedToken = jwtService.parse(token);

        // Assert
        assertNotNull(parsedToken);
        assertEquals(subject, parsedToken.getBody().getSubject());
        assertEquals(1, parsedToken.getBody().get("uid"));
        assertEquals("ROLE_USER", parsedToken.getBody().get("role"));
    }

    @Test
    void parse_ShouldThrowException_WhenTokenIsInvalid() {
        // Arrange
        String invalidToken = "invalid.jwt.token";

        // Act & Assert
        assertThrows(Exception.class, () -> jwtService.parse(invalidToken));
    }

    @Test
    void extractUsername_ShouldReturnSubject() {
        // Arrange
        String subject = "test@example.com";
        Map<String, Object> claims = Map.of("uid", 1L);
        Duration ttl = Duration.ofMinutes(15);
        String token = jwtService.generateToken(subject, claims, ttl);

        // Act
        String extractedUsername = jwtService.extractUsername(token);

        // Assert
        assertEquals(subject, extractedUsername);
    }

    @Test
    void extractSubject_ShouldReturnSubject() {
        // Arrange
        String subject = "test@example.com";
        Map<String, Object> claims = Map.of("uid", 1L);
        Duration ttl = Duration.ofMinutes(15);
        String token = jwtService.generateToken(subject, claims, ttl);

        // Act
        String extractedSubject = jwtService.extractSubject(token);

        // Assert
        assertEquals(subject, extractedSubject);
    }
}