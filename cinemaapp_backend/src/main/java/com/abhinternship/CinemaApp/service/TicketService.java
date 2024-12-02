package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Ticket;
import com.abhinternship.CinemaApp.model.User;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import com.abhinternship.CinemaApp.repository.TicketRepository;
import com.abhinternship.CinemaApp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final ProjectionRepository projectionRepository;

    public List<Ticket> buyTickets(final Long userId, final Long projectionId, final List<String> seatNos, final int price) {
        final User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        final Projection projection = projectionRepository.findById(projectionId).orElseThrow(() -> new RuntimeException("Projection not found"));

        final List<Ticket> tickets = new ArrayList<>();
        for (String seatNo : seatNos) {
            Ticket ticket = new Ticket();
            ticket.setUserId(user);
            ticket.setProjectionId(projection);
            ticket.setSeatNo(seatNo);
            ticket.setPrice(price);
            ticket.setPurchaseDate(new Date());
            ticket.setStatus("purchased");
            tickets.add(ticket);
        }

        return ticketRepository.saveAll(tickets);
    }
}
