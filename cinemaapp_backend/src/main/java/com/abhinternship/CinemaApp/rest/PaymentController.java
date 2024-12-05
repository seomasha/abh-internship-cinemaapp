package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.PaymentRequestDTO;
import com.abhinternship.CinemaApp.service.EmailService;
import com.abhinternship.CinemaApp.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final EmailService emailService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createPayment(@RequestBody PaymentRequestDTO paymentRequest) throws StripeException {
        final PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentRequest.getAmount(), paymentRequest.getCurrency(), paymentRequest.getReceiptEmail());

        final Map<String, String> response = new HashMap<>();
        response.put("clientSecret", paymentIntent.getClientSecret());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/confirm-payment")
    public ResponseEntity<String> confirmPayment(@RequestParam String email) {
        final String subject = "Payment confirmation";
        emailService.sendPaymentMail(email, subject);

        return ResponseEntity.ok("Receipt sent to " + email);
    }
}
