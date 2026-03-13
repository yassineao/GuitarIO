package org.authentification.dto;


public record RegisterRequest(
        String username,
        String firstname,
        String lastname,
        String email,
        String password,
        String telNumber,
        String address,
        String role,

        String dialingCode
) {}
