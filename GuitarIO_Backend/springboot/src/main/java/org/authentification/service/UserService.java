package org.authentification.service;


import org.authentification.dto.RegisterRequest;
import org.authentification.entity.User;
import org.authentification.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository users;
    private final PasswordEncoder encoder;

    public UserService(UserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    public User register(RegisterRequest req) {
        System.out.println("ppppppppp"+req);

        System.out.println("ppppajfodapfppppp"+req.firstname()+"iafhiasdnfasiüh");
        if (users.existsByEmail(req.email())) {
            throw new IllegalArgumentException("Email already in use");
        }
        User u = new User();

        u.setUsername(req.username());
        u.setFirstname(req.firstname());

        u.setLastname(req.lastname());
        u.setEmail(req.email());

        u.setPassword(encoder.encode(req.password())); // hash

        u.setTelNumber(req.dialingCode(),req.telNumber());
        u.setAddress(req.address());
        u.setRole("ROLE_USER");
        return users.save(u);
    }

    public User findByEmailOrThrow(String email) {
        return users.findByEmail(email).orElseThrow(
                () -> new IllegalArgumentException("User not found"));
    }

    public boolean checkPassword(User user, String rawPassword) {

        return encoder.matches(rawPassword, user.getPassword());
    }
}
