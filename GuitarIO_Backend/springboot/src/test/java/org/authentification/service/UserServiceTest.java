package org.authentification.service;

import org.authentification.dto.RegisterRequest;
import org.authentification.entity.User;
import org.authentification.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private RegisterRequest registerRequest;
    private User user;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest(
            "testuser",
            "John",
            "Doe",
            "john.doe@example.com",
            "password123",
            "1234567890",
            "123 Main St",
            "ROLE_USER",
            "+1"
        );

        user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setFirstname("John");
        user.setLastname("Doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("encodedPassword");
        user.setRole("ROLE_USER");
    }

    @Test
    void register_ShouldCreateUser_WhenEmailNotExists() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Act
        User result = userService.register(registerRequest);

        // Assert
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        assertEquals("john.doe@example.com", result.getEmail());
        verify(userRepository).existsByEmail("john.doe@example.com");
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_ShouldThrowException_WhenEmailAlreadyExists() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
            () -> userService.register(registerRequest));
        assertEquals("Email already in use", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void findByEmailOrThrow_ShouldReturnUser_WhenUserExists() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(java.util.Optional.of(user));

        // Act
        User result = userService.findByEmailOrThrow("john.doe@example.com");

        // Assert
        assertNotNull(result);
        assertEquals("john.doe@example.com", result.getEmail());
        verify(userRepository).findByEmail("john.doe@example.com");
    }

    @Test
    void findByEmailOrThrow_ShouldThrowException_WhenUserNotFound() {
        // Arrange
        when(userRepository.findByEmail(anyString())).thenReturn(java.util.Optional.empty());

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
            () -> userService.findByEmailOrThrow("nonexistent@example.com"));
        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void checkPassword_ShouldReturnTrue_WhenPasswordMatches() {
        // Arrange
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        // Act
        boolean result = userService.checkPassword(user, "password123");

        // Assert
        assertTrue(result);
        verify(passwordEncoder).matches("password123", "encodedPassword");
    }

    @Test
    void checkPassword_ShouldReturnFalse_WhenPasswordDoesNotMatch() {
        // Arrange
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

        // Act
        boolean result = userService.checkPassword(user, "wrongpassword");

        // Assert
        assertFalse(result);
        verify(passwordEncoder).matches("wrongpassword", "encodedPassword");
    }
}