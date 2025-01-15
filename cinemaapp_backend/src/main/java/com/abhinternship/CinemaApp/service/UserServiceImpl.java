package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.UserDTO;
import com.abhinternship.CinemaApp.model.User;
import com.abhinternship.CinemaApp.repository.PhotoRepository;
import com.abhinternship.CinemaApp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PhotoRepository photoRepository;
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
        user.setRole("user");
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(final Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findUserByEmail(final String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public void resetPassword(final String email, final String password) {
        final User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));


        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public boolean verifyPassword(final String email, final String enteredPassword) {
        final User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        return passwordEncoder.matches(enteredPassword, user.getPassword());
    }

    @Override
    public void deactivateAccount(final String email) {
        final User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        user.setStatus("deactivated");
        userRepository.save(user);
    }

    @Override
    public User updateUser(final long id, final UserDTO userDTO) {
        final User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        // Map fields from the DTO to the entity
        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setPhoneNo(userDTO.getPhoneNo());
        existingUser.setCity(userDTO.getCity());
        existingUser.setCountry(userDTO.getCountry());

        if (userDTO.getProfilePhotoId() != null) {
            existingUser.setProfilePhotoId(photoRepository.findById(userDTO.getProfilePhotoId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Photo not found with ID: " + userDTO.getProfilePhotoId())));
        }

        return userRepository.save(existingUser);
    }

}
