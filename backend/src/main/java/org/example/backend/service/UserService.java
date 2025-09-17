package org.example.backend.service;

import org.example.backend.model.*;
import org.example.backend.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public User register(String username, String password, String email) {
        if (userRepository.findByIdentityUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User newUser = new User(
                null,
                new UserIdentity(username, passwordEncoder.encode(password), email, "USER"),
                Region.NOTDEFINED,
                new UserProfile(
                        username,
                        "",
                        "",
                        "#000000",
                        "",
                        "#000000",
                        "",
                        Map.of(),
                        new ArrayList<>(),
                       new FavoriteItem("","","")
                )
        );

        return userRepository.save(newUser);
    }


    public User linkSteamAccount(String userId, String steamId, String oauthToken, String refreshToken) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, ServiceData> services = new HashMap<>(user.userProfile().serviceNames());
        services.put("Steam", new ServiceData(
                "https://steamcommunity.com/profiles/" + steamId,
                true,
                services.size(),
                steamId,
                oauthToken,
                refreshToken
        ));

        User updated = new User(
                user.id(),
                user.identity(),
                user.region(),
                new UserProfile(
                        user.userProfile().shownUsername(),
                        user.userProfile().avatar(),
                        user.userProfile().bio(),
                        user.userProfile().textColor(),
                        user.userProfile().backgroundImage(),
                        user.userProfile().textColorSmall(),
                        user.userProfile().backgroundImageSmall(),
                        services,
                        user.userProfile().pageConfig(),
                        user.userProfile().favoriteItem()
                )
        );

        return userRepository.save(updated);
    }




    public User updateServiceNames(String userId, Map<String, ServiceData> serviceNames) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User updatedUser = new User(
                user.id(),
                user.identity(),
                user.region(),
                new UserProfile(
                        user.userProfile().shownUsername(),
                        user.userProfile().avatar(),
                        user.userProfile().bio(),
                        user.userProfile().textColor(),
                        user.userProfile().backgroundImage(),
                        user.userProfile().textColorSmall(),
                        user.userProfile().backgroundImageSmall(),
                        serviceNames,
                        user.userProfile().pageConfig(),
                        user.userProfile().favoriteItem()
                )
        );

        return userRepository.save(updatedUser);
    }



    public User updatePageConfig(String userId, ArrayList<GameConfig> pageConfig) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User updatedUser = new User(
                user.id(),
                user.identity(),
                user.region(),
                new UserProfile(
                        user.userProfile().shownUsername(),
                        user.userProfile().avatar(),
                        user.userProfile().bio(),
                        user.userProfile().textColor(),
                        user.userProfile().backgroundImage(),
                        user.userProfile().textColorSmall(),
                        user.userProfile().backgroundImageSmall(),
                        user.userProfile().serviceNames(),
                        pageConfig,
                        user.userProfile().favoriteItem()
                )
        );

        return userRepository.save(updatedUser);
    }
}
