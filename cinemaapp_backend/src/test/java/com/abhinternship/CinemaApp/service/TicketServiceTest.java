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
    private TicketServiceImpl ticketService;

    private Long userId;
    private Long projectionId;
    private List<String> seatNos;
    private int price;
    private User user;
    private Projection projection;
    private Ticket ticket1;
    private Ticket ticket2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        userId = 1L;
        projectionId = 2L;
        seatNos = Arrays.asList("A1", "A2");
        price = 7;

        user = new User();
        user.setId(userId);
        user.setFirstName("John");
        user.setLastName("Doe");

        projection = new Projection();
        projection.setId(projectionId);

        ticket1 = new Ticket();
        ticket1.setSeatNo("A1");
        ticket1.setPrice(price);
        ticket1.setUserId(user);
        ticket1.setProjectionId(projection);
        ticket1.setPurchaseDate(new Date());
        ticket1.setStatus("purchased");

        ticket2 = new Ticket();
        ticket2.setSeatNo("A2");
        ticket2.setPrice(price);
        ticket2.setUserId(user);
        ticket2.setProjectionId(projection);
        ticket2.setPurchaseDate(new Date());
        ticket2.setStatus("purchased");
    }

    @Test
    void buyTickets_Success() {
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

    @Test
    void getReservedSeats_Success() {
        when(ticketRepository.findByProjectionId_Id(projectionId)).thenReturn(Arrays.asList(ticket1, ticket2));

        final List<String> seats = ticketService.getReservedSeats(projectionId);

        assertNotNull(seats);
        assertEquals(2, seats.size());
        assertTrue(seats.contains("A1"));
        assertTrue(seats.contains("A2"));

        verify(ticketRepository, times(1)).findByProjectionId_Id(projectionId);
    }

    @Test
    void getReservedSeats_NoSeatsReserved() {
        when(ticketRepository.findByProjectionId_Id(projectionId)).thenReturn(Arrays.asList());

        final List<String> seats = ticketService.getReservedSeats(projectionId);

        assertNotNull(seats);
        assertTrue(seats.isEmpty());

        verify(ticketRepository, times(1)).findByProjectionId_Id(projectionId);
    }
}
