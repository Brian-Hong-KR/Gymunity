package com.company.shop.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.company.shop.members.repository.MembersRepository;
import com.company.shop.security.jwt.JwtAuthenticationFilter;
//[1] POSTMAN에서 테스트
//POST http://localhost:8090/login
//body, raw , json  => {"memberEmail":"qhhh1@daum.net", "memberPass":"1231"}
import com.company.shop.security.jwt.JwtAuthorizationFilter;

// 해당 클래스 Configuration으로 등록
@Configuration

//Spring Security가 Spring FileChain에 등록함 (즉 스프링 시큐리티를 활성화함)
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private MembersRepository membersRepository;

	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		// csrf() : Cross Site Request Forgery로 사이트간 위조 요청으로 정상적인 사용자가 의도치 않은 위조 요청을 보내는
		// 것을 의미한다.

		// http.csrf((csrf) -> csrf.disable());
		http.csrf(AbstractHttpConfigurer::disable); // Spring Boot 3.xx부터 권장

		// 인증사용, Security Filter에 등록 , @CrossOrigin (인증X)
		// JWT를 사용하기 때문에 session기능을 off
		// 세션끄기 : JWT를 사용하기 때문에 세션을 사용하지 않는다.
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		// 인증과 인가를 사용, Security Filter에 등록
		http.apply(new MyCustomerFilter());

		// 요청에 의한 인가(권한) 검사 시작
		http.authorizeHttpRequests(authorize -> authorize
				// Matcher에 대해서만 permitAll()
				.requestMatchers("/", "/images/**", "/member/signup", "/board/list/**").permitAll()
				// 그 외 모든 요청에 대해서 인증(로그인)이 되어야 함.
				.anyRequest().authenticated());
//				.anyRequest().permitAll());

		return http.build();
	}

	public class MyCustomerFilter extends AbstractHttpConfigurer<MyCustomerFilter, HttpSecurity> {

		@Override
		public void configure(HttpSecurity http) throws Exception {
			AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);

			// addFilter() : FilterComparator에 등록되어 있는 Filter들을 활성화할 때 사용
			// adddFilterBefore(), addFilterAfter() : CustomFilter를 등록할 때 사용

			// 인증 필터 등록
			http.addFilter(new JwtAuthenticationFilter(authenticationManager));

			// 인가 필터 등록
			http.addFilter(new JwtAuthorizationFilter(authenticationManager, membersRepository));

		}

	}
}// end class
