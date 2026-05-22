package org.authentification.config;

import jakarta.servlet.http.Cookie;
import org.authentification.service.JwtService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.Duration;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class JwtAuthFilterTest {

    private static final String TEST_SECRET = "6mJqV8xN2pL4sR7tY1wK9dF3hC5bU0zQ8nA2eX6vM1pR4tY7";

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void doFilterInternal_ShouldAuthenticateFromHttpOnlyAccessTokenCookie() throws Exception {
        JwtService jwtService = new JwtService(TEST_SECRET);
        String accessToken = jwtService.generateToken(
                "player@guitario.test",
                Map.of("uid", 7L, "role", "ROLE_USER", "user", "yassine"),
                Duration.ofMinutes(15)
        );
        JwtAuthFilter filter = new JwtAuthFilter(jwtService);
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setCookies(new Cookie("accessToken", accessToken));
        MockHttpServletResponse response = new MockHttpServletResponse();

        filter.doFilterInternal(request, response, new MockFilterChain());

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        assertNotNull(authentication);
        assertEquals(7L, authentication.getPrincipal());
        assertEquals("ROLE_USER", authentication.getAuthorities().iterator().next().getAuthority());
    }
}
