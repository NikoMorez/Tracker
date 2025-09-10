package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.model.*;
import org.example.backend.repo.UserRepository;
import org.example.backend.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtService jwtService;

    private User testUser;
    private String token;

    @BeforeEach
    void setUp() {
        testUser = new User(
                null,
                new UserIdentity("testuser", "password", "test@test.com", "USER"),
                Region.NotDefined,
                new UserProfile(
                        "shownTest",
                        "avatar.jpg",
                        "bio text",
                        "black",
                        "bg.jpg",
                        "white",
                        "bgSmall.jpg",
                        Map.of("service1", new ServiceData("https://service1.com", true, 0)),
                        Map.of()
                )
        );
        testUser = userRepository.save(testUser);
        token = jwtService.generateToken(testUser.identity().username());
    }

    @Test
    void createUser_shouldReturn201() throws Exception {
        User newUser = new User(
                null,
                new UserIdentity("newuser", "newpass", "new@test.com", "USER"),
                Region.USA,
                new UserProfile(
                        "shownNew",
                        "avatar.png",
                        "bio new",
                        "black",
                        "bg.png",
                        "white",
                        "bgSmall.png",
                        Map.of(),
                        Map.of()
                )
        );

        mockMvc.perform(post("/api/users")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newUser)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.identity.username").value("newuser"))
                .andExpect(jsonPath("$.identity.email").value("new@test.com"));
    }

    @Test
    void getAllUsers_shouldReturnList() throws Exception {
        mockMvc.perform(get("/api/users").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].identity.username").value("testuser"));
    }

    @Test
    void getUserById_shouldReturnUser() throws Exception {
        String id = testUser.id();

        mockMvc.perform(get("/api/users/" + id).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.identity.username").value("testuser"));
    }

    @Test
    void updateUser_shouldReturnUpdatedUser() throws Exception {
        String id = testUser.id();

        User updated = new User(
                id,
                new UserIdentity("updateduser", "newpass", "updated@test.com", "ADMIN"),
                Region.EUROPE,
                new UserProfile(
                        "shownUpdated",
                        "avatarUpdated.jpg",
                        "new bio",
                        "blue",
                        "bgUpdated.jpg",
                        "yellow",
                        "bgSmallUpdated.jpg",
                        Map.of("spotify", new ServiceData("https://spotify.com/me", true, 0)),
                        Map.of()
                )
        );

        mockMvc.perform(put("/api/users/" + id).header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.identity.username").value("updateduser"))
                .andExpect(jsonPath("$.identity.email").value("updated@test.com"))
                .andExpect(jsonPath("$.identity.role").value("ADMIN"))
                .andExpect(jsonPath("$.userProfile.serviceNames.spotify.url").value("https://spotify.com/me"));
    }
}
