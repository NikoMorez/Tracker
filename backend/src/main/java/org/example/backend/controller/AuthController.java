package org.example.backend.controller;

import org.example.backend.model.Region;
import org.example.backend.model.User;
import org.example.backend.model.UserIdentity;
import org.example.backend.model.UserProfile;
import org.example.backend.repo.UserRepository;
import org.example.backend.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> creds) {
        String username = creds.get("username");
        String password = creds.get("password");

        var user = userRepository.findByIdentityUsername(username).orElse(null);
        if (user != null && passwordEncoder.matches(password, user.identity().password())) {
            String token = jwtService.generateToken(user.identity().username());
            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, String> creds) {
        String username = creds.get("username");
        String password = creds.get("password");
        String email = creds.get("email");

        if (userRepository.findByIdentityUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Username exists"));
        }


        var newUser = new User(
                null,
                new UserIdentity(username, passwordEncoder.encode(password), email, "USER"),
                Region.NotDefined,
                new UserProfile(
                        username,
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        Map.of(),
                        Map.of()
                )
        );

        userRepository.save(newUser);

        String token = jwtService.generateToken(newUser.identity().username());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/me")
    public ResponseEntity<User> me(@RequestHeader(value="Authorization", required=false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.substring(7);
        if (!jwtService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = jwtService.extractUsername(token);
        return userRepository.findByIdentityUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
