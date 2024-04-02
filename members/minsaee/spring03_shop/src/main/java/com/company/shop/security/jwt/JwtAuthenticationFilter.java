package com.company.shop.security.jwt;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.company.shop.members.dto.MembersDTO;
import com.company.shop.security.service.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

// Authentication(인증)
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private AuthenticationManager authManager;
	private Authentication authentication;

	public JwtAuthenticationFilter(AuthenticationManager authManager) {
		this.authManager = authManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("JwtAuthenticationFilter => login 요청 처리를 시작함");

		try {
			// JSON 가져오는지 확인
//			BufferedReader br = request.getReader();
//			String input = null;
//			while ((input = br.readLine()) != null)
//				System.out.println(input);

			ObjectMapper om = new ObjectMapper();

			// 스트림을 통해서 읽어온 JSON 데이터를 MembersDTO JAVA 객체화
			MembersDTO membersDTO = om.readValue(request.getInputStream(), MembersDTO.class);
			log.info("memberEmail:{}, memberPass:{}", membersDTO.getMemberEmail(), membersDTO.getMemberPass());

			// Tokenizer
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					membersDTO.getMemberEmail(), membersDTO.getMemberPass());

			authentication = authManager.authenticate(authenticationToken);

			log.info("authentication: {}", authentication.getDetails());
			log.info("authentication: {}", authentication.getPrincipal());

			PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
			log.info("로그인 완료됨 (인증) : {}, {}", principalDetails.getUsername(), principalDetails.getPassword());

		} catch (IOException e) {
			e.printStackTrace();
		}
		return authentication;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {

		log.info("successfulAuthentication 실행됨");

		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

		String jwtToken = JWT.create().withSubject("mycors")
				// 만료시간
				.withExpiresAt(new Date(System.currentTimeMillis() + (60 * 60 * 1000 * 1L)))
				// 토큰처리 할 거 가져오기
				.withClaim("memberPass", principalDetails.getPassword())
				.withClaim("memberEmail", principalDetails.getUsername())
				// HS512
				.sign(Algorithm.HMAC512("mySecurityCos"));

		log.info("jwtToken: {}", jwtToken);

		// response 응답헤더에 jwtToken 추가
		response.addHeader("Authorization", "Bearer " + jwtToken);

		final Map<String, Object> body = new HashMap<>();
		body.put("memberName", principalDetails.getMembersDTO().getMemberName());
		body.put("memberEmail", principalDetails.getMembersDTO().getMemberEmail());

		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(response.getOutputStream(), body);
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		System.out.println("unsuccessfulAuthentication 실행됨");
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("code", HttpStatus.UNAUTHORIZED.value());
		body.put("error", failed.getMessage());

		new ObjectMapper().writeValue(response.getOutputStream(), body);
	}
}// end class
