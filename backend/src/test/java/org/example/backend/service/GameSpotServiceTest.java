package org.example.backend.service;

import org.example.backend.model.GameSpotArticle;
import org.example.backend.model.GameSpotNews;
import org.example.backend.model.GameSpotResponse;
import org.example.backend.repo.GameSpotNewsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class GameSpotServiceTest {

    private GameSpotClient client;
    private GameSpotNewsRepository repository;
    private GameSpotService service;

    @BeforeEach
    void setUp() {
        client = mock(GameSpotClient.class);
        repository = mock(GameSpotNewsRepository.class);
        service = new GameSpotService(client, repository);
    }

    @Test
    void fetchAndStoreNews_shouldSaveNewArticles() {

        GameSpotArticle.Image image = new GameSpotArticle.Image(
                "tiny.png", "screen.png", "small.png", "original.png"
        );

        GameSpotArticle.Category category =
                new GameSpotArticle.Category(1, "Action");
        GameSpotArticle.Association association =
                new GameSpotArticle.Association(10, "Halo", "api/url", "guid-123");

        GameSpotArticle article = new GameSpotArticle(
                123,
                "Cool Game Released",
                "John Doe",
                "Deck text",
                "body text",
                "lede text",
                "2025-01-01",
                "2025-01-02",
                "https://gamespot.com/article/123",
                image,
                List.of(category),
                List.of(association)
        );

        GameSpotResponse response = new GameSpotResponse(
                null,
                10,
                0,
                1,
                List.of(article)
        );

        when(client.fetchArticles(10)).thenReturn(response);
        when(repository.existsById(123)).thenReturn(false);


        service.fetchAndStoreNews();


        ArgumentCaptor<GameSpotNews> captor = ArgumentCaptor.forClass(GameSpotNews.class);
        verify(repository).save(captor.capture());
        GameSpotNews saved = captor.getValue();

        assertThat(saved.id()).isEqualTo(123);
        assertThat(saved.title()).isEqualTo("Cool Game Released");
        assertThat(saved.image().original()).isEqualTo("original.png");
        assertThat(saved.categories()).hasSize(1);
        assertThat(saved.associations()).hasSize(1);
    }

    @Test
    void fetchAndStoreNews_shouldNotSaveDuplicateArticles() {

        GameSpotArticle article = new GameSpotArticle(
                123,
                "Duplicate",
                "Jane",
                "deck",
                "body",
                "lede",
                "2025-01-01",
                "2025-01-01",
                "url",
                new GameSpotArticle.Image("a", "b", "c", "d"),
                List.of(),
                List.of()
        );

        GameSpotResponse response = new GameSpotResponse(
                null,
                10,
                0,
                1,
                List.of(article)
        );

        when(client.fetchArticles(10)).thenReturn(response);
        when(repository.existsById(123)).thenReturn(true);


        service.fetchAndStoreNews();


        verify(repository, never()).save(any());
    }

    @Test
    void getAllNews_shouldReturnListFromRepository() {

        GameSpotNews news = new GameSpotNews(
                123,
                "Test News",
                "Author",
                "deck",
                "body",
                "lede",
                "2025-01-01",
                "2025-01-02",
                "url",
                new GameSpotNews.Image("a", "b", "c", "d"),
                List.of(),
                List.of()
        );

        when(repository.findAll()).thenReturn(List.of(news));


        List<GameSpotNews> result = service.getAllNews();

        assertThat(result).hasSize(1);
        assertThat(result.getFirst().title()).isEqualTo("Test News");
    }
}
