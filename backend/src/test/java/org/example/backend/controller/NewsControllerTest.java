package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.model.GameSpotNews;
import org.example.backend.model.GameSpotNews.Image;
import org.example.backend.model.GameSpotNews.Category;
import org.example.backend.model.GameSpotNews.Association;
import org.example.backend.repo.GameSpotNewsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class NewsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GameSpotNewsRepository repository;

    @Autowired
    private ObjectMapper objectMapper;

    private GameSpotNews testNews;

    @BeforeEach
    void setUp() {
        repository.deleteAll();

        testNews = new GameSpotNews(
                12345,
                "Test Title",
                "Test Author",
                "This is a deck",
                "Body content",
                "Lede content",
                "2025-09-18 03:16:00",
                "2025-09-18 03:20:00",
                "https://www.gamespot.com/test-article",
                new Image(
                        "tiny.jpg",
                        "screen.jpg",
                        "small.jpg",
                        "original.jpg"
                ),
                List.of(new Category(1, "Games")),
                List.of(new Association(100, "PC", "https://api.gamespot.com/test", "guid-123"))
        );

        repository.save(testNews);
    }

    @Test
    void getList_shouldReturnNews() throws Exception {
        mockMvc.perform(get("/api/news/getList")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(12345))
                .andExpect(jsonPath("$[0].title").value("Test Title"))
                .andExpect(jsonPath("$[0].authors").value("Test Author"))
                .andExpect(jsonPath("$[0].image.original").value("original.jpg"))
                .andExpect(jsonPath("$[0].categories[0].name").value("Games"))
                .andExpect(jsonPath("$[0].associations[0].name").value("PC"));
    }

    @Test
    void getList_shouldReturnEmptyList_whenNoNews() throws Exception {
        repository.deleteAll();

        mockMvc.perform(get("/api/news/getList")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}
