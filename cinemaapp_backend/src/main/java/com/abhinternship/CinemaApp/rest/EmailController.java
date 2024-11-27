package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.EmailDTO;
import com.abhinternship.CinemaApp.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/otp")
    public ResponseEntity<String> sendOTP(@RequestBody EmailDTO emailDTO) {
        final String email = emailDTO.getEmail();
        final String otp = emailService.sendOTPEmail(email, "OTP Code for Cinema App");
        return ResponseEntity.ok(otp);
    }
}
