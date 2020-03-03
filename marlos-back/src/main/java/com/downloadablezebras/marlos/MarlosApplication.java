package com.downloadablezebras.marlos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class MarlosApplication {

    public static void main(String[] args) {
        SpringApplication.run(MarlosApplication.class, args);
    }

}
