package com.abhinternship.CinemaApp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final OtpService otpService;

    @Value("${spring.mail.username}")
    private String sender;

    public EmailService(final JavaMailSender mailSender, final OtpService otpService) {
        this.mailSender = mailSender;
        this.otpService = otpService;
    }

    public String generateOtp() {
        final Random random = new Random();
        return String.format("%04d", random.nextInt(9999));
    }

    @Async
    public String sendOTPEmail(final String to, final String subject) {
        final String generatedOtp = generateOtp();

        final SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom(sender);
        message.setSubject(subject);
        message.setText("Your OTP password is: " + generatedOtp);
        mailSender.send(message);

        otpService.saveOtp(to, generatedOtp);

        return generatedOtp;
    }
}
