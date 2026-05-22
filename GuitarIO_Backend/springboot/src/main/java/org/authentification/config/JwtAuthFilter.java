package org.authentification.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.authentification.service.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final String ACCESS_COOKIE = "accessToken";

    private final JwtService jwt;

    public JwtAuthFilter(JwtService jwt) {
        this.jwt = jwt;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        String auth = request.getHeader("Authorization");
        String token = null;

        if (auth != null && auth.startsWith("Bearer ")) {
            token = auth.substring(7);
        } else {
            token = readCookie(request, ACCESS_COOKIE);
        }

        if (token != null && !token.isBlank()) {
            try {
                var claims = jwt.parse(token).getBody();
                if ("refresh".equals(claims.get("type"))) {
                    throw new RuntimeException("refresh token cannot authenticate requests");
                }

                Object uidObj = claims.get("uid");
                if (uidObj == null) {
                    throw new RuntimeException("uid missing in token claims");
                }

                Long uid = Long.valueOf(uidObj.toString());
                String role = (String) claims.get("role");
                String user = (String) claims.get("user");

                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                    var authentication = new UsernamePasswordAuthenticationToken(
                            uid,
                            null,
                            role != null ? List.of(() -> role) : List.of()
                    );
                    authentication.setDetails(java.util.Map.of(
                            "uid", uid,
                            "role", role == null ? "" : role,
                            "user", user == null ? "" : user,
                            "email", claims.getSubject()
                    ));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    }

            } catch (Exception e) {
                e.printStackTrace(); // IMPORTANT: we need the real reason
                SecurityContextHolder.clearContext();
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("""
                        {
                          "error": "APP_JWT_INVALID_OR_EXPIRED",
                          "message": "The access token was rejected before reaching the controller.",
                          "hint": "Log in again so the browser receives a fresh HttpOnly accessToken cookie."
                        }
                        """);
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private String readCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }

        for (Cookie cookie : cookies) {
            if (name.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
