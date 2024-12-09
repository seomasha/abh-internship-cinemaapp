package com.abhinternship.CinemaApp.service;

import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.param.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final TicketService ticketService;

    public PaymentIntent createPaymentIntent(final String customerId,
                                             final List<String> seats,
                                             final double currencyRate,
                                             final String currency,
                                             final String receiptEmail) throws StripeException {

        final int totalPrice = ticketService.calculateTotalPrice(seats);

        final PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount((long) (totalPrice * 100 * currencyRate)) // Amount in the smallest currency unit (e.g., cents for USD)
                        .setCurrency(currency)
                        .setReceiptEmail(receiptEmail)
                        .setCustomer(customerId)
                        .build();

        return PaymentIntent.create(params);
    }

    public Customer createCustomer(final String email, final String name) throws StripeException {
        final Customer existingCustomer = findCustomerByEmail(email);

        if (existingCustomer != null) {
            return existingCustomer;
        }

        final CustomerCreateParams params = CustomerCreateParams.builder()
                .setEmail(email)
                .setName(name)
                .build();

        return Customer.create(params);
    }

    public void attachPaymentMethodToCustomer(final String paymentMethodId, final String customerId) throws StripeException {
        final PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentMethodId);

        final List<PaymentMethod> existingPaymentMethods = getPaymentMethodsForCustomer(customerId);
        boolean isDuplicate = existingPaymentMethods.stream()
                .anyMatch(pm -> pm.getCard() != null
                        && pm.getCard().getLast4().equals(paymentMethod.getCard().getLast4())
                        && pm.getCard().getBrand().equals(paymentMethod.getCard().getBrand()));

        if (isDuplicate) {
            return;
        }

        final PaymentMethodAttachParams params = PaymentMethodAttachParams.builder()
                .setCustomer(customerId)
                .build();

        paymentMethod.attach(params);
    }


    private Customer findCustomerByEmail(final String email) throws StripeException {
        final CustomerListParams params = CustomerListParams.builder()
                .setLimit(100L)
                .build();

        final CustomerCollection customers = Customer.list(params);

        for (Customer customer : customers.getData()) {
            if (customer.getEmail().equals(email)) {
                return customer;
            }
        }

        return null;
    }

    public List<PaymentMethod> getPaymentMethodsForCustomer(final String customerId) throws StripeException {
        final PaymentMethodListParams params = PaymentMethodListParams.builder()
                .setCustomer(customerId)
                .setType(PaymentMethodListParams.Type.CARD)
                .build();

        final PaymentMethodCollection paymentMethods = PaymentMethod.list(params);

        return paymentMethods.getData();
    }

    public void deletePaymentMethod(final String paymentMethodId) throws StripeException {
        final PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentMethodId);
        paymentMethod.detach();
    }
}
