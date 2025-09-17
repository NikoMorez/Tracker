package org.example.backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/oauth/steam")
public class SteamOAuthController {

    private final UserService userService;
    private final String frontendUrl;



    @Autowired
    public SteamOAuthController(UserService userService, @Value("${app.frontend.url}") String frontendUrl) {
        this.userService = userService;
        this.frontendUrl = frontendUrl;
    }

    @GetMapping("/login")
    public void redirectToSteam(
            @RequestParam("userId") String userId,
            HttpServletResponse response
    ) throws IOException {
        String returnTo = frontendUrl + "/api/oauth/steam/callback?userId=" + userId;

        String steamUrl =
                "https://steamcommunity.com/openid/login" +
                        "?openid.ns=http://specs.openid.net/auth/2.0" +
                        "&openid.mode=checkid_setup" +
                        "&openid.return_to=" + returnTo +
                        "&openid.realm=" + frontendUrl +
                        "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select" +
                        "&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select";

        response.sendRedirect(steamUrl);
    }

    @GetMapping("/callback")
    public void handleSteamCallback(
            @RequestParam("openid.identity") String identity,
            @RequestParam("userId") String userId,
            HttpServletResponse response
    ) throws IOException {

        String steamId = identity.substring(identity.lastIndexOf("/") + 1);


        User updated = userService.linkSteamAccount(
                userId,
                steamId,
                "",
                ""
        );


        response.sendRedirect(frontendUrl + "/user/settings#Account%20Links");
    }
}
