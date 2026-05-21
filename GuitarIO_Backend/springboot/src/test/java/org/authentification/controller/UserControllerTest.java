package org.authentification.controller;

import org.authentification.dto.RegisterRequest;
import org.authentification.entity.User;
import org.authentification.service.JwtService;
import org.authentification.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private JwtService jwtService;

    @Test
    void register_ShouldReturnCreated_WhenValidRequest() throws Exception {
        // Arrange
        when(userService.register(any(RegisterRequest.class))).thenReturn(testUser());
        when(jwtService.generateToken(any(), any(), any())).thenReturn("mock-token");

        // Act & Assert
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "username": "testuser",
                        "firstname": "John",
                        "lastname": "Doe",
                        "email": "john.doe@example.com",
                        "password": "password123",
                        "telNumber": "1234567890",
                        "address": "123 Main St",
                        "role": "ROLE_USER",
                        "dialingCode": "+1"
                    }
                    """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken").value("mock-token"))
                .andExpect(jsonPath("$.refreshToken").value("mock-token"));
    }

    @Test
    void login_ShouldReturnTokens_WhenCredentialsAreValid() throws Exception {
        User user = testUser();
        when(userService.findByEmailOrThrow("john.doe@example.com")).thenReturn(user);
        when(userService.checkPassword(user, "password123")).thenReturn(true);
        when(jwtService.generateToken(any(), any(), any())).thenReturn("mock-token");

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "email": "john.doe@example.com",
                        "password": "password123"
                    }
                    """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("mock-token"))
                .andExpect(jsonPath("$.refreshToken").value("mock-token"));
    }

    @Test
    void login_ShouldReturnUnauthorized_WhenPasswordIsInvalid() throws Exception {
        User user = testUser();
        when(userService.findByEmailOrThrow("john.doe@example.com")).thenReturn(user);
        when(userService.checkPassword(user, "wrong-password")).thenReturn(false);

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "email": "john.doe@example.com",
                        "password": "wrong-password"
                    }
                    """))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid credentials"));
    }

    private static User testUser() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setFirstname("John");
        user.setLastname("Doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("encoded-password");
        return user;
    }
}
