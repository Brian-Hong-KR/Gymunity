package com.gymunity.security.config;

import javax.crypto.SecretKey;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.gymunity.redis.TokenService;
import com.gymunity.security.jwt.JwtProperties;
import com.gymunity.security.jwt.JwtProvider;
import com.gymunity.security.jwt.JwtTokenFilter;
import com.gymunity.user.serviceimpl.SigninServiceImpl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
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

	private static SecretKey key;

	@PostConstruct
	public void init() {
		this.key = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(JwtProperties.SECRET_KEY));
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
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
									log.info("userId {} " + userId);
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
