package org.example.backend.model;

import java.util.List;

public record GameSchemaResponse(Game game) {
    public record Game(
            String gameName,
            AvailableGameStats availableGameStats
    ) {}

    public record AvailableGameStats(
            List<Achievement> achievements
    ) {}

    public record Achievement(
            String name,
            String defaultvalue,
            String displayName,
            String description,
            String icon,
            String icongray,
            Integer hidden
    ) {}
}
