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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final ProjectionRepository projectionRepository;

    private final Map<String, Integer> seatPrices = Map.of(
            "regular", 7,
            "vip", 10,
            "love", 24
    );

    public Ticket reserveTickets(final Long userId,
                                       final Long projectionId,
                                       final List<String> seatNos,
                                       final LocalDate date) {
        final User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        final Projection projection = projectionRepository.findById(projectionId)
                .orElseThrow(() -> new RuntimeException("Projection not found"));

        final String seats = String.join(",", seatNos);

        final Ticket ticket = new Ticket();
        ticket.setUserId(user);
        ticket.setProjectionId(projection);
        ticket.setSeatNo(seats);
        ticket.setPrice(calculateTotalPrice(seatNos));
        ticket.setPurchaseDate(new Date());
        ticket.setDate(date);
        ticket.setStatus("reserved");

        return ticketRepository.save(ticket);
    }

    @Override
    public List<String> getReservedSeats(final Long projectionId, final LocalDate localDate) {
        final List<Ticket> tickets = ticketRepository.findByProjectionId_IdAndDate(projectionId, localDate);
        return tickets.stream()
                .flatMap(ticket -> Arrays.stream(ticket.getSeatNo().split(",")))
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

    private int getSeatPrice(final String seatNo) {
        if (seatNo.startsWith("G") || seatNo.startsWith("H")) {
            return seatPrices.get("vip");
        } else if (seatNo.startsWith("I")) {
            return seatPrices.get("love");
        }
        return seatPrices.get("regular");
    }

    public int calculateTotalPrice(final List<String> seatNos) {
        int totalPrice = 0;
        for (String seatNo : seatNos) {
            totalPrice += getSeatPrice(seatNo);
        }
        return totalPrice;
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    @Override
    public void deleteExpiredReservedTickets() {
        ticketRepository.deleteExpiredReservedTickets();
    }
}
