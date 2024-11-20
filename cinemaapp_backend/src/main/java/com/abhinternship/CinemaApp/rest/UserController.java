package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.User;
import com.abhinternship.CinemaApp.service.UserService;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@Validated
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        final List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id) throws ResourceNotFoundException{
        return userService.findUserById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        final User savedUser = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User with the id " + id + " has been deleted.");
    }

}
