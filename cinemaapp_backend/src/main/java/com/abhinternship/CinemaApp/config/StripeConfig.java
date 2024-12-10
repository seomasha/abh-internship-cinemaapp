package com.abhinternship.CinemaApp.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {
    @Value("${stripe.api.key}")
    private String key;

    @PostConstruct
    public void init() {
        Stripe.apiKey = key;
    }
}
