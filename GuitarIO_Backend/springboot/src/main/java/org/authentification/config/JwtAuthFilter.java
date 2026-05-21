package org.authentification.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
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

        if (auth != null && auth.startsWith("Bearer ")) {
            String token = auth.substring(7);

            try {
                var claims = jwt.parse(token).getBody();

                Object uidObj = claims.get("uid");
                if (uidObj == null) {
                    throw new RuntimeException("uid missing in token claims");
                }

                Long uid = Long.valueOf(uidObj.toString());
                String role = (String) claims.get("role");

                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                    var authentication = new UsernamePasswordAuthenticationToken(
                            uid,
                            null,
                            role != null ? List.of(() -> role) : List.of()
                    );

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
                          "message": "The Authorization Bearer token was rejected before reaching the controller.",
                          "hint": "Log in again, copy the fresh access token, and send it as Authorization: Bearer <token>."
                        }
                        """);
                return;
            }
        }

        chain.doFilter(request, response);
    }
}

