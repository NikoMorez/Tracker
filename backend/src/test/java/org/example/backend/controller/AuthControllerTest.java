package org.example.backend.controller;

import org.example.backend.model.User;
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

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;


    private String token;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        User user = new User(
                null,
                "testuser",
                passwordEncoder.encode("secret"),
                "test@test.com",
                "USER",
                Map.of(),
                Map.of()
        );
        userRepository.save(user);

        token = jwtService.generateToken("testuser");
    }

    @Test
    void getMe_returnsAppUserFromDb() throws Exception {
        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().string("testuser"));
    }

    @Test
    void getMe_returns401_whenNoToken() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void register_createsNewUser_andReturnsToken() throws Exception {
        // Given
        String body = """
                {
                  "username": "newuser",
                  "password": "mypassword",
                  "email": "new@test.com"
                }
                """;

        // When / Then
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }

    @Test
    void register_fails_whenUsernameExists() throws Exception {
        // Given
        String body = """
                {
                  "username": "testuser",
                  "password": "anotherpw",
                  "email": "dupe@test.com"
                }
                """;

        // When / Then
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Username exists"));
    }

    @Test
    void login_returnsToken_whenCredentialsCorrect() throws Exception {
        // Given
        String body = """
                {
                  "username": "testuser",
                  "password": "secret"
                }
                """;

        // When / Then
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }

    @Test
    void login_fails_whenWrongPassword() throws Exception {
        // Given
        String body = """
                {
                  "username": "testuser",
                  "password": "wrong"
                }
                """;

        // When / Then
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isUnauthorized());
    }




}