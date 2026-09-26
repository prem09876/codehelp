package com.codehelp.ccodehelp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.codehelp.ccodehelp.repository")
public class CcodehelpApplication {

    public static void main(String[] args) {
        SpringApplication.run(CcodehelpApplication.class, args);
    }
}