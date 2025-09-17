package org.example.backend.model;

import java.util.List;

public record PlayerAchievementsResponse(Playerstats playerstats) {
    public record Playerstats(
            String steamID,
            String gameName,
            List<Achievement> achievements
    ) {}

    public record Achievement(
            String apiname,
            int achieved, // 0 oder 1
            String name,
            String description
    ) {}
}