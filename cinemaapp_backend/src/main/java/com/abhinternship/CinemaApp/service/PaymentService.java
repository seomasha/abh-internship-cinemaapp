package com.abhinternship.CinemaApp.service;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerListParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentMethodAttachParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    public PaymentIntent createPaymentIntent(final String customerId, final Long amount, final String currency, final String receiptEmail) throws StripeException {
        final PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(amount) // Amount in the smallest currency unit (e.g., cents for USD)
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
}
