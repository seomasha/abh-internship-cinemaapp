package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Ticket;

import java.time.LocalDate;
import java.util.List;

public interface TicketService {
    List<Ticket> buyTickets(Long userId, Long projectionId, List<String> seatNos, int price, LocalDate date);
    List<String> getReservedSeats(Long projectionId, LocalDate date);
}
