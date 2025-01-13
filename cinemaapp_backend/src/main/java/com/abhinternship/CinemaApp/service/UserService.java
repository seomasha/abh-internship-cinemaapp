package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAllUsers();
    Optional<User> findUserById(long id);
    User saveUser(User user);
    void deleteUser(Long id);
    Optional<User> findUserByEmail(String email);
    void resetPassword(String email, String password);
    boolean verifyPassword(String email, String enteredPassword);
    void deactivateAccount(String email);
}
