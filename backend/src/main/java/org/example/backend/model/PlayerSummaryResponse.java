package org.example.backend.model;

import java.util.List;

public record PlayerSummaryResponse(Response response) {
    public record Response(List<Player> players) {}

    public record Player(
            String steamid,
            String personaname,
            String profileurl,
            String avatar,
            String avatarmedium,
            String avatarfull,
            int personastate, // online/offline status
            long lastlogoff
    ) {}
}
