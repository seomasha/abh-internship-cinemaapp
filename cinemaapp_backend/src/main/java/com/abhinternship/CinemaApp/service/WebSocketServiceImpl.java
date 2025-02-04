package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Notification;
import com.abhinternship.CinemaApp.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class WebSocketServiceImpl implements WebSocketService{

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationRepository notificationRepository;

    @Override
    public void sendNotification(final String userDestination, final Notification notification) {
        messagingTemplate.convertAndSendToUser(userDestination, "/topic/notifications", notification);
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }

    @Override
    public void broadcastNotification(final Notification notification) {
        messagingTemplate.convertAndSend("/topic/notifications", notification);
    }
}
