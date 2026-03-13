package org.authentification.controller;

import org.authentification.dto.LoginRequest;
import org.authentification.dto.RegisterRequest;
import org.authentification.dto.TokenResponse;
import org.authentification.entity.User;
import org.authentification.service.JwtService;
import org.authentification.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;


@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;
    private final JwtService jwt;

    public UserController(UserService userService, JwtService jwt) {
        this.userService = userService;
        this.jwt = jwt;
    }



    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        try {
            User u = userService.register(req);
            // optional: auto-login after register
            String access = jwt.generateToken(u.getEmail(),
                    Map.of("uid", u.getId(), "role", u.getRole(),"user",u.getUsername()),
                    Duration.ofMinutes(15));
            String refresh = jwt.generateToken(u.getEmail(),
                    Map.of("uid", u.getId(), "role", u.getRole(),"user",u.getUsername()),
                    Duration.ofDays(7));
            return ResponseEntity.status(HttpStatus.CREATED).body(new TokenResponse(access, refresh));
        } catch (IllegalArgumentException ex) {
            ProblemDetail pd = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
            pd.setTitle("Registration failed");
            pd.setProperty("exception", ex.getClass().getName());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(pd);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        try {
            User u = userService.findByEmailOrThrow(req.email());

            if (!userService.checkPassword(u, req.password())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Invalid credentials"));
            }

            String access = jwt.generateToken(u.getEmail(),
                    Map.of("uid", u.getId(), "role", u.getRole(),"user",u.getUsername()),
                    Duration.ofMinutes(15));
            String refresh = jwt.generateToken(u.getEmail(),
                    Map.of("uid", u.getId(), "role", u.getRole(),"user",u.getUsername()),
                    Duration.ofDays(7));
            return ResponseEntity.ok(new TokenResponse(access, refresh));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Invalid credentials"));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody TokenResponse body) {
        try {
            var claims = jwt.parse(body.refreshToken()).getBody();
            if (!"refresh".equals(claims.get("type"))) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Invalid token type"));
            }
            String email = claims.getSubject();
            String access = jwt.generateToken(email,
                    Map.of("uid", claims.get("uid")),
                    Duration.ofMinutes(15));
            return ResponseEntity.ok(new TokenResponse(access, body.refreshToken()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","Invalid/expired token"));
        }
    }

    @RestController
    public class MainController {
        @GetMapping("/")
        public String hello() { return "OK"; }
    }


}
