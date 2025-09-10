package org.example.backend.model;

import org.springframework.data.annotation.Id;


public record User(
        @Id String id,
        UserIdentity identity,
        Region region,
        UserProfile userProfile
) {}


