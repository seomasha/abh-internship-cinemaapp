package com.abhinternship.CinemaApp.repository;

import com.abhinternship.CinemaApp.model.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallRepository extends JpaRepository<Hall, Long> {
}
