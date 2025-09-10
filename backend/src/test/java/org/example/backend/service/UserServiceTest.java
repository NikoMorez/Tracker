package org.example.backend.service;

import org.example.backend.model.*;
import org.example.backend.repo.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private UserService userService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        userService = new UserService(userRepository, passwordEncoder);
    }

    @Test
    void register_successful_whenUsernameNotExists() {
        when(userRepository.findByIdentityUsername("testuser")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("plainpass")).thenReturn("encodedpass");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        User result = userService.register("testuser", "plainpass", "test@test.com");

        assertEquals("testuser", result.identity().username());
        assertEquals("encodedpass", result.identity().password());
        assertEquals("test@test.com", result.identity().email());
        assertEquals("USER", result.identity().role());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void findByUsername_returnsUser_whenExists() {
        User user = new User("1",
                new UserIdentity("testuser", "pass", "test@test.com", "USER"),
                Region.USA,
                new UserProfile("shown", "a", "b", "c", "d", "e", "f", Map.of(), Map.of()));
        when(userRepository.findByIdentityUsername("testuser")).thenReturn(Optional.of(user));

        Optional<User> result = userService.findByUsername("testuser");

        assertTrue(result.isPresent());
        assertEquals("testuser", result.get().identity().username());
    }

    @Test
    void updateServiceNames_successful() {
        User existing = new User("1",
                new UserIdentity("testuser", "pass", "mail@test.com", "USER"),
                Region.ASIA,
                new UserProfile("shown", "a", "b", "c", "d", "e", "f", Map.of(), Map.of()));
        when(userRepository.findById("1")).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        Map<String, ServiceData> newServices = Map.of("spotify", new ServiceData("https://spotify.com/me", true, 0));

        User updated = userService.updateServiceNames("1", newServices);

        assertEquals("https://spotify.com/me", updated.userProfile().serviceNames().get("spotify").url());
        assertTrue(updated.userProfile().serviceNames().get("spotify").visible());
    }

    @Test
    void updatePageConfig_successful() {
        User existing = new User("1",
                new UserIdentity("testuser", "pass", "mail@test.com", "USER"),
                Region.EUROPE,
                new UserProfile("shown", "a", "b", "c", "d", "e", "f", Map.of(), Map.of()));
        when(userRepository.findById("1")).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        Map<String, Map<String, String>> newPageConfig = Map.of("dashboard", Map.of("theme", "dark"));

        User updated = userService.updatePageConfig("1", newPageConfig);

        assertEquals("dark", updated.userProfile().pageConfig().get("dashboard").get("theme"));
    }
}
