package com.yourproject.foodshare.repository;

import com.yourproject.foodshare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    
    Optional<User> findByEmail(String email);

    // --- NEW METHOD ---
    Optional<User> findByPasswordResetToken(String token);
}
