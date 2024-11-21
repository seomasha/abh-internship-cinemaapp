package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.User;
import com.abhinternship.CinemaApp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveUser_ShouldEncryptPasswordAndSaveUser() {
        final User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("plainPassword");

        final String encryptedPassword = "encryptedPassword";
        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(passwordEncoder.encode("plainPassword")).thenReturn(encryptedPassword);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        final User savedUser = userService.saveUser(user);

        assertNotNull(savedUser);
        assertEquals("test@example.com", savedUser.getEmail());
        assertEquals(encryptedPassword, savedUser.getPassword());
        verify(passwordEncoder, times(1)).encode("plainPassword");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void saveUser_ShouldThrowException_WhenEmailIsAlreadyInUse() {
        final User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("plainPassword");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        final ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> userService.saveUser(user)
        );

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        assertEquals("Email is already in use.", exception.getReason());
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
    }
}
