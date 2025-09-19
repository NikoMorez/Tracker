package org.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "gamespot_news")
public record GameSpotNews(
        @Id int id,
        String title,
        String authors,
        String deck,
        String body,
        String lede,
        String publishDate,
        String updateDate,
        String siteDetailUrl,
        Image image,
        List<Category> categories,
        List<Association> associations
) {

    public record Image(
            String squareTiny,
            String screenTiny,
            String squareSmall,
            String original
    ) {}

    public record Category(
            int id,
            String name
    ) {}

    public record Association(
            int id,
            String name,
            String apiDetailUrl,
            String guid
    ) {}
}
