package com.abhinternship.CinemaApp.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private OtpService otpService;

    @InjectMocks
    private EmailService emailService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void generateOtp_ShouldReturnValidOtp() {
        final String otp = emailService.generateOtp();
        assertNotNull(otp);
        assertEquals(4, otp.length());
        assertTrue(otp.matches("\\d{4}"));
    }

    @Test
    void sendOTPEmail_ShouldSendEmailAndSaveOtp() {
        final String to = "test@example.com";
        final String subject = "OTP Verification";
        final String otp = "1234";

        final EmailService spyEmailService = spy(emailService);
        doReturn(otp).when(spyEmailService).generateOtp();

        final ArgumentCaptor<SimpleMailMessage> messageCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);

        final String returnedOtp = spyEmailService.sendOTPEmail(to, subject);

        assertEquals(otp, returnedOtp);
        verify(mailSender, times(1)).send(messageCaptor.capture());
        verify(otpService, times(1)).saveOtp(to, otp);

        final SimpleMailMessage sentMessage = messageCaptor.getValue();
        assertEquals(to, Objects.requireNonNull(sentMessage.getTo())[0]);
        assertEquals("Your OTP password is: " + otp, sentMessage.getText());
        assertEquals(subject, sentMessage.getSubject());
    }
}
