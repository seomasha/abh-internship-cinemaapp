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
    public ResponseEntity<?> uploadPhoto(
            @RequestPart("files") List<MultipartFile> photos,
            @RequestParam("entityId") Long entityId,
            @RequestParam("entityType") String entityType,
            @RequestParam("role") String role
    ) throws IOException {
        if(!photos.isEmpty()) {
            if ("venue".equalsIgnoreCase(entityType)) {
                final Long photoId = photoService.savePhotoAndReturnId(photos.get(0), entityId, entityType, role);
                return ResponseEntity.status(HttpStatus.CREATED).body(photoId);
            }

            photoService.savePhoto(photos, entityId, entityType, role);
            return ResponseEntity.status(HttpStatus.CREATED).body("Photo successfully uploaded.");
        }
        return ResponseEntity.status(HttpStatus.OK).body("No images were uploaded");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePhoto(@PathVariable Long id) {
        photoService.deletePhoto(id);
        return ResponseEntity.ok("Deleted photo with ID: " + id + ".");
    }
}
