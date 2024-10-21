package com.abhinternship.CinemaApp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservation")
@Data
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "projection_id", referencedColumnName = "id")
    private Projection projectionId;

    @Column(name = "seat_no")
    private String seatNo;

    private int price;

    @Column(name = "purchase_date")
    private LocalDateTime purchaseDate;

    @Column(name = "expiry_time")
    private LocalDateTime expiryTime;

    private String status;
}
