package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.dto.TicketDTO;
import com.abhinternship.CinemaApp.model.Ticket;
import com.abhinternship.CinemaApp.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
                ticketPurchaseDTO.getPrice()
        );
    }
}
