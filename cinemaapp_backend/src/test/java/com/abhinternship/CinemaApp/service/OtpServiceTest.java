package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.utils.OtpDetails;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.util.Map;
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
    void verifyOtp_ShouldReturnSuccessResponse_WhenOtpIsValid() {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);

        Map<String, Object> response = otpService.verifyOtp(email, otp);

        assertNotNull(response);
        assertEquals("OTP Verified.", response.get("message"));
        assertEquals(HttpStatus.OK.value(), response.get("statusCode"));
    }

    @Test
    void verifyOtp_ShouldReturnErrorResponse_WhenOtpIsExpired() throws InterruptedException {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);
        Thread.sleep(TimeUnit.MINUTES.toMillis(2) + 1);

        Map<String, Object> response = otpService.verifyOtp(email, otp);

        assertNotNull(response);
        assertEquals("OTP has expired.", response.get("message"));
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.get("statusCode"));
    }

    @Test
    void verifyOtp_ShouldReturnErrorResponse_WhenOtpIsInvalid() {
        final String email = "test@example.com";
        final String otp = "1234";

        otpService.saveOtp(email, otp);

        Map<String, Object> response = otpService.verifyOtp(email, "5678");

        assertNotNull(response);
        assertEquals("Invalid OTP.", response.get("message"));
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.get("statusCode"));
    }

    @Test
    void verifyOtp_ShouldReturnErrorResponse_WhenOtpDoesNotExist() {
        final String email = "test@example.com";
        final String otp = "1234";

        Map<String, Object> response = otpService.verifyOtp(email, otp);

        assertNotNull(response);
        assertEquals("No OTP found for this email.", response.get("message"));
        assertEquals(HttpStatus.NOT_FOUND.value(), response.get("statusCode"));
    }
}
