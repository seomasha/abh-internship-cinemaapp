package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findBySeatNoAndProjectionId(String seatNo, Projection projectionId);
}
