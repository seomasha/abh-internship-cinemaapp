package com.abhinternship.CinemaApp.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PhotoService {
    void savePhoto(List<MultipartFile> photos, Long entityId, String entityType, String role) throws IOException;
}
