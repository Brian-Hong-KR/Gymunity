package com.gymunity.security.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.gymunity.board.repository.ChallengeRepository;
import com.gymunity.board.service.ChallengeService;
import com.gymunity.board.service.ChallengeServiceImp;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@MapperScan("com.gymunity.*.mapper")
public class ApplicationConfig {
	
	@Bean
	public BCryptPasswordEncoder encodePassword() {
		return new BCryptPasswordEncoder();
	}
//	
//    @Bean
//    public ChallengeServiceImp challengeService(ChallengeRepository challengeRepository) {
//        return new ChallengeServiceImp();
//    }
}
