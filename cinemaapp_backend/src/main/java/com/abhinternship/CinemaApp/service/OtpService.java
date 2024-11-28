package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.utils.OtpDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
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

    public boolean validateOtp(final String email, final String enteredOtp) {
        final OtpDetails otpDetails = otpStore.get(email);
        if (otpDetails == null || System.currentTimeMillis() > otpDetails.getExpirationTime()) {
            return false;
        }
        return otpDetails.getOtp().equals(enteredOtp);
    }

    public String verifyOtp(final String email, final String enteredOtp) {
        if (isOtpExpired(email)) {
            return "OTP has expired";
        }

        final boolean isValid = validateOtp(email, enteredOtp);
        return isValid? "OTP Verified!" : "Invalid OTP";
    }
}
