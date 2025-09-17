package org.example.backend.controller;

import org.example.backend.model.GameSchemaResponse;
import org.example.backend.model.OwnedGamesResponse;
import org.example.backend.model.PlayerAchievementsResponse;
import org.example.backend.model.PlayerSummaryResponse;
import org.example.backend.service.SteamService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/steam")
public class SteamApiController {

    private final SteamService steamService;

    public SteamApiController(SteamService steamService) {
        this.steamService = steamService;
    }

    @GetMapping("/profile/{steamId}")
    public PlayerSummaryResponse.Player getProfile(@PathVariable String steamId) {
        return steamService.getProfile(steamId);
    }

    @GetMapping("/games/{steamId}")
    public OwnedGamesResponse.Response getOwnedGames(@PathVariable String steamId) {
        return steamService.getOwnedGames(steamId);
    }

    @GetMapping("/achievements/{steamId}/{appId}")
    public PlayerAchievementsResponse.Playerstats getAchievements(
            @PathVariable String steamId,
            @PathVariable int appId
    ) {
        return steamService.getAchievements(steamId, appId);
    }

    @GetMapping("/schema/{appId}")
    public GameSchemaResponse.Game getGameSchema(@PathVariable int appId) {
        return steamService.getGameSchema(appId);
    }
}
