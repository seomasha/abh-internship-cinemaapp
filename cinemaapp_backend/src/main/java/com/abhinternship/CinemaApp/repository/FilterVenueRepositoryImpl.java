package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Venue;
import com.abhinternship.CinemaApp.utils.FilterVenue;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class FilterVenueRepositoryImpl implements FilterVenueRepository {

    private final EntityManager entityManager;

    public FilterVenueRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Page<Venue> findVenuesByFilter(final FilterVenue filter, final Pageable pageable) {
        final String baseQuery = "SELECT v FROM Venue v";

        final Map<String, Object> parameters = new HashMap<>();
        final String filterQuery = filter.toQueryString(parameters);

        final String finalQuery = filterQuery.isEmpty() ? baseQuery : baseQuery + " WHERE " + filterQuery;

        final Query query = entityManager.createQuery(finalQuery, Venue.class);
        parameters.forEach(query::setParameter);

        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        final List<Venue> venues = query.getResultList();

        final Query countQuery = entityManager.createQuery(
                "SELECT COUNT(v) FROM Venue v" + (filterQuery.isEmpty() ? "" : " WHERE " + filterQuery)
        );

        parameters.forEach(countQuery::setParameter);

        final long count = (long) countQuery.getSingleResult();

        return new PageImpl<>(venues, pageable, count);
    }
}
