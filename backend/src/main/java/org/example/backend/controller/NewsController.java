package org.example.backend.controller;

import org.example.backend.model.GameSpotNews;
import org.example.backend.service.GameSpotService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final GameSpotService service;

    public NewsController(GameSpotService service) {
        this.service = service;
    }

    @GetMapping("/getList")
    public List<GameSpotNews> getAllNews() {
        return service.getAllNews();
    }
}