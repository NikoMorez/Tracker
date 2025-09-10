package org.example.backend.model;

public record UserIdentity(
        String username,
        String password,
        String email,
        String role
) {}
