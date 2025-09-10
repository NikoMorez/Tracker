package org.example.backend.controller;

import org.example.backend.model.User;
import org.example.backend.model.UserIdentity;
import org.example.backend.model.UserProfile;
import org.example.backend.repo.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class ApiController {

    private final UserRepository userRepository;

    public ApiController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (userRepository.findByIdentityUsername(user.identity().username()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(existing -> {

                    User user = new User(
                            existing.id(),

                            new UserIdentity(
                                    updatedUser.identity().username(),
                                    updatedUser.identity().password(),
                                    updatedUser.identity().email(),
                                    updatedUser.identity().role()
                            ),
                            existing.region(),

                            new UserProfile(
                                    updatedUser.userProfile().shownUsername(),
                                    updatedUser.userProfile().avatar(),
                                    updatedUser.userProfile().bio(),
                                    updatedUser.userProfile().textColor(),
                                    updatedUser.userProfile().backgroundImage(),
                                    updatedUser.userProfile().textColorSmall(),
                                    updatedUser.userProfile().backgroundImageSmall(),
                                    updatedUser.userProfile().serviceNames(),
                                    updatedUser.userProfile().pageConfig()
                            )
                    );
                    userRepository.save(user);
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
