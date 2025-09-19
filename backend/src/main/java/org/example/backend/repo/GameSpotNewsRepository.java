package org.example.backend.repo;

import org.example.backend.model.GameSpotNews;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameSpotNewsRepository extends MongoRepository<GameSpotNews, Integer> {}
