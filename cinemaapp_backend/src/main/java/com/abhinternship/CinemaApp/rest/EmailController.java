package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/otp")
    public ResponseEntity<String> sendOTP() {
        emailService.sendOTPEmail("mashasejdic@gmail.com", "OTP Code for Cinema App");
        return ResponseEntity.ok("Successfully sent the OTP password");
    }
}
