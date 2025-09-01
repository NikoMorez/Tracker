package org.example.backend.service;

import org.example.backend.model.User;
import org.example.backend.repo.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public void createUser(String name, int age) {
        repo.save(new User(null, name, age));
    }
}