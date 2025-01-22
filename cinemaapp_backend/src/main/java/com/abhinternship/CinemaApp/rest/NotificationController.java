package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Notification;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {

    @MessageMapping("/send-notification")
    @SendTo("/topic/notifications")
    public Notification broadcastNotification(final Notification notification) {
        return notification;
    }
}
