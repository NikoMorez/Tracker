package org.example.backend.model;

import java.util.ArrayList;
import java.util.Map;

public record UserProfile(
        String shownUsername,
        String avatar,
        String bio,
        String textColor,
        String backgroundImage,
        String textColorSmall,
        String backgroundImageSmall,
        Map<String, ServiceData> serviceNames,
        ArrayList<GameConfig> pageConfig,
        FavoriteItem favoriteItem
) {}
