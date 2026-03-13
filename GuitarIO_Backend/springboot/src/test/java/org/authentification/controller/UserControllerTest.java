package org.authentification.controller;

import org.authentification.dto.RegisterRequest;
import org.authentification.service.JwtService;
import org.authentification.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtService jwtService;

    @Test
    void register_ShouldReturnCreated_WhenValidRequest() throws Exception {
        // Arrange
        when(userService.register(any(RegisterRequest.class))).thenReturn(new org.authentification.entity.User());
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
}