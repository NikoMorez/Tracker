package org.example.backend.model;

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
        Map<String, Map<String, String>> pageConfig
) {}
