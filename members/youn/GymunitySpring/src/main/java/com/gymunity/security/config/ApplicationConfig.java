package com.gymunity.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;


// Spring Security 설정을 위한 구성 클래스
@Configuration // 이 클래스를 스프링 구성 클래스로 지정
@RequiredArgsConstructor // Lombok 라이브러리를 사용하여 필요한 생성자를 자동 생성
public class ApplicationConfig {
	
	// BCryptPasswordEncoder 빈을 생성 및 구성
	// BCryptPasswordEncoder는 Spring Security에서 제공하는 비밀번호 암호화 클래스
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}// end encodePassword() 이 빈을 통해 사용자의 비밀번호를 안전하게 암호화할 수 있음

}
