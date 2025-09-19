package org.example.backend.model;

import java.util.List;

public record GameSpotArticle(
        int id,
        String title,
        String authors,
        String deck,
        String body,
        String lede,
        String publish_date,
        String update_date,
        String site_detail_url,
        Image image,
        List<Category> categories,
        List<Association> associations
) {

    public record Image(
            String square_tiny,
            String screen_tiny,
            String square_small,
            String original
    ) {}

    public record Category(
            int id,
            String name
    ) {}

    public record Association(
            int id,
            String name,
            String api_detail_url,
            String guid
    ) {}
}
