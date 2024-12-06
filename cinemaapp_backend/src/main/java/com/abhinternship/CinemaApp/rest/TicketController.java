package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.TicketDTO;
import com.abhinternship.CinemaApp.model.Ticket;
import com.abhinternship.CinemaApp.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @PostMapping("/buy")
    public List<Ticket> buyTicket(@RequestBody TicketDTO ticketPurchaseDTO) {
        return ticketService.buyTickets(
                ticketPurchaseDTO.getUserId(),
                ticketPurchaseDTO.getProjectionId(),
                ticketPurchaseDTO.getSeatNos(),
                ticketPurchaseDTO.getPrice(),
                ticketPurchaseDTO.getDate()
        );
    }

    @GetMapping("/reserved-seats")
    public List<String> getReservedSeats(@RequestParam Long projectionId,
                                         @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return ticketService.getReservedSeats(projectionId, date);
    }
}
