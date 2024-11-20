package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.User;
import com.abhinternship.CinemaApp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findUserById(final long id) {
        return userRepository.findById(id);
    }

    @Override
    public User saveUser(final User user) {
        if (userRepository.existsByEmail(user.getEmail()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use.");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(final Long id) {
        userRepository.deleteById(id);
    }
}
