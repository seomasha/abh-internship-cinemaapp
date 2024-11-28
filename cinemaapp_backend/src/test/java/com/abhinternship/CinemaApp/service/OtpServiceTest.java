package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.utils.OtpDetails;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;

class OtpServiceTest {

    private OtpService otpService;

    @BeforeEach
    void setUp() {
        otpService = new OtpService();
    }

    @Test
    void saveOtp_ShouldStoreOtpWithExpiration() {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);

        final OtpDetails storedOtpDetails = otpService.getOtpStore().get(email);

        assertNotNull(storedOtpDetails);
        assertEquals(otp, storedOtpDetails.getOtp());
        assertTrue(storedOtpDetails.getExpirationTime() > System.currentTimeMillis());
    }

    @Test
    void isOtpExpired_ShouldReturnTrue_WhenOtpIsExpired() throws InterruptedException {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);
        Thread.sleep(TimeUnit.MINUTES.toMillis(2) + 1);

        assertTrue(otpService.isOtpExpired(email));
    }

    @Test
    void isOtpExpired_ShouldReturnFalse_WhenOtpIsValid() {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);

        assertFalse(otpService.isOtpExpired(email));
    }

    @Test
    void validateOtp_ShouldReturnTrue_WhenOtpIsValid() {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);

        assertTrue(otpService.validateOtp(email, otp));
    }

    @Test
    void validateOtp_ShouldReturnFalse_WhenOtpIsInvalid() {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);

        assertFalse(otpService.validateOtp(email, "5678"));
    }

    @Test
    void validateOtp_ShouldReturnFalse_WhenOtpIsExpired() throws InterruptedException {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);
        Thread.sleep(TimeUnit.MINUTES.toMillis(2) + 1);

        assertFalse(otpService.validateOtp(email, otp));
    }

    @Test
    void verifyOtp_ShouldReturnSuccessMessage_WhenOtpIsValid() {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);

        assertEquals("OTP Verified!", otpService.verifyOtp(email, otp));
    }

    @Test
    void verifyOtp_ShouldReturnErrorMessage_WhenOtpIsExpired() throws InterruptedException {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);
        Thread.sleep(TimeUnit.MINUTES.toMillis(2) + 1);

        assertEquals("OTP has expired", otpService.verifyOtp(email, otp));
    }

    @Test
    void verifyOtp_ShouldReturnErrorMessage_WhenOtpIsInvalid() {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);

        assertEquals("Invalid OTP", otpService.verifyOtp(email, "5678"));
    }
}
