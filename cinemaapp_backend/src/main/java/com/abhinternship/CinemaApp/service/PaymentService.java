package com.abhinternship.CinemaApp.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    public PaymentIntent createPaymentIntent(final Long amount, final String currency, final String receiptEmail) throws StripeException {
        final PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(amount) // Amount in the smallest currency unit (e.g., cents for USD)
                        .setCurrency(currency)
                        .setReceiptEmail(receiptEmail)
                        .build();

        return PaymentIntent.create(params);
    }
}
