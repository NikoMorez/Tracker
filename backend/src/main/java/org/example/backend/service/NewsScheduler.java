package org.example.backend.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class NewsScheduler {

    private final GameSpotService service;

    public NewsScheduler(GameSpotService service) {
        this.service = service;
    }

    @Scheduled(fixedRate = 1800000) // 30 min
    public void updateNews() {
        service.fetchAndStoreNews();
    }
}
