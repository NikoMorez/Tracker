package org.example.backend.controller;

import org.example.backend.model.*;
import org.example.backend.service.SteamService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class SteamApiControllerTest {

    @Mock
    private SteamService steamService;

    @InjectMocks
    private SteamApiController steamApiController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getProfile_returnsPlayer() {
        PlayerSummaryResponse.Player player = new PlayerSummaryResponse.Player(
                "12345",
                "PersonaName",
                "profileUrl",
                "avatar",
                "avatarmedium",
                "avatarfull",
                1,
                1234567890L
        );

        when(steamService.getProfile("12345")).thenReturn(player);

        PlayerSummaryResponse.Player result = steamApiController.getProfile("12345");

        assertEquals("12345", result.steamid());
        assertEquals("PersonaName", result.personaname());
    }

    @Test
    void getOwnedGames_returnsResponse() {
        OwnedGamesResponse.Game game1 = new OwnedGamesResponse.Game(1, "Game1", 100, "icon1");
        OwnedGamesResponse.Game game2 = new OwnedGamesResponse.Game(2, "Game2", 200, "icon2");

        OwnedGamesResponse.Response response = new OwnedGamesResponse.Response(2, List.of(game1, game2));

        when(steamService.getOwnedGames("12345")).thenReturn(response);

        OwnedGamesResponse.Response result = steamApiController.getOwnedGames("12345");

        assertEquals(2, result.game_count());
        assertEquals("Game1", result.games().getFirst()).name());
    }

    @Test
    void getAchievements_returnsPlayerstats() {
        PlayerAchievementsResponse.Achievement ach1 = new PlayerAchievementsResponse.Achievement(
                "ACH_1", 1, "Achievement 1", "Description 1"
        );

        PlayerAchievementsResponse.Playerstats playerstats = new PlayerAchievementsResponse.Playerstats(
                "12345",
                "Game1",
                List.of(ach1)
        );

        when(steamService.getAchievements("12345", 1)).thenReturn(playerstats);

        PlayerAchievementsResponse.Playerstats result = steamApiController.getAchievements("12345", 1);

        assertEquals("12345", result.steamID());
        assertEquals("Game1", result.gameName());
        assertEquals(1, result.achievements().size());
        assertEquals("ACH_1", result.achievements().getFirst().apiname());
    }

    @Test
    void getGameSchema_returnsGame() {
        GameSchemaResponse.Achievement achievement = new GameSchemaResponse.Achievement(
                "ACH_1", "0", "Achievement 1", "Description 1", "icon", "icongray", 0
        );
        GameSchemaResponse.AvailableGameStats availableStats =
                new GameSchemaResponse.AvailableGameStats(List.of(achievement));
        GameSchemaResponse.Game game = new GameSchemaResponse.Game("Game1", availableStats);

        when(steamService.getGameSchema(1)).thenReturn(game);

        GameSchemaResponse.Game result = steamApiController.getGameSchema(1);

        assertEquals("Game1", result.gameName());
        assertEquals(1, result.availableGameStats().achievements().size());
        assertEquals("ACH_1", result.availableGameStats().achievements().getFirst().name());
    }
}
