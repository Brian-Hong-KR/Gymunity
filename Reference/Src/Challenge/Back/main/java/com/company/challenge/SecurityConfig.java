//package com.company.challenge;
//
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
////[1] POSTMAN에서 테스트
////POST http://localhost:8090/login
////body, raw , json  => {"memberEmail":"min@daum.net", "memberPass":"1234"}
//
//@Configuration //환경설정 클래스 선언. 스프링에서 사용되는 Bean들의 정의 및 구성을 담당
//@EnableWebSecurity // Spring Security를 활성화
//public class SecurityConfig {
//	
////	@Autowired
////	private MembersRepository membersRepository;
////		//@bean이 선언된 메서드는 @Configuration 선언된 클래스에 안에 있어야 한다.
////	@Bean //선언된 외부 class의 메서드가 생성하고 반환하는 객체를 bean(스프링에서 컨테이너가 관리하는 객체)으로 등록
////	public BCryptPasswordEncoder encoderPwd() {
////		return new BCryptPasswordEncoder();
////		//사용자의 비밀번호를 암호화하여 저장, 로그인 시 입력 비번도 암호화하여 저장 비번과 일치하는지 비교
////	}
//
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		
//		//csrf() : Cross Site Request Forgery로 사이트간 위조 요청으로
//		// 정상적인 사용자가 의도치 않은 위조 요청을 보내는 것을 의미한다.
////		http.csrf((csrf)->csrf.disable()); -> csrf 방지
//		http.csrf().disable(); //Spring Boot 3.XX에서 권장
//		
//		//인증 사용, Security Filter에 등록 , (@CrossOrigin:인증X)
//		//세션 끄기 : JWT를 사용하기 때문에 세션을 사용하지 않는다.
//		http.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//		
////		//인증사용, security filter 등록
////		http.apply((new MyCustomerFilter()));
////		
////		//요청에 의한 인가(권한) 규칙 적용
////		http.authorizeHttpRequests(authorize->authorize
////				.requestMatchers("/","/images/**","/member/signup","/board/list/**").permitAll()
////				// -> 로그인 없이도 접근 허용
////				.anyRequest().authenticated()); // -> 그 외 모든 요청에 대해서 인증(로그인)이 되어야 한다.
//		
//		return http.build();
//	}
//	
////	public class MyCustomerFilter extends AbstractHttpConfigurer<MyCustomerFilter, HttpSecurity>{
////		
////		@Override
////		public void configure(HttpSecurity http) throws Exception {
////			AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
////			
////			//addFilter() : FilterComparator에 등록되어 있는 Filter들을 활성화할 때 사용
////			//adddFilterBefore(), addFilterAfter() : CustomFilter를 등록할 때 사용
////			
////			//인증 필터 등록
////			http.addFilter(new JwtAuthenticationFilter(authenticationManager));
////			
////			//인가 필터 등록
////			http.addFilter(new JwtAuthorizationFilter(authenticationManager, membersRepository));
////		}
////		
////	}
//	
//}
