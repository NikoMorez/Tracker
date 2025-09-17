package org.example.backend.service;

import org.example.backend.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestClient;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class SteamServiceTest {

    private SteamService steamService;

    @Mock
    private RestClient restClient;

    @Value("${steam.api-key}")
    private String apiKey;

    private final String testSteamId = "12345678901234567";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);


        RestClient.RequestHeadersUriSpec<?> uriSpecMock = mock(RestClient.RequestHeadersUriSpec.class);
        RestClient.RequestHeadersSpec<?> headersSpecMock = mock(RestClient.RequestHeadersSpec.class);
        RestClient.ResponseSpec responseSpecMock = mock(RestClient.ResponseSpec.class);

        steamService = new SteamService(apiKey) {
            @Override
            public PlayerSummaryResponse.Player getProfile(String steamId) {

                PlayerSummaryResponse.Player player = new PlayerSummaryResponse.Player(
                        steamId,
                        "TestUser",
                        "http://profile.url",
                        "avatar.jpg",
                        "avatarmedium.jpg",
                        "avatarfull.jpg",
                        1,
                        1234567890L
                );
                return player;
            }

            @Override
            public OwnedGamesResponse.Response getOwnedGames(String steamId) {
                return new OwnedGamesResponse.Response(
                        1,
                        List.of(new OwnedGamesResponse.Game(1, "TestGame", 100, "icon_url"))
                );
            }

            @Override
            public PlayerAchievementsResponse.Playerstats getAchievements(String steamId, int appId) {
                return new PlayerAchievementsResponse.Playerstats(
                        steamId,
                        "TestGame",
                        List.of(new PlayerAchievementsResponse.Achievement("ACH_1", 1, "Achievement1", "Desc"))
                );
            }

            @Override
            public GameSchemaResponse.Game getGameSchema(int appId) {
                return new GameSchemaResponse.Game(
                        "TestGame",
                        new GameSchemaResponse.AvailableGameStats(
                                List.of(new GameSchemaResponse.Achievement(
                                        "ACH_1", "0", "Achievement1", "Desc", "icon", "icongray", 0
                                ))
                        )
                );
            }
        };
    }



    @Test
    void getProfile_returnsPlayer() {
        PlayerSummaryResponse.Player player = steamService.getProfile(testSteamId);
        assertNotNull(player);
        assertEquals(testSteamId, player.steamid());
        assertNotNull(player.personaname());
    }

    @Test
    void getProfile_returnsNullWhenNoPlayers() {
        SteamService emptyService = new SteamService(apiKey) {
            @Override
            public PlayerSummaryResponse.Player getProfile(String steamId) {
                return null;
            }
        };
        assertNull(emptyService.getProfile(testSteamId));
    }

    @Test
    void getOwnedGames_returnsGames() {
        OwnedGamesResponse.Response response = steamService.getOwnedGames(testSteamId);
        assertNotNull(response);
        assertEquals(1, response.game_count());
        assertFalse(response.games().isEmpty());
    }

    @Test
    void getOwnedGames_returnsNullWhenNoResponse() {
        SteamService emptyService = new SteamService(apiKey) {
            @Override
            public OwnedGamesResponse.Response getOwnedGames(String steamId) {
                return null;
            }
        };
        assertNull(emptyService.getOwnedGames(testSteamId));
    }

    @Test
    void getAchievements_returnsPlayerstats() {
        PlayerAchievementsResponse.Playerstats stats = steamService.getAchievements(testSteamId, 1);
        assertNotNull(stats);
        assertEquals(testSteamId, stats.steamID());
        assertFalse(stats.achievements().isEmpty());
    }

    @Test
    void getAchievements_returnsNullWhenNoPlayerstats() {
        SteamService emptyService = new SteamService(apiKey) {
            @Override
            public PlayerAchievementsResponse.Playerstats getAchievements(String steamId, int appId) {
                return null;
            }
        };
        assertNull(emptyService.getAchievements(testSteamId, 1));
    }

    @Test
    void getGameSchema_returnsGame() {
        GameSchemaResponse.Game game = steamService.getGameSchema(1);
        assertNotNull(game);
        assertEquals("TestGame", game.gameName());
        assertFalse(game.availableGameStats().achievements().isEmpty());
    }

    @Test
    void getGameSchema_returnsNullWhenNoGame() {
        SteamService emptyService = new SteamService(apiKey) {
            @Override
            public GameSchemaResponse.Game getGameSchema(int appId) {
                return null;
            }
        };
        assertNull(emptyService.getGameSchema(1));
    }
}
