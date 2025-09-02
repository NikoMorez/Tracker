package org.example.backend.service;

import org.example.backend.model.User;
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
        // given
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("plainpass")).thenReturn("encodedpass");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        // when
        User result = userService.register("testuser", "plainpass", "test@test.com");

        // then
        assertEquals("testuser", result.username());
        assertEquals("encodedpass", result.password());
        assertEquals("test@test.com", result.email());
        assertEquals("USER", result.role());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_throwsException_whenUsernameAlreadyExists() {
        // given
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(mock(User.class)));

        // when / then
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> userService.register("testuser", "plainpass", "test@test.com"));

        assertEquals("Username already exists", ex.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void findByUsername_returnsUser_whenExists() {
        // given
        User user = new User("1", "testuser", "pass", "test@test.com", "USER", Map.of(), Map.of());
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        // when
        Optional<User> result = userService.findByUsername("testuser");

        // then
        assertTrue(result.isPresent());
        assertEquals("testuser", result.get().username());
    }

    @Test
    void findByUsername_returnsEmpty_whenNotExists() {
        // given
        when(userRepository.findByUsername("nouser")).thenReturn(Optional.empty());

        // when
        Optional<User> result = userService.findByUsername("nouser");

        // then
        assertTrue(result.isEmpty());
    }

    @Test
    void updateServiceNames_successful() {
        // given
        User existing = new User("1", "testuser", "pass", "mail@test.com", "USER", Map.of(), Map.of());
        when(userRepository.findById("1")).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        Map<String, String> newServices = Map.of("spotify", "myAccount");

        // when
        User updated = userService.updateServiceNames("1", newServices);

        // then
        assertEquals("myAccount", updated.serviceNames().get("spotify"));
        assertEquals("testuser", updated.username());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void updateServiceNames_throwsException_whenUserNotFound() {
        // given
        when(userRepository.findById("999")).thenReturn(Optional.empty());

        // when / then
        assertThrows(RuntimeException.class,
                () -> userService.updateServiceNames("999", Map.of("spotify", "acc")));
    }

    @Test
    void updatePageConfig_successful() {
        // given
        User existing = new User("1", "testuser", "pass", "mail@test.com", "USER", Map.of(), Map.of());
        when(userRepository.findById("1")).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        Map<String, Map<String, String>> newPageConfig = Map.of(
                "dashboard", Map.of("theme", "dark")
        );

        // when
        User updated = userService.updatePageConfig("1", newPageConfig);

        // then
        assertEquals("dark", updated.pageConfig().get("dashboard").get("theme"));
        assertEquals("testuser", updated.username());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void updatePageConfig_throwsException_whenUserNotFound() {
        // given
        when(userRepository.findById("999")).thenReturn(Optional.empty());

        // when / then
        assertThrows(RuntimeException.class,
                () -> userService.updatePageConfig("999", Map.of("dashboard", Map.of("theme", "dark"))));
    }
}
