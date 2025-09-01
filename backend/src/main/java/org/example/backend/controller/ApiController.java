package org.example.backend.controller;

import org.example.backend.model.User;
import org.example.backend.service.SteamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class ApiController {

    /*
    private final SteamService SteamService;

    public ApiController(SteamService steamService) {
        this.SteamService = steamService;
    }

    @GetMapping
    public ResponseEntity<> getAllUsers() {
        return ResponseEntity.ok().build();
    }

    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById() {
            return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<User> addUser() {

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser() {
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
       return ResponseEntity.ok().build();

    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUser(@RequestParam String query) {
        return ResponseEntity.ok().body();
    }

     */
}