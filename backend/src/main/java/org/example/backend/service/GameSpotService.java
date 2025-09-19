package org.example.backend.service;

import org.example.backend.model.GameSpotNews;
import org.example.backend.model.GameSpotResponse;
import org.example.backend.repo.GameSpotNewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameSpotService {

    private final GameSpotClient client;
    private final GameSpotNewsRepository repository;

    public GameSpotService(GameSpotClient client, GameSpotNewsRepository repository) {
        this.client = client;
        this.repository = repository;
    }

    public void fetchAndStoreNews() {
        GameSpotResponse response = client.fetchArticles(10);

        if (response != null && response.results() != null) {
            for (var article : response.results()) {

                if (!repository.existsById(article.id())) {
                    GameSpotNews news = new GameSpotNews(
                            article.id(),
                            article.title(),
                            article.authors(),
                            article.deck(),
                            "",
                            article.lede(),
                            article.publish_date(),
                            article.update_date(),
                            article.site_detail_url(),
                            new GameSpotNews.Image(
                                    article.image().square_tiny(),
                                    article.image().screen_tiny(),
                                    article.image().square_small(),
                                    article.image().original()
                            ),
                            article.categories().stream()
                                    .map(c -> new GameSpotNews.Category(c.id(), c.name()))
                                    .toList(),
                            article.associations().stream()
                                    .map(a -> new GameSpotNews.Association(a.id(), a.name(), a.api_detail_url(), a.guid()))
                                    .toList()
                    );

                    repository.save(news);
                }
            }
        }
    }

    public List<GameSpotNews> getAllNews() {
        return repository.findAll();
    }
}
