package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.enums.NotificationType;
import com.abhinternship.CinemaApp.model.*;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import com.abhinternship.CinemaApp.repository.TicketRepository;
import com.abhinternship.CinemaApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final ProjectionRepository projectionRepository;
    private final WebSocketService webSocketService;
    private final EmailService emailService;
    private static final Logger logger = LoggerFactory.getLogger(TicketService.class);

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
        final User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        final List<Ticket> reservedTickets = ticketRepository.findByProjectionId_IdAndUserId_IdAndStatus(projectionId, userId, "reserved");
        final Projection projection = projectionRepository.findById(projectionId).orElseThrow(() -> new RuntimeException("Projection not found"));;

        for (Ticket ticket : reservedTickets) {
            ticket.setStatus("purchased");
        }

        final Notification notification = new Notification();
        notification.setUserId(user);
        notification.setMovieId(projection.getMovieId());
        notification.setCreatedAt(LocalDateTime.now());
        notification.setMessage("Your payment was successful.");
        notification.setType(NotificationType.PAYMENT_CONFIRMATION);

        webSocketService.sendNotification(user.getEmail(), notification);
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

    @Override
    public List<Ticket> getUpcomingMovies(final Long userId) {
        return ticketRepository.findUpcomingMoviesByUserId(userId);
    }

    @Override
    public List<Ticket> getExpiredMovies(final Long userId) {
        return ticketRepository.findExpiredMoviesByUserId(userId);
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    @Override
    public void deleteExpiredReservedTickets() {
        ticketRepository.deleteExpiredReservedTickets();
    }

    @Scheduled(fixedRate = 60000)
    public void sendEventReminders() {
        final LocalTime now = LocalTime.now().withNano(0).withSecond(0);
        final LocalTime oneMinuteLater = now.plusMinutes(1);

        final LocalDate today = LocalDate.now();

        final List<Projection> upcomingProjections = projectionRepository.findByProjectionTime(oneMinuteLater);

        for (Projection projection : upcomingProjections) {
            final List<Ticket> tickets = ticketRepository.findByProjectionId_Id(projection.getId());

            Set<User> notifiedUsers = new HashSet<>();

            for (Ticket ticket : tickets) {
                if (!ticket.getDate().isEqual(today)) {
                    continue;
                }

                final User user = ticket.getUserId();

                if (!notifiedUsers.contains(user)) {
                    final Movie movie = projection.getMovieId();

                    final Notification notification = new Notification();
                    notification.setUserId(user);
                    notification.setMovieId(movie);
                    notification.setCreatedAt(LocalDateTime.now());
                    notification.setMessage("Reminder: Your movie '" + movie.getName() + "' starts in 1 minute!");
                    notification.setType(NotificationType.EVENT_REMINDER);
                    notification.setRead(false);

                    webSocketService.sendNotification(user.getEmail(), notification);

                    final String emailSubject = "Movie Reminder: " + movie.getName();
                    final String emailBody = "Hi " + user.getFirstName() + ",\n\n" +
                            "This is a reminder that your movie '" + movie.getName() + "' is starting in 1 minute at " +
                            projection.getVenueId().getName() + ".\n\nEnjoy the show!";
                    emailService.sendEmail(user.getEmail(), emailSubject, emailBody);

                    notifiedUsers.add(user);
                }
            }
        }
    }

}
