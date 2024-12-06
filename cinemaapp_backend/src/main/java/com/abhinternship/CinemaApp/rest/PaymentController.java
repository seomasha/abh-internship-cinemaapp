package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.PaymentRequestDTO;
import com.abhinternship.CinemaApp.service.EmailService;
import com.abhinternship.CinemaApp.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final EmailService emailService;

    @PostMapping("/create-intent")
    public ResponseEntity<Map<String, String>> createPayment(@RequestBody PaymentRequestDTO paymentRequest) throws StripeException {
        final PaymentIntent paymentIntent = paymentService.createPaymentIntent(
                paymentRequest.getCustomerId(),
                paymentRequest.getAmount(),
                paymentRequest.getCurrency(),
                paymentRequest.getReceiptEmail());

        final Map<String, String> response = new HashMap<>();
        response.put("clientSecret", paymentIntent.getClientSecret());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/send-confirmation-email")
    public ResponseEntity<String> confirmPayment(@RequestParam String email) {
        final String subject = "Payment confirmation";
        emailService.sendPaymentMail(email, subject);

        return ResponseEntity.ok("Receipt sent to " + email);
    }

    @PostMapping("/create-customer")
    public ResponseEntity<Map<String, String>> createCustomer(@RequestBody Map<String, String> customerRequest) throws StripeException {
        final String email = customerRequest.get("email");
        final String name = customerRequest.get("name");

        final Customer customer = paymentService.createCustomer(email, name);

        final Map<String, String> response = new HashMap<>();
        response.put("customerId", customer.getId());
        response.put("email", customer.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/attach-payment-method")
    public ResponseEntity<String> attachPaymentMethodToCustomer(@RequestParam String paymentMethodId, @RequestParam String customerId) throws StripeException {
        paymentService.attachPaymentMethodToCustomer(paymentMethodId, customerId);
        return ResponseEntity.ok("Payment method attached successfully.");
    }

    @GetMapping("/payment-methods")
    public ResponseEntity<List<PaymentMethod>> getPaymentMethods(@RequestParam String customerId) throws StripeException {
        final List<PaymentMethod> paymentMethods = paymentService.getPaymentMethodsForCustomer(customerId);
        return ResponseEntity.ok(paymentMethods);
    }

    @DeleteMapping("/payment-methods/delete/{id}")
    public ResponseEntity<String> deletePaymentMethod(@PathVariable String id) throws StripeException {
        paymentService.deletePaymentMethod(id);
        return ResponseEntity.ok("Payment method deleted successfully.");

    }
}
