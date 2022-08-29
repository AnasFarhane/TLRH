package com.example.hrproject.Security.repo;

import com.example.hrproject.Security.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Get Arrays (https://www.getarrays.io/)
 * @version 1.0
 * @since 7/10/2021
 */
public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
