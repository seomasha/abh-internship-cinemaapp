package com.abhinternship.CinemaApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EntityScan(basePackages = "com.abhinternship.CinemaApp.model")
@EnableScheduling
public class CinemaAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinemaAppApplication.class, args);
	}

}
