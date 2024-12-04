package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByProjectionId_Id(Long projectionId);
}
