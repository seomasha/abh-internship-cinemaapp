package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Notification;

public interface WebSocketService {
    void sendNotification(String userDestination, Notification notification);
    void broadcastNotification(Notification notification);
}
