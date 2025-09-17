package org.example.backend.service;

import org.example.backend.model.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(properties = "steam.api-key=${STEAM_DEV_KEY:}")
class SteamServiceTest {

    @Autowired
    private SteamService steamService;


    private final String testSteamId = "76561198000000000";

    @Test
    void getProfile_realApi() {
        PlayerSummaryResponse.Player player = steamService.getProfile(testSteamId);
        assertNotNull(player);
        assertEquals(testSteamId, player.steamid());
        System.out.println("Persona: " + player.personaname());
    }

    @Test
    void getOwnedGames_realApi() {
        OwnedGamesResponse.Response response = steamService.getOwnedGames(testSteamId);
        assertNotNull(response);
        System.out.println("Anzahl Spiele: " + response.game_count());
    }

    @Test
    void getAchievements_realApi() {
        int appId = 440;
        PlayerAchievementsResponse.Playerstats stats = steamService.getAchievements(testSteamId, appId);
        assertNotNull(stats);
        System.out.println("Achievements für AppID " + appId + ": " + stats.achievements().size());
    }

    @Test
    void getGameSchema_realApi() {
        int appId = 440;
        GameSchemaResponse.Game game = steamService.getGameSchema(appId);
        assertNotNull(game);
        System.out.println("Game: " + game.gameName());
    }
}
