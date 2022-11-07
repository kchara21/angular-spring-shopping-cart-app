package com.example.back.repository;

import com.example.back.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>  {
    public User findByEmail(String email);
}
