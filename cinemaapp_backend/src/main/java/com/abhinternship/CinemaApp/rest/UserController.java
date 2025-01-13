package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.EmailDTO;
import com.abhinternship.CinemaApp.dto.OtpDTO;
import com.abhinternship.CinemaApp.model.User;
import com.abhinternship.CinemaApp.service.EmailService;
import com.abhinternship.CinemaApp.service.OtpService;
import com.abhinternship.CinemaApp.service.UserService;
import com.abhinternship.CinemaApp.utils.JwtUtil;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@Validated
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final OtpService otpService;

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

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid User loginRequest) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final User user = userService.findUserByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found."));

        return ResponseEntity.ok(jwtUtil.generateToken(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(final HttpServletRequest request) {
        return ResponseEntity.ok("Logged out successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User with the id " + id + " has been deleted.");
    }

    @PostMapping("/email")
    public ResponseEntity<User> getUserByEmail(@RequestBody EmailDTO emailDTO) throws ResourceNotFoundException {
        final String email = emailDTO.getEmail();
        final User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> body) {
        final String email = body.get("email");
        final String newPassword = body.get("password");

        userService.resetPassword(email, newPassword);
        return ResponseEntity.ok("Password has been successfully reset.");
    }

    @PostMapping("/otp")
    public ResponseEntity<String> sendOTP(@RequestBody EmailDTO emailDTO) {
        final String email = emailDTO.getEmail();
        final Optional<User> userExists = userService.findUserByEmail(email);

        if(userExists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        final String otp = emailService.sendOTPEmail(email, "OTP Code for Cinema App");
        otpService.saveOtp(email, otp);
        return ResponseEntity.ok(otp);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody OtpDTO otpDTO) {
        final String email = otpDTO.getEmail();
        final String enteredOtp = otpDTO.getOtp();

        return ResponseEntity.ok(otpService.verifyOtp(email, enteredOtp));
    }

    @PostMapping("/verify-password")
    public ResponseEntity<Boolean> verifyPassword(@RequestBody Map<String, String> requestBody) {
        final String email = requestBody.get("email");
        final String enteredPassword = requestBody.get("password");

        boolean isMatch = userService.verifyPassword(email, enteredPassword);
        return ResponseEntity.ok(isMatch);
    }
}
