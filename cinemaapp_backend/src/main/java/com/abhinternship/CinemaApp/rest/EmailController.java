package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.EmailDTO;
import com.abhinternship.CinemaApp.dto.OtpDTO;
import com.abhinternship.CinemaApp.service.EmailService;
import com.abhinternship.CinemaApp.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;
    private final OtpService otpService;

    @PostMapping("/otp")
    public ResponseEntity<String> sendOTP(@RequestBody EmailDTO emailDTO) {
        final String email = emailDTO.getEmail();
        final String otp = emailService.sendOTPEmail(email, "OTP Code for Cinema App");
        otpService.saveOtp(email, otp);
        return ResponseEntity.ok(otp);
    }

    @PostMapping("/otp/verify")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpDTO otpDTO) {
        final String email = otpDTO.getEmail();
        final String enteredOtp = otpDTO.getOtp();

        final String verificationResult = otpService.verifyOtp(email, enteredOtp);

        if (verificationResult.equals("OTP Verified!")) {
            return ResponseEntity.ok(verificationResult);
        } else {
            return ResponseEntity.badRequest().body(verificationResult);
        }
    }
}
