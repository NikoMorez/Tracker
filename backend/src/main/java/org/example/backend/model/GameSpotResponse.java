package org.example.backend.model;

import java.util.List;


public record GameSpotResponse(
        String error,
        int limit,
        int offset,
        int number_of_page_results,
        List<GameSpotArticle> results
) {}
