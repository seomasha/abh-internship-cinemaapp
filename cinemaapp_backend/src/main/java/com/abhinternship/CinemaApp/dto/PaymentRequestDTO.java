package com.abhinternship.CinemaApp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class PaymentRequestDTO {
    private Long amount;
    private String currency;
    private String receiptEmail;
}
