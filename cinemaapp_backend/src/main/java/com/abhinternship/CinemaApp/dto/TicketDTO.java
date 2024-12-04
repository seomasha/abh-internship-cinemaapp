package com.abhinternship.CinemaApp.dto;

import lombok.Data;

import java.util.List;

@Data
public class TicketDTO {
    private final Long userId;
    private final Long projectionId;
    private final List<String> seatNos;
    private final int price;
}
