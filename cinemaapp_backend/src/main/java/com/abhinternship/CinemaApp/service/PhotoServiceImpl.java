package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Photo;
import com.abhinternship.CinemaApp.repository.PhotoRepository;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository photoRepository;
    private final MinioClient minioClient;

    private static final String BUCKET_NAME = "images";

    @SneakyThrows
    @Override
    public void savePhoto(List<MultipartFile> photos, Long entityId, String entityType, String role) throws IOException {
        for (MultipartFile file : photos) {
            String fileName = file.getOriginalFilename();

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(BUCKET_NAME)
                            .object(fileName)
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build()
            );


            Photo photo = new Photo();
            photo.setUrl("http://127.0.0.1:9001/api/v1/buckets/" +
                    BUCKET_NAME +
                    "/objects/download?preview=true&prefix=" +
                    fileName + "&version_id=null");
            photo.setType(file.getContentType());
            photo.setEntityId(entityId);
            photo.setEntityType(entityType);
            photo.setRole(role);

            photoRepository.save(photo);
        }
    }
}
