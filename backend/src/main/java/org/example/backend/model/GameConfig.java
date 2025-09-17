package org.example.backend.model;

import java.util.List;

public record GameConfig(
        String serviceName,
        String gameId,
        String gameName,
        String iconUrl,
        boolean visible,
        int order,
        int playtime,
        List<String> features
) {}
