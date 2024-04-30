package com.gymunity.security.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.gymunity.redis.TokenService;
import com.gymunity.security.jwt.JwtProvider;
import com.gymunity.security.jwt.JwtTokenFilter;
import com.gymunity.user.serviceimpl.SigninServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

	private final SigninServiceImpl signinServiceImpl;
	private final TokenService tokenService;

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true); // 쿠키나 인증을 사용하는 요청 허용
		config.addAllowedOrigin("http://192.168.0.20:3000"); // 프론트엔드 서버 주소 명시
		config.addAllowedHeader("*"); // 모든 헤더 허용
		config.addAllowedMethod("*"); // 모든 HTTP 메소드 허용
		config.setExposedHeaders(Arrays.asList("Authorization", "Authorization-refresh"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config); // 모든 경로에 대해 CORS 설정 적용
		return source;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.cors() // CORS 설정 활성화
				.and()

				// csrf() : Cross Site Request Forgery로 사이트간 위조 요청으로 사용자가 위조 요청을 보내는 것을
				// 의미한다.(정상적인 사용자가 의도치 않게)
				// http.csrf((csrf) -> csrf.disable());
				.csrf(AbstractHttpConfigurer::disable) // Spting Boot 3.XX에서 권장

				// 인증사용, Security Filter에 등록 , @CrossOrigin (인증X)
				// 세션끄기 : JWT를 사용하기 때문에 세션을 사용하지 않는다.
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				// 인증사용, Security Filter에 등록
				// http.apply(new MyCustomerFilter());
				.addFilterBefore(new JwtTokenFilter(signinServiceImpl), UsernamePasswordAuthenticationFilter.class)

				.authorizeHttpRequests(
						authorize -> authorize.requestMatchers("/admin/**").hasRole("ADMIN").anyRequest().permitAll())

				// 로그아웃
				.logout(logout -> logout.logoutUrl("/user/logout").invalidateHttpSession(true).clearAuthentication(true)
						.logoutSuccessHandler((request, response, authentication) -> {
							// 로그아웃 성공 시 처리 로직
							String accessToken = request.getHeader("Authorization");
							if (accessToken != null) {
								String token = accessToken.split(" ")[1];
								try {
									int userId = JwtProvider.getUserId(token);
									tokenService.deleteTokens(userId);
								} catch (Exception e) {
									log.error("Error parsing JWT: " + e.getMessage());
								}
							}
							response.setStatus(HttpServletResponse.SC_OK);
						}))
				.exceptionHandling(exceptionHandling -> exceptionHandling
						.authenticationEntryPoint((request, response, authException) -> {
							// 인증 실패 시 처리 로직
						}));

		return http.build();
	}

}// end class

// 요청에 의한 인가(권한)검사 시작
//		http.authorizeHttpRequests(authorize -> authorize
//				.requestMatchers("/", "/images/**", "/member/signup", "/member/login", "/board/list/**",
//						"/swagger-ui/**", "/v3/api-docs/**")
//				.permitAll() // 로그인 없이접근 허용한다.
//				.anyRequest().authenticated()); // 그외 모든 요청에 대해서 인증(로그인)이 되어야 한다.
