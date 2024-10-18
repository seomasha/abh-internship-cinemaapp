package com.abhinternship.CinemaApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.abhinternship.CinemaApp.model")
public class CinemaAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinemaAppApplication.class, args);
	}

}
