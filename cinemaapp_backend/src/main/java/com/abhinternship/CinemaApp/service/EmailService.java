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

    @Value("${spring.mail.username}")
    private String sender;

    public String generateOtp() {
        final Random random = new Random();
        return String.format("%04d", random.nextInt(9999));
    }

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public String sendOTPEmail(final String to, final String subject) {
        final SimpleMailMessage message = new SimpleMailMessage();
        final String generatedOtp = generateOtp();

        message.setTo(to);
        message.setFrom(sender);
        message.setSubject(subject);
        message.setText("Your OTP password is: " + generatedOtp);

        mailSender.send(message);

        return generatedOtp;
    }
}
