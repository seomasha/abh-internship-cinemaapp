package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Movie;
import com.abhinternship.CinemaApp.utils.FilterMovie;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FilterMovieRepositoryImpl implements FilterMovieRepository {
    private final EntityManager entityManager;

    public FilterMovieRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Page<Movie> findMoviesByFilter(final FilterMovie filter, final Pageable pageable) {
        final String baseQuery = "SELECT m FROM Movie m JOIN Projection p ON m.id = p.movieId.id";
        final String filterQuery = filter.toQueryString();

        final String finalQuery = filterQuery.isEmpty() ? baseQuery : baseQuery + " WHERE " + filterQuery;

        final Query query = entityManager.createQuery(finalQuery, Movie.class);

        if (filter.getVenueId() != null) {
            query.setParameter("venueId", filter.getVenueId());
        }

        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        final List<Movie> movies = query.getResultList();

        final Query countQuery = entityManager.createQuery(
                "SELECT COUNT(m) FROM Movie m JOIN Projection p ON m.id = p.movieId.id" +
                        (filterQuery.isEmpty() ? "" : " WHERE " + filterQuery)
        );

        if (filter.getVenueId() != null) {
            countQuery.setParameter("venueId", filter.getVenueId());
        }

        final long count = (long) countQuery.getSingleResult();

        return new PageImpl<>(movies, pageable, count);
    }
}
