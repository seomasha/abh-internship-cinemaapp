package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> findAllByUserId(Long userId);
    void markAsRead(Long id);
    void clearNotifications(Long id);
}
