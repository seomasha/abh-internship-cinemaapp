package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Notification;
import com.abhinternship.CinemaApp.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<Notification> findAllByUserId(final Long userId) {
        return notificationRepository.findByUserId_IdOrderByIsReadAsc(userId);
    }

    @Override
    public void markAsRead(final Long id) {
        final Notification notification =
                notificationRepository.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public void clearNotifications(final Long id) {
        List<Notification> notifications = notificationRepository.findByUserId_IdOrderByIsReadAsc(id);
        notificationRepository.deleteAll(notifications);
    }
}
