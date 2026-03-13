package org.authentification.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.authentification.service.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.JwtException;

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

        System.out.println("➡ JwtAuthFilter called for: " + request.getRequestURI());
        System.out.println("➡ Authorization header = " + auth);

        if (auth != null && auth.startsWith("Bearer ")) {
            String token = auth.substring(7);

            try {
                var claims = jwt.parse(token).getBody();
                System.out.println("➡ CLAIMS = " + claims);

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
                    System.out.println("✅ Authentication set for uid=" + uid + " role=" + role);
                }

            } catch (Exception e) {
                e.printStackTrace(); // IMPORTANT: we need the real reason
                SecurityContextHolder.clearContext();
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
                return;
            }
        }

        chain.doFilter(request, response);
    }
}

