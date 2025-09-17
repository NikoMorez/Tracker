package org.example.backend.model;

public record ServiceData (
    String url,
    boolean visible,
    int order,
    String externalId,
    String oauthToken,
    String refreshToken
){}
