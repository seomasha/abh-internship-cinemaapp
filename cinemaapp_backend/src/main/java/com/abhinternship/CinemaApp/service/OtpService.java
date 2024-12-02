package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.utils.OtpDetails;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@Data
public class OtpService {

    private final Map<String, OtpDetails> otpStore = new HashMap<>();
    private static final long OTP_EXPIRATION_TIME = TimeUnit.MINUTES.toMillis(2);

    public void saveOtp(final String email, final String otp) {
        final long expirationTime = System.currentTimeMillis() + OTP_EXPIRATION_TIME;
        otpStore.put(email, new OtpDetails(otp, expirationTime));
    }

    public boolean isOtpExpired(final String email) {
        final OtpDetails otpDetails = otpStore.get(email);
        if (otpDetails == null) {
            return true;
        }
        return System.currentTimeMillis() > otpDetails.getExpirationTime();
    }

    public Map<String, Object> verifyOtp(final String email, final String enteredOtp) {
        final OtpDetails otpDetails = otpStore.get(email);
        final Map<String, Object> response = new HashMap<>();

        if (otpDetails == null) {
            response.put("message", "No OTP found for this email.");
            response.put("statusCode", HttpStatus.NOT_FOUND.value());
            return response;
        }

        if (isOtpExpired(email)) {
            otpStore.remove(email);
            response.put("message", "OTP has expired.");
            response.put("statusCode", HttpStatus.BAD_REQUEST.value());
            return response;
        }

        if (!otpDetails.getOtp().equals(enteredOtp)) {
            response.put("message", "Invalid OTP.");
            response.put("statusCode", HttpStatus.BAD_REQUEST.value());
            return response;
        }

        otpStore.remove(email);
        response.put("message", "OTP Verified.");
        response.put("statusCode", HttpStatus.OK.value());
        return response;
    }
}
