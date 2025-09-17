package org.example.backend.controller;

import org.example.backend.model.*;
import org.example.backend.repo.UserRepository;
import org.example.backend.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    private String token;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();

        User testUser = new User(
                null,
                new UserIdentity("testuser", passwordEncoder.encode("secret"), "test@test.com", "USER"),
                Region.NOTDEFINED,
                new UserProfile(
                        "shownTest",
                        "avatar.jpg",
                        "bio text",
                        "black",
                        "bg.jpg",
                        "white",
                        "bgSmall.jpg",
                        Map.of(),
                        new ArrayList<>(),
                        new FavoriteItem("", "", "")
                )
        );

        testUser = userRepository.save(testUser);
        token = jwtService.generateToken(testUser.identity().username());
    }

    @Test
    void login_returnsToken_whenCredentialsCorrect() throws Exception {
        String body = """
                {
                  "username": "testuser",
                  "password": "secret"
                }
                """;

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }

    @Test
    void login_returnsUnauthorized_whenCredentialsIncorrect() throws Exception {
        String body = """
                {
                  "username": "testuser",
                  "password": "wrongpassword"
                }
                """;

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void register_createsNewUser_andReturnsToken() throws Exception {
        String body = """
                {
                  "username": "newuser",
                  "password": "mypassword",
                  "email": "new@test.com"
                }
                """;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }

    @Test
    void register_returnsBadRequest_whenUsernameExists() throws Exception {
        String body = """
                {
                  "username": "testuser",
                  "password": "secret",
                  "email": "test@test.com"
                }
                """;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Username exists"));
    }

    @Test
    void getMe_returnsAppUserFromDb() throws Exception {
        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.identity.username").value("testuser"))
                .andExpect(jsonPath("$.identity.email").value("test@test.com"));
    }

    @Test
    void getMe_returnsUnauthorized_whenNoToken() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void getMe_returnsUnauthorized_whenInvalidToken() throws Exception {
        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer invalidtoken"))
                .andExpect(status().isUnauthorized());
    }
}
