package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/photo")
@RequiredArgsConstructor
public class PhotoController {
    private final PhotoService photoService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<String> uploadPhoto(
            @RequestPart("files") List<MultipartFile> photos,
            @RequestParam("entityId") Long entityId,
            @RequestParam("entityType") String entityType,
            @RequestParam("role") String role
    ) throws IOException {
        photoService.savePhoto(photos, entityId, entityType, role);
        return ResponseEntity.status(HttpStatus.CREATED).body("Photo successfully uploaded.");
    }
}
