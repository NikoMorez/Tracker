package org.example.backend.model;

import org.springframework.data.annotation.Id;

import java.util.Map;

public record User(
        @Id String id,
        String username,
        String password,
        String email,
        String role,
        Map<String, String> serviceNames,
        Map<String, Map<String, String>> pageConfig
) {}
