package com.abhinternship.CinemaApp.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    private PaymentService paymentService;

    @Mock
    private TicketService ticketService;

    @BeforeEach
    void setUp() {
        paymentService = new PaymentService(ticketService);
    }

    @Test
    void testCreatePaymentIntent() throws StripeException {
        when(ticketService.calculateTotalPrice(anyList())).thenReturn(200);

        try (final MockedStatic<PaymentIntent> mockedPaymentIntent = mockStatic(PaymentIntent.class)) {
            final PaymentIntent mockPaymentIntent = mock(PaymentIntent.class);
            mockedPaymentIntent.when(() -> PaymentIntent.create(any(PaymentIntentCreateParams.class)))
                    .thenReturn(mockPaymentIntent);

            final String customerId = "test";
            final String currency = "usd";
            final List<String> seats = new ArrayList<>();
            final double currencyRate = 0.51;
            seats.add("A1");
            seats.add("A2");
            final String receiptEmail = "test@example.com";

            final PaymentIntent result = paymentService.createPaymentIntent(customerId,
                    seats, currencyRate, currency, receiptEmail);

            assertNotNull(result);

            mockedPaymentIntent.verify(() -> PaymentIntent.create(any(PaymentIntentCreateParams.class)), times(1));

            verify(ticketService).calculateTotalPrice(seats);
        }
    }
}
