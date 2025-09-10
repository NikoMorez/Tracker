package org.example.backend.repo;

import org.example.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    @Query("{ 'identity.username': ?0 }")
    Optional<User> findByIdentityUsername(String username);
}
