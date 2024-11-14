package com.abhinternship.CinemaApp.service;

import com.abhinternship.CinemaApp.dto.MovieListDTO;
import com.abhinternship.CinemaApp.dto.MovieWithProjectionsDTO;
import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.model.Projection;
import com.abhinternship.CinemaApp.repository.FilterMovieRepositoryImpl;
import com.abhinternship.CinemaApp.repository.MovieRepository;
import com.abhinternship.CinemaApp.repository.ProjectionRepository;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import com.abhinternship.CinemaApp.utils.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

public class MovieServiceTest {

    @Mock
    private MovieRepository movieRepository;

    @Mock
    private ProjectionRepository projectionRepository;

    @Mock
    private FilterMovieRepositoryImpl filterMovieRepositoryImpl;

    @InjectMocks
    private MovieServiceImpl movieService;

    private Movie testMovie;
    private Projection testProjection;
    private Pageable pageable;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        testMovie = new Movie();
        testMovie.setId(1L);
        testMovie.setName("Test Movie");
        testMovie.setProjectionStartDate(LocalDate.now());
        testMovie.setProjectionEndDate(LocalDate.now().plusDays(10));

        testProjection = new Projection();
        testProjection.setId(1L);
        testProjection.setMovieId(testMovie);

        pageable = PageRequest.of(0, 10);
    }

    @Test
    public void testFindCurrentlyShowingMovies_NoFilter() {
        final Page<Movie> moviePage = new PageImpl<>(List.of(testMovie));

        when(movieRepository.findByProjectionStartDateBeforeAndProjectionEndDateAfter(any(LocalDate.class), any(LocalDate.class), eq(pageable)))
                .thenReturn(moviePage);
        when(projectionRepository.findByMovieIdOrderByProjectionTime(any(Movie.class)))
                .thenReturn(Set.of(testProjection));

        final FilterMovie filterMovie = FilterMovie.empty();
        final MovieListDTO result = movieService.findCurrentlyShowingMovies(filterMovie, 0, 10);

        assertEquals(1, result.getMovies().size());
        assertEquals("Test Movie", result.getMovies().getFirst().getName());
    }

    @Test
    public void testFindCurrentlyShowingMovies_WithFilter() {
        final Page<Movie> moviePage = new PageImpl<>(List.of(testMovie));

        when(filterMovieRepositoryImpl.findMoviesByFilter(any(FilterMovie.class), eq(pageable), eq(true)))
                .thenReturn(moviePage);
        when(projectionRepository.findByMovieIdOrderByProjectionTime(any(Movie.class)))
                .thenReturn(Set.of(testProjection));

        final Map<String, String> filters = Map.of("genres", "Action,Drama", "cities", "New York", "venues", "Venue1");
        final FilterMovie filterMovie = new FilterMovie(filters);
        final MovieListDTO result = movieService.findCurrentlyShowingMovies(filterMovie, 0, 10);

        assertEquals(1, result.getMovies().size());
        assertEquals("Test Movie", result.getMovies().getFirst().getName());
    }

    @Test
    public void testFindUpcomingMovies_NoFilter() {
        final Page<Movie> moviePage = new PageImpl<>(List.of(testMovie));

        when(movieRepository.findByProjectionStartDateGreaterThanEqual(any(LocalDate.class), eq(pageable)))
                .thenReturn(moviePage);
        when(projectionRepository.findByMovieIdOrderByProjectionTime(any(Movie.class)))
                .thenReturn(Set.of(testProjection));

        final FilterMovie filterMovie = FilterMovie.empty();
        final MovieListDTO result = movieService.findUpcomingMovies(filterMovie, 0, 10);

        assertEquals(1, result.getMovies().size());
        assertEquals("Test Movie", result.getMovies().getFirst().getName());
    }

    @Test
    public void testFindUpcomingMovies_WithFilter() {
        final Page<Movie> moviePage = new PageImpl<>(List.of(testMovie));

        when(filterMovieRepositoryImpl.findMoviesByFilter(any(FilterMovie.class), eq(pageable), eq(false)))
                .thenReturn(moviePage);
        when(projectionRepository.findByMovieIdOrderByProjectionTime(any(Movie.class)))
                .thenReturn(Set.of(testProjection));

        final Map<String, String> filters = Map.of("genres", "Action,Drama", "cities", "Los Angeles", "venues", "Venue2");
        final FilterMovie filterMovie = new FilterMovie(filters);
        final MovieListDTO result = movieService.findUpcomingMovies(filterMovie, 0, 10);

        assertEquals(1, result.getMovies().size());
        assertEquals("Test Movie", result.getMovies().getFirst().getName());
    }

    @Test
    public void testFindMovieWithProjectionsById_MovieFound() throws ResourceNotFoundException {
        when(movieRepository.findById(1L)).thenReturn(Optional.of(testMovie));
        when(projectionRepository.findByMovieIdOrderByProjectionTime(testMovie)).thenReturn(Set.of(testProjection));

        final MovieWithProjectionsDTO result = movieService.findMovieWithProjectionsById(1L);

        assertNotNull(result);
        assertEquals(testMovie.getName(), result.getName());
        assertEquals(1, result.getProjectionTimes().size());
        assertEquals(testProjection.getProjectionTime(), result.getProjectionTimes().iterator().next());
    }


    @Test
    public void testFindMovieWithProjectionsById_MovieNotFound() {
        when(movieRepository.findById(1L)).thenReturn(Optional.empty());

        final ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            movieService.findMovieWithProjectionsById(1L);
        });

        assertEquals("Movie not found with id: 1", exception.getMessage());
    }
}
