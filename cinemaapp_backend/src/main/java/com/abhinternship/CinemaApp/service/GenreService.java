package com.abhinternship.CinemaApp.service;
import com.abhinternship.CinemaApp.model.Genre;

import java.util.List;
import java.util.Optional;

public interface GenreService {
    List<Genre> findAllGenres();
    Optional<Genre> findGenreById(Long id);
    void saveGenre(Genre genre);
    void deleteGenre(Long id);
}
