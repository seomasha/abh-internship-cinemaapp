package com.abhinternship.CinemaApp.rest;

import com.abhinternship.CinemaApp.model.Genre;
import com.abhinternship.CinemaApp.service.GenreService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/genres")
@AllArgsConstructor
public class GenreController {
    private final GenreService genreService;

    @GetMapping
    public ResponseEntity<List<Genre>> getAllGenres() {
        final List<Genre> genres = genreService.findAllGenres();
        return ResponseEntity.ok(genres);
    }
}
