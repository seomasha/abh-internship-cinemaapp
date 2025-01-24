package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId_IdOrderByIsReadAsc(Long id);
}
