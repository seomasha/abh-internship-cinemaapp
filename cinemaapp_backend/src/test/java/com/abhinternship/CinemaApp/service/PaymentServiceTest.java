package com.abhinternship.CinemaApp.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PaymentServiceTest {

    private PaymentService paymentService;

    @BeforeEach
    void setUp() {
        paymentService = new PaymentService();
    }

    @Test
    void testCreatePaymentIntent() throws StripeException {
        try (final MockedStatic<PaymentIntent> mockedPaymentIntent = mockStatic(PaymentIntent.class)) {
            PaymentIntent mockPaymentIntent = mock(PaymentIntent.class);
            mockedPaymentIntent.when(() -> PaymentIntent.create(any(PaymentIntentCreateParams.class)))
                    .thenReturn(mockPaymentIntent);

            final Long amount = 1000L;
            final String currency = "usd";
            final String receiptEmail = "test@example.com";

            final PaymentIntent result = paymentService.createPaymentIntent(amount, currency, receiptEmail);

            assertNotNull(result);
            mockedPaymentIntent.verify(() -> PaymentIntent.create(any(PaymentIntentCreateParams.class)), times(1));
        }
    }

    @Test
    void testConfirmPayment() throws StripeException {
        try (final MockedStatic<PaymentIntent> mockedPaymentIntent = mockStatic(PaymentIntent.class)) {
            final String paymentIntentId = "pi_test_123";
            final PaymentIntent mockPaymentIntent = mock(PaymentIntent.class);
            when(mockPaymentIntent.confirm()).thenReturn(mockPaymentIntent);

            mockedPaymentIntent.when(() -> PaymentIntent.retrieve(paymentIntentId))
                    .thenReturn(mockPaymentIntent);

            final PaymentIntent result = paymentService.confirmPayment(paymentIntentId);

            assertNotNull(result);
            mockedPaymentIntent.verify(() -> PaymentIntent.retrieve(paymentIntentId), times(1));
            verify(mockPaymentIntent, times(1)).confirm();
        }
    }
}
