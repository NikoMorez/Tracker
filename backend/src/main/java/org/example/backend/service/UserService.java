package org.example.backend.service;

import org.example.backend.model.User;
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
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User newUser = new User(
                null,
                username,
                passwordEncoder.encode(password),
                email,
                "USER",
                Map.of(),
                Map.of()
        );

        return userRepository.save(newUser);
    }


    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    public User updateServiceNames(String userId, Map<String, String> serviceNames) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User updatedUser = new User(
                user.id(),
                user.username(),
                user.password(),
                user.email(),
                user.role(),
                serviceNames,
                user.pageConfig()
        );

        return userRepository.save(updatedUser);
    }


    public User updatePageConfig(String userId, Map<String, Map<String, String>> pageConfig) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User updatedUser = new User(
                user.id(),
                user.username(),
                user.password(),
                user.email(),
                user.role(),
                user.serviceNames(),
                pageConfig
        );

        return userRepository.save(updatedUser);
    }
}