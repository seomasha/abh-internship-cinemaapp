package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Notification;
import com.abhinternship.CinemaApp.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<Notification> findAllByUserId(final Long userId) {
        return notificationRepository.findAllByUserId_Id(userId);
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
        List<Notification> notifications = notificationRepository.findAllByUserId_Id(id);
        notificationRepository.deleteAll(notifications);
    }
}
