package com.codehelp.ccodehelp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.codehelp.ccodehelp.repository")
public class CcodehelpApplication {

    public static void main(String[] args) {

        System.out.println("DB_HOST = " + System.getenv("DB_HOST"));
        System.out.println("DB_PORT = " + System.getenv("DB_PORT"));
        System.out.println("DB_NAME = " + System.getenv("DB_NAME"));
        System.out.println("DB_USERNAME = " + System.getenv("DB_USERNAME"));
        System.out.println("DB_SSL_MODE = " + System.getenv("DB_SSL_MODE"));
        System.out.println("PORT = " + System.getenv("PORT"));

        SpringApplication.run(CcodehelpApplication.class, args);
    }
}