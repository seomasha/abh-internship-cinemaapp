package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Photo;
import com.abhinternship.CinemaApp.repository.PhotoRepository;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository photoRepository;
    private final MinioClient minioClient;

    @Value("${minio.url}")
    private String minioURL;
    private static final String BUCKET_NAME = "images";

    @SneakyThrows
    @Override
    public void savePhoto(final List<MultipartFile> photos,
                          final Long entityId,
                          final String entityType,
                          final String role) throws IOException {
        for (MultipartFile file : photos) {
            saveSinglePhoto(file, entityId, entityType, role);
        }
    }

    @SneakyThrows
    public Long savePhotoAndReturnId(final MultipartFile photo,
                                     final Long entityId,
                                     final String entityType,
                                     final String role) throws IOException {
        return saveSinglePhoto(photo, entityId, entityType, role).getId();
    }

    @SneakyThrows
    private Photo saveSinglePhoto(final MultipartFile file,
                                  final Long entityId,
                                  final String entityType,
                                  final String role) throws IOException {
        final String fileName = file.getOriginalFilename();

        minioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(BUCKET_NAME)
                        .object(fileName)
                        .stream(file.getInputStream(), file.getSize(), -1)
                        .contentType(file.getContentType())
                        .build()
        );

        final Photo photo = new Photo();
        photo.setUrl(minioURL + "/" +
                BUCKET_NAME +
                "/objects/download?preview=true&prefix=" +
                fileName + "&version_id=null");
        photo.setType(file.getContentType());
        photo.setEntityId(entityId);
        photo.setEntityType(entityType);
        photo.setRole(role);

        return photoRepository.save(photo);
    }

    @Override
    @SneakyThrows
    public void deletePhoto(final Long id) {
        final Photo photo = photoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Photo not found with id: " + id));

        final String url = photo.getUrl();
        final String fileName = url.substring(url.lastIndexOf("prefix=") + 7, url.lastIndexOf("&version_id"));

        minioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket(BUCKET_NAME)
                        .object(fileName)
                        .build()
        );

        photoRepository.deleteById(id);
    }
}
