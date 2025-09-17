package org.example.backend.controller;

import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class SteamOAuthControllerTest {

    private UserService userService;
    private SteamOAuthController controller;
    private HttpServletResponse response;

    private final String frontendUrl = "http://localhost:3000";

    @BeforeEach
    void setUp() {
        userService = mock(UserService.class);
        response = mock(HttpServletResponse.class);
        controller = new SteamOAuthController(userService, frontendUrl);
    }

    @Test
    void redirectToSteam_sendsRedirectToSteamLogin() throws IOException {
        String userId = "123";
        controller.redirectToSteam(userId, response);

        ArgumentCaptor<String> urlCaptor = ArgumentCaptor.forClass(String.class);
        verify(response).sendRedirect(urlCaptor.capture());

        String redirectUrl = urlCaptor.getValue();

        assertEquals(true, redirectUrl.contains("https://steamcommunity.com/openid/login"));
        assertEquals(true, redirectUrl.contains("userId=" + userId));
    }

    @Test
    void handleSteamCallback_linksSteamAccount_andRedirects() throws IOException {
        String userId = "123";
        String steamIdentity = "http://steamcommunity.com/openid/id/76561198000000000";

        User mockUser = mock(User.class);
        when(userService.linkSteamAccount(eq(userId), anyString(), anyString(), anyString()))
                .thenReturn(mockUser);

        controller.handleSteamCallback(steamIdentity, userId, response);


        verify(userService).linkSteamAccount(userId, "76561198000000000", "", "");


        verify(response).sendRedirect(frontendUrl + "/user/settings#Account%20Links");
    }
}
