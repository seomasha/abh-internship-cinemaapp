package com.abhinternship.CinemaApp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class PaymentRequestDTO {
    private String customerId;
    private double currencyRate;
    private List<String> seats;
    private String currency;
    private String receiptEmail;
}
