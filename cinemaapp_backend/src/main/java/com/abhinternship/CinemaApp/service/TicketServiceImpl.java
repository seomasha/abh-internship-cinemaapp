package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Ticket;
import com.abhinternship.CinemaApp.model.User;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import com.abhinternship.CinemaApp.repository.TicketRepository;
import com.abhinternship.CinemaApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final ProjectionRepository projectionRepository;

    public List<Ticket> reserveTickets(final Long userId,
                                   final Long projectionId,
                                   final List<String> seatNos,
                                   final int price,
                                   final LocalDate date) {
        final User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        final Projection projection = projectionRepository.findById(projectionId)
                .orElseThrow(() -> new RuntimeException("Projection not found"));

        final List<Ticket> tickets = new ArrayList<>();
        for (String seatNo : seatNos) {
            Ticket ticket = new Ticket();
            ticket.setUserId(user);
            ticket.setProjectionId(projection);
            ticket.setSeatNo(seatNo);
            ticket.setPrice(price);
            ticket.setPurchaseDate(new Date());
            ticket.setDate(date);
            ticket.setStatus("reserved");
            tickets.add(ticket);
        }

        return ticketRepository.saveAll(tickets);
    }

    @Override
    public List<String> getReservedSeats(final Long projectionId, final LocalDate localDate) {
        final List<Ticket> tickets = ticketRepository.findByProjectionId_IdAndDate(projectionId, localDate);
        return tickets.stream()
                .map(Ticket::getSeatNo)
                .collect(Collectors.toList());
    }

    @Override
    public List<Ticket> buyTickets(final Long projectionId, final Long userId) {
        final List<Ticket> reservedTickets = ticketRepository.findByProjectionId_IdAndUserId_IdAndStatus(projectionId, userId, "reserved");

        for (Ticket ticket : reservedTickets) {
            ticket.setStatus("purchased");
        }

        return ticketRepository.saveAll(reservedTickets);
    }

    @Scheduled(fixedRate = 60000)
    @Override
    public void deleteExpiredReservedTickets() {
        ticketRepository.deleteExpiredReservedTickets();
    }
}
