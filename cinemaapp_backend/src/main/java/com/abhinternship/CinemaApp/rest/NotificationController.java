package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Notification;
import com.abhinternship.CinemaApp.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{id}")
    public ResponseEntity<List<Notification>> getAllNotificationsByUserId(@PathVariable Long id) {
        final List<Notification> notifications = notificationService.findAllByUserId(id);
        return ResponseEntity.ok(notifications);
    }

    @PostMapping("/{id}/read")
    public ResponseEntity<String> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok("Notification marked as read.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> clearNotifications(@PathVariable Long id) {
        notificationService.clearNotifications(id);
        return ResponseEntity.ok("Notifications cleared");
    }
}
