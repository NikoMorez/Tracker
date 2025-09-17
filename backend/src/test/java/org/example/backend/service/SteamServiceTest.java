package org.example.backend.service;

import org.example.backend.model.GameSchemaResponse;
import org.example.backend.model.OwnedGamesResponse;
import org.example.backend.model.PlayerAchievementsResponse;
import org.example.backend.model.PlayerSummaryResponse;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@SpringBootTest
@AutoConfigureMockRestServiceServer
class SteamServiceTest {

    @Autowired
    private SteamService steamService;

    @Mock
    private RestClient restClient;

    @Autowired
    private MockRestServiceServer mockServer;

    private final String testSteamId = "12345678901234567";
    private final int testAppId = 123;

    @Test
    void getProfile_returnsPlayer() {
        String jsonResponse = """
            {
              "response": {
                "players": [
                  {
                    "steamid": "%s",
                    "personaname": "TestUser",
                    "profileurl": "http://profile.url",
                    "avatar": "avatar.jpg",
                    "avatarmedium": "avatarmedium.jpg",
                    "avatarfull": "avatarfull.jpg",
                    "personastate": 1,
                    "lastlogoff": 1234567890
                  }
                ]
              }
            }
        """.formatted(testSteamId);

        mockServer.expect(requestTo("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=FAKE_KEY&steamids=" + testSteamId))
                .andRespond(withSuccess(jsonResponse, MediaType.APPLICATION_JSON));

        PlayerSummaryResponse.Player player = steamService.getProfile(testSteamId);
        assertThat(player).isNotNull();
        assertThat(player.steamid()).isEqualTo(testSteamId);
        assertThat(player.personaname()).isEqualTo("TestUser");

        mockServer.verify();
    }

    @Test
    void getOwnedGames_returnsGames() {
        String jsonResponse = """
            {
              "response": {
                "game_count": 1,
                "games": [
                  {
                    "appid": %d,
                    "name": "TestGame",
                    "playtime_forever": 100,
                    "img_icon_url": "icon_url"
                  }
                ]
              }
            }
        """.formatted(testAppId);

        mockServer.expect(requestTo("https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=FAKE_KEY&steamid=" + testSteamId + "&include_appinfo=1"))
                .andRespond(withSuccess(jsonResponse, MediaType.APPLICATION_JSON));

        OwnedGamesResponse.Response response = steamService.getOwnedGames(testSteamId);
        assertThat(response).isNotNull();
        assertThat(response.game_count()).isEqualTo(1);
        assertThat(response.games()).isNotEmpty();

        mockServer.verify();
    }

    @Test
    void getAchievements_returnsPlayerstats() {
        String jsonResponse = """
            {
              "playerstats": {
                "steamID": "%s",
                "gameName": "TestGame",
                "achievements": [
                  {
                    "apiname": "ACH_1",
                    "achieved": 1,
                    "name": "Achievement1",
                    "description": "Desc"
                  }
                ]
              }
            }
        """.formatted(testSteamId);

        mockServer.expect(requestTo("https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=FAKE_KEY&steamid=" + testSteamId + "&appid=" + testAppId))
                .andRespond(withSuccess(jsonResponse, MediaType.APPLICATION_JSON));

        PlayerAchievementsResponse.Playerstats stats = steamService.getAchievements(testSteamId, testAppId);
        assertThat(stats).isNotNull();
        assertThat(stats.steamID()).isEqualTo(testSteamId);
        assertThat(stats.achievements()).isNotEmpty();

        mockServer.verify();
    }

    @Test
    void getGameSchema_returnsGame() {
        String jsonResponse = """
            {
              "game": {
                "gameName": "TestGame",
                "availableGameStats": {
                  "achievements": [
                    {
                      "name": "ACH_1",
                      "defaultvalue": "0",
                      "displayName": "Achievement1",
                      "description": "Desc",
                      "icon": "icon",
                      "icongray": "icongray",
                      "hidden": 0
                    }
                  ]
                }
              }
            }
        """;

        mockServer.expect(requestTo("https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=FAKE_KEY&appid=" + testAppId))
                .andRespond(withSuccess(jsonResponse, MediaType.APPLICATION_JSON));

        GameSchemaResponse.Game game = steamService.getGameSchema(testAppId);
        assertThat(game).isNotNull();
        assertThat(game.gameName()).isEqualTo("TestGame");
        assertThat(game.availableGameStats().achievements()).isNotEmpty();

        mockServer.verify();
    }
}
