package org.authentification.controller;

import org.authentification.dto.LoginRequest;
import org.authentification.dto.TokenResponse;
import org.authentification.entity.User;
import org.authentification.service.JwtService;
import org.authentification.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

        ResponseEntity<?> response = userController.login(
                new LoginRequest("player@guitario.test", "secret"),
                new MockHttpServletRequest()
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        String accessToken = extractCookie(response, "accessToken");
        String refreshToken = extractCookie(response, "refreshToken");
        assertNotNull(accessToken);
        assertNotNull(refreshToken);
        assertEquals(7, jwtService.parse(accessToken).getBody().get("uid"));
        assertEquals("refresh", jwtService.parse(refreshToken).getBody().get("type"));
        assertEquals(7, jwtService.parse(refreshToken).getBody().get("uid"));
    }

    @Test
    void login_ShouldSetCrossSiteCookieAttributes_WhenRequestComesFromHttpsFrontend() {
        User user = user();
        when(userService.findByEmailOrThrow("player@guitario.test")).thenReturn(user);
        when(userService.checkPassword(user, "secret")).thenReturn(true);

        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Origin", "https://guitar-io.vercel.app");

        ResponseEntity<?> response = userController.login(
                new LoginRequest("player@guitario.test", "secret"),
                request
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        String accessCookie = findSetCookie(response, "accessToken");
        String refreshCookie = findSetCookie(response, "refreshToken");
        assertNotNull(accessCookie);
        assertNotNull(refreshCookie);
        org.junit.jupiter.api.Assertions.assertTrue(accessCookie.contains("Secure"));
        org.junit.jupiter.api.Assertions.assertTrue(accessCookie.contains("SameSite=None"));
        org.junit.jupiter.api.Assertions.assertTrue(refreshCookie.contains("Secure"));
        org.junit.jupiter.api.Assertions.assertTrue(refreshCookie.contains("SameSite=None"));
    }

    @Test
    void refresh_ShouldReturnNewAccessToken_WhenRefreshTokenIsValid() {
        String refreshToken = jwtService.generateToken(
                "player@guitario.test",
                java.util.Map.of("uid", 7L, "role", "ROLE_USER", "user", "yassine", "type", "refresh"),
                java.time.Duration.ofDays(7)
        );

        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setCookies(new jakarta.servlet.http.Cookie("refreshToken", refreshToken));

        ResponseEntity<?> response = userController.refresh(null, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        String accessToken = extractCookie(response, "accessToken");
        assertNotNull(accessToken);
        assertEquals(7, jwtService.parse(accessToken).getBody().get("uid"));
        assertEquals("ROLE_USER", jwtService.parse(accessToken).getBody().get("role"));
        assertEquals("yassine", jwtService.parse(accessToken).getBody().get("user"));
    }

    @Test
    void refresh_ShouldRejectAccessTokenWithoutRefreshTypeClaim() {
        String accessToken = jwtService.generateToken(
                "player@guitario.test",
                java.util.Map.of("uid", 7L, "role", "ROLE_USER", "user", "yassine"),
                java.time.Duration.ofMinutes(15)
        );

        ResponseEntity<?> response = userController.refresh(
                new TokenResponse(null, accessToken),
                new MockHttpServletRequest()
        );

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    private String extractCookie(ResponseEntity<?> response, String name) {
        String cookie = findSetCookie(response, name);
        if (cookie == null) {
            return null;
        }
        return cookie.substring((name + "=").length(), cookie.indexOf(';'));
    }

    private String findSetCookie(ResponseEntity<?> response, String name) {
        return response.getHeaders().getOrEmpty("Set-Cookie").stream()
                .filter(header -> header.startsWith(name + "="))
                .findFirst()
                .orElse(null);
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
