package org.example.backend.service;

import org.example.backend.model.GameSpotResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class GameSpotClient {

    private static final String BASE_URL = "https://www.gamespot.com/api/articles/";

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${gamespot.api.key}")
    private String apiKey;

    public GameSpotResponse fetchArticles(int limit) {

        String url = BASE_URL + "?api_key=" + apiKey + "&format=json&limit=" + limit +"&sort=publish_date:desc";


        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "KAGENONEWS");


        HttpEntity<Void> entity = new HttpEntity<>(headers);


        ResponseEntity<GameSpotResponse> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                GameSpotResponse.class
        );

        return response.getBody();
    }
}
