package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.model.Genre;
import com.abhinternship.CinemaApp.repository.GenreRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GenreServiceImpl implements GenreService{

    private final GenreRepository genreRepository;

    @Override
    public List<Genre> findAllGenres() {
        return genreRepository.findAll();
    }

    @Override
    public Optional<Genre> findGenreById(final Long id) {
        return genreRepository.findById(id);
    }

    @Override
    public void saveGenre(final Genre genre) {
        genreRepository.save(genre);
    }

    @Override
    public void deleteGenre(final Long id) {
        genreRepository.deleteById(id);
    }
}
