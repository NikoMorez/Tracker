package org.example.backend.service;

import org.example.backend.model.*;
import org.example.backend.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

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
                Region.NotDefined,
                new UserProfile(
                        username,
                        "",
                        "",
                        "#000000",
                        "",
                        "#000000",
                        "",
                        Map.of(),
                        Map.of()
                )
        );

        return userRepository.save(newUser);
    }


    public Optional<User> findByUsername(String username) {
        return userRepository.findByIdentityUsername(username);
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
                        user.userProfile().pageConfig()
                )
        );

        return userRepository.save(updatedUser);
    }



    public User updatePageConfig(String userId, Map<String, Map<String, String>> pageConfig) {
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
                        pageConfig
                )
        );

        return userRepository.save(updatedUser);
    }
}
