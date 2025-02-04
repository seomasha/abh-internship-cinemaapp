package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Notification;
import com.abhinternship.CinemaApp.service.WebSocketService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class WebSocketController {

    private final WebSocketService webSocketService;

    @MessageMapping("/send-notification")
    @SendTo("/topic/notifications")
    public Notification broadcastNotification(final Notification notification) {
        webSocketService.broadcastNotification(notification);
        return notification;
    }
}
