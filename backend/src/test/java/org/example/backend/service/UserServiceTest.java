package org.example.backend.service;

import org.example.backend.model.*;
import org.example.backend.repo.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserRepository userRepository;
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        userService = new UserService(userRepository, mock(org.springframework.security.crypto.password.PasswordEncoder.class));

        user = new User(
                "user1",
                new UserIdentity("testuser", "encodedPassword", "test@test.com", "USER"),
                Region.NOTDEFINED,
                new UserProfile(
                        "shownTest",
                        "avatar.jpg",
                        "bio text",
                        "black",
                        "bg.jpg",
                        "white",
                        "bgSmall.jpg",
                        new HashMap<>(),
                        new ArrayList<>(),
                        new FavoriteItem("", "", "")
                )
        );

        when(userRepository.findById("user1")).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
    }

    @Test
    void updatePageConfig_replacesPageConfig() {
        ArrayList<GameConfig> newConfig = new ArrayList<>();
        newConfig.add(new GameConfig("Steam", "123", "GameName", "icon.png", true, 0, 10, new ArrayList<>()));

        User updated = userService.updatePageConfig("user1", newConfig);

        assertEquals(1, updated.userProfile().pageConfig().size());
        assertEquals("GameName", updated.userProfile().pageConfig().getFirst().gameName());
    }

    @Test
    void updateServiceNames_replacesServices() {
        Map<String, ServiceData> newServices = new HashMap<>();
        newServices.put("Steam", new ServiceData("url", true, 0, "123", "token", "refresh"));

        User updated = userService.updateServiceNames("user1", newServices);

        assertEquals(1, updated.userProfile().serviceNames().size());
        assertTrue(updated.userProfile().serviceNames().containsKey("Steam"));
    }

    @Test
    void linkSteamAccount_addsSteamService() {
        User updated = userService.linkSteamAccount("user1", "123", "token", "refresh");

        assertEquals(1, updated.userProfile().serviceNames().size());
        ServiceData steamData = updated.userProfile().serviceNames().get("Steam");
        assertNotNull(steamData);
        assertEquals("123", steamData.externalId());
        assertEquals("token", steamData.oauthToken());
        assertEquals("refresh", steamData.refreshToken());
    }
}
