package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
}
