package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Ticket;
import com.abhinternship.CinemaApp.model.User;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import com.abhinternship.CinemaApp.repository.TicketRepository;
import com.abhinternship.CinemaApp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProjectionRepository projectionRepository;

    @InjectMocks
    private TicketService ticketService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void buyTickets_Success() {
        final Long userId = 1L;
        final Long projectionId = 2L;
        final List<String> seatNos = Arrays.asList("A1", "A2");
        final int price = 7;

        final User user = new User();
        user.setId(userId);
        user.setFirstName("John");
        user.setLastName("Doe");

        final Projection projection = new Projection();
        projection.setId(projectionId);

        final Ticket ticket1 = new Ticket();
        ticket1.setSeatNo("A1");
        ticket1.setPrice(price);
        ticket1.setUserId(user);
        ticket1.setProjectionId(projection);
        ticket1.setPurchaseDate(new Date());
        ticket1.setStatus("purchased");

        final Ticket ticket2 = new Ticket();
        ticket2.setSeatNo("A2");
        ticket2.setPrice(price);
        ticket2.setUserId(user);
        ticket2.setProjectionId(projection);
        ticket2.setPurchaseDate(new Date());
        ticket2.setStatus("purchased");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(projectionRepository.findById(projectionId)).thenReturn(Optional.of(projection));
        when(ticketRepository.saveAll(anyList())).thenReturn(Arrays.asList(ticket1, ticket2));

        final List<Ticket> tickets = ticketService.buyTickets(userId, projectionId, seatNos, price);

        assertNotNull(tickets);
        assertEquals(2, tickets.size());
        assertEquals("A1", tickets.get(0).getSeatNo());
        assertEquals("A2", tickets.get(1).getSeatNo());
        assertEquals(price, tickets.get(0).getPrice());
        assertEquals(price, tickets.get(1).getPrice());
        assertEquals(user, tickets.get(0).getUserId());
        assertEquals(projection, tickets.get(0).getProjectionId());

        verify(userRepository, times(1)).findById(userId);
        verify(projectionRepository, times(1)).findById(projectionId);
        verify(ticketRepository, times(1)).saveAll(anyList());
    }

    @Test
    void buyTickets_UserNotFound() {
        final Long userId = 1L;
        final Long projectionId = 2L;
        final List<String> seatNos = Arrays.asList("A1", "A2");
        final int price = 7;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        final RuntimeException exception = assertThrows(RuntimeException.class, () ->
                ticketService.buyTickets(userId, projectionId, seatNos, price)
        );
        assertEquals("User not found", exception.getMessage());

        verify(userRepository, times(1)).findById(userId);
        verifyNoInteractions(projectionRepository);
        verifyNoInteractions(ticketRepository);
    }

    @Test
    void buyTickets_ProjectionNotFound() {
        final Long userId = 1L;
        final Long projectionId = 2L;
        final List<String> seatNos = Arrays.asList("A1", "A2");
        final int price = 7;

        final User user = new User();
        user.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(projectionRepository.findById(projectionId)).thenReturn(Optional.empty());

        final RuntimeException exception = assertThrows(RuntimeException.class, () ->
                ticketService.buyTickets(userId, projectionId, seatNos, price)
        );
        assertEquals("Projection not found", exception.getMessage());

        verify(userRepository, times(1)).findById(userId);
        verify(projectionRepository, times(1)).findById(projectionId);
        verifyNoInteractions(ticketRepository);
    }
}
