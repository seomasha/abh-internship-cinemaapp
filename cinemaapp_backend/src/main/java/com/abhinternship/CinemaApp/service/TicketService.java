package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Ticket;

import java.time.LocalDate;
import java.util.List;

public interface TicketService {
    Ticket reserveTickets(Long userId, Long projectionId, List<String> seatNos, LocalDate date);
    List<String> getReservedSeats(Long projectionId, LocalDate date);
    List<Ticket> buyTickets(Long projectionId, Long userId);
    int calculateTotalPrice(List<String> seatNos);
    void deleteExpiredReservedTickets();
    List<Ticket> getUpcomingMovies(Long userId);
    List<Ticket> getExpiredMovies(Long userId);
}
