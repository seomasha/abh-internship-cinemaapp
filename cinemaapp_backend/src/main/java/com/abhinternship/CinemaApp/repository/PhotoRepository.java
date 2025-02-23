package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Photo;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    void deleteById(@NotNull Long id);
}
