package org.example.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
    }

    @Test
    void generateToken_and_extractUsername_shouldReturnSameUsername() {
        // given
        String username = "testuser";

        // when
        String token = jwtService.generateToken(username);
        String extractedUsername = jwtService.extractUsername(token);

        // then
        assertThat(extractedUsername).isEqualTo(username);
    }

    @Test
    void validateToken_shouldReturnTrue_forValidToken() {
        // given
        String username = "testuser";
        String token = jwtService.generateToken(username);

        // when
        boolean isValid = jwtService.validateToken(token);

        // then
        assertThat(isValid).isTrue();
    }

    @Test
    void validateToken_shouldReturnFalse_forManipulatedToken() {
        // given
        String username = "testuser";
        String token = jwtService.generateToken(username);
        String manipulatedToken = token + "abc";

        // when
        boolean isValid = jwtService.validateToken(manipulatedToken);

        // then
        assertThat(isValid).isFalse();
    }

    @Test
    void validateToken_shouldReturnFalse_forExpiredToken() {
        // given
        String username = "expiredUser";

        JwtService shortLivedJwt = new JwtService() {
            @Override
            public String generateToken(String username) {
                return io.jsonwebtoken.Jwts.builder()
                        .setSubject(username)
                        .setIssuedAt(new java.util.Date())
                        .setExpiration(new java.util.Date(System.currentTimeMillis() - 1000)) // abgelaufen
                        .signWith(this.key)
                        .compact();
            }
        };

        String expiredToken = shortLivedJwt.generateToken(username);

        // when
        boolean isValid = shortLivedJwt.validateToken(expiredToken);

        // then
        assertThat(isValid).isFalse();
    }
}
