package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "projection_id", referencedColumnName = "id")
    private Projection projectionId;

    private String seatNo;

    private int price;

    private Date purchaseDate;

    private LocalDate date;

    private String status;
}
