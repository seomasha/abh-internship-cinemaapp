package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Ticket;

import java.util.List;

public interface TicketService {
    List<Ticket> buyTickets(Long userId, Long projectionId, List<String> seatNos, int price);
    List<String> getReservedSeats(Long projectionId);
}
