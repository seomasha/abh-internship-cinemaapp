package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByProjectionId_IdAndDate(Long projectionId, LocalDate date);
    List<Ticket> findByProjectionId_IdAndUserId_IdAndStatus(Long projectionId, Long userId, String status);
    @Modifying
    @Query(value = "DELETE FROM ticket t WHERE t.status = 'reserved' AND t.purchase_date <= CURRENT_TIMESTAMP - INTERVAL '5 minutes'", nativeQuery = true)
    void deleteExpiredReservedTickets();
}
