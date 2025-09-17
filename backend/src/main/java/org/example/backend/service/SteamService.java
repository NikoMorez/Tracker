package org.example.backend.service;

import org.example.backend.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class SteamService {

    private final RestClient restClient;
    private final String apiKey;

    public SteamService(@Value("${steam.api-key}") String apiKey) {
        this.apiKey = apiKey;
        this.restClient = RestClient.builder()
                .baseUrl("https://api.steampowered.com")
                .build();
    }

    public PlayerSummaryResponse.Player getProfile(String steamId) {
        PlayerSummaryResponse response = restClient.get()
                .uri("/ISteamUser/GetPlayerSummaries/v2/?key={key}&steamids={id}", apiKey, steamId)
                .retrieve()
                .body(PlayerSummaryResponse.class);

        if (response != null && !response.response().players().isEmpty()) {
            return response.response().players().getFirst();
        }
        return null;
    }

    public OwnedGamesResponse.Response getOwnedGames(String steamId) {
        OwnedGamesResponse response = restClient.get()
                .uri("/IPlayerService/GetOwnedGames/v1/?key={key}&steamid={id}&include_appinfo=1", apiKey, steamId)
                .retrieve()
                .body(OwnedGamesResponse.class);

        return response != null ? response.response() : null;
    }

    public PlayerAchievementsResponse.Playerstats getAchievements(String steamId, int appId) {
        PlayerAchievementsResponse response = restClient.get()
                .uri("/ISteamUserStats/GetPlayerAchievements/v1/?key={key}&steamid={id}&appid={appId}",
                        apiKey, steamId, appId)
                .retrieve()
                .body(PlayerAchievementsResponse.class);

        return response != null ? response.playerstats() : null;
    }

    public GameSchemaResponse.Game getGameSchema(int appId) {
        GameSchemaResponse response = restClient.get()
                .uri("/ISteamUserStats/GetSchemaForGame/v2/?key={key}&appid={appId}", apiKey, appId)
                .retrieve()
                .body(GameSchemaResponse.class);

        return response != null ? response.game() : null;
    }

}