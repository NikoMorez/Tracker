package org.example.backend.model;

import java.util.List;

public record OwnedGamesResponse(Response response) {
    public record Response(int game_count, List<Game> games) {}

    public record Game(
            int appid,
            String name,
            int playtime_forever,
            String img_icon_url
    ) {}
}