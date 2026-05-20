package org.authentification.controller;

import org.authentification.dto.LoginRequest;
import org.authentification.dto.TokenResponse;
import org.authentification.entity.User;
import org.authentification.service.JwtService;
import org.authentification.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserControllerUnitTest {

    private static final String TEST_SECRET = "6mJqV8xN2pL4sR7tY1wK9dF3hC5bU0zQ8nA2eX6vM1pR4tY7";

    private UserService userService;
    private JwtService jwtService;
    private UserController userController;

    @BeforeEach
    void setUp() {
        userService = mock(UserService.class);
        jwtService = new JwtService(TEST_SECRET);
        userController = new UserController(userService, jwtService);
    }

    @Test
    void login_ShouldIssueRefreshTokenWithRefreshTypeClaim() {
        User user = user();
        when(userService.findByEmailOrThrow("player@guitario.test")).thenReturn(user);
        when(userService.checkPassword(user, "secret")).thenReturn(true);

        ResponseEntity<?> response = userController.login(new LoginRequest("player@guitario.test", "secret"));

        assertEquals(HttpStatus.OK, response.getStatusCode());
        TokenResponse tokens = assertInstanceOf(TokenResponse.class, response.getBody());
        assertNotNull(tokens.accessToken());
        assertNotNull(tokens.refreshToken());
        assertEquals("refresh", jwtService.parse(tokens.refreshToken()).getBody().get("type"));
        assertEquals(7, jwtService.parse(tokens.refreshToken()).getBody().get("uid"));
    }

    @Test
    void refresh_ShouldReturnNewAccessToken_WhenRefreshTokenIsValid() {
        String refreshToken = jwtService.generateToken(
                "player@guitario.test",
                java.util.Map.of("uid", 7L, "role", "ROLE_USER", "user", "yassine", "type", "refresh"),
                java.time.Duration.ofDays(7)
        );

        ResponseEntity<?> response = userController.refresh(new TokenResponse(null, refreshToken));

        assertEquals(HttpStatus.OK, response.getStatusCode());
        TokenResponse tokens = assertInstanceOf(TokenResponse.class, response.getBody());
        assertEquals(refreshToken, tokens.refreshToken());
        assertEquals(7, jwtService.parse(tokens.accessToken()).getBody().get("uid"));
        assertEquals("ROLE_USER", jwtService.parse(tokens.accessToken()).getBody().get("role"));
        assertEquals("yassine", jwtService.parse(tokens.accessToken()).getBody().get("user"));
    }

    @Test
    void refresh_ShouldRejectAccessTokenWithoutRefreshTypeClaim() {
        String accessToken = jwtService.generateToken(
                "player@guitario.test",
                java.util.Map.of("uid", 7L, "role", "ROLE_USER", "user", "yassine"),
                java.time.Duration.ofMinutes(15)
        );

        ResponseEntity<?> response = userController.refresh(new TokenResponse(null, accessToken));

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    private User user() {
        User user = new User();
        user.setId(7L);
        user.setUsername("yassine");
        user.setEmail("player@guitario.test");
        user.setPassword("hashed");
        return user;
    }
}
