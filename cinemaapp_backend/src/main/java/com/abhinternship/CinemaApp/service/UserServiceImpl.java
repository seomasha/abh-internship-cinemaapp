package com.abhinternship.CinemaApp.service;

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
    public User updateUser(final long id, final Map<String, Object> updates) {
        final User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        if (updates.containsKey("firstName")) {
            existingUser.setFirstName((String) updates.get("firstName"));
        }
        if (updates.containsKey("lastName")) {
            existingUser.setLastName((String) updates.get("lastName"));
        }
        if (updates.containsKey("email")) {
            final String email = (String) updates.get("email");
            if (!email.equals(existingUser.getEmail()) && userRepository.existsByEmail(email)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use.");
            }
            existingUser.setEmail(email);
        }
        if (updates.containsKey("phoneNo")) {
            existingUser.setPhoneNo((String) updates.get("phoneNo"));
        }
        if (updates.containsKey("city")) {
            existingUser.setCity((String) updates.get("city"));
        }
        if (updates.containsKey("country")) {
            existingUser.setCountry((String) updates.get("country"));
        }
        if (updates.containsKey("profilePhotoId")) {
            final Long profilePhotoId = Long.valueOf((Integer) updates.get("profilePhotoId"));
            existingUser.setProfilePhotoId(photoRepository.findById(profilePhotoId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Photo not found with ID: " + profilePhotoId)));
        }

        return userRepository.save(existingUser);
    }
}
