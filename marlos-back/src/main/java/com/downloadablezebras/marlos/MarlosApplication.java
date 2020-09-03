package com.downloadablezebras.marlos;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class MarlosApplication {
    public static final Logger LOGGER=LoggerFactory.getLogger(MarlosApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(MarlosApplication.class, args);
    }
}
