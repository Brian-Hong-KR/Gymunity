package com.gymunity;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@ComponentScan(basePackages = {"com.gymunity.*.service"})
@SpringBootApplication
@MapperScan("com.gymunity.*.repository")
public class GymunityApplication {

	public static void main(String[] args) {
		SpringApplication.run(GymunityApplication.class, args);
	}

}
