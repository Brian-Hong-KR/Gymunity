package com.gymunity.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.gymunity.common.exception.GlobalExceptionHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

	// BCryptPasswordEncoder 빈을 생성 및 구성
	// BCryptPasswordEncoder는 Spring Security에서 제공하는 비밀번호 암호화 클래스
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}// end encodePassword() 이 빈을 통해 사용자의 비밀번호를 안전하게 암호화할 수 있음
	
    @Bean
    public GlobalExceptionHandler globalExceptionHandler() {
        return new GlobalExceptionHandler();
    }

}// end ApplicationConfig()
