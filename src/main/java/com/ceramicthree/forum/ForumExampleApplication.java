package com.ceramicthree.forum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ForumExampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(ForumExampleApplication.class, args);
	}

}
