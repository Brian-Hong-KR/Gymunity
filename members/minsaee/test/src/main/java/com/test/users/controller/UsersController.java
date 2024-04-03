package com.test.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.test.redis.TokenService;
import com.test.security.jwt.JwtProperties;
import com.test.security.jwt.JwtProvider;
import com.test.users.dto.SignResponse;
import com.test.users.dto.UsersDTO;
import com.test.users.service.UsersService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin("*")
@Slf4j
@RestController
@RequiredArgsConstructor
public class UsersController {

	@Autowired
	private final UsersService usersService;

	private final TokenService tokenService;

	@Autowired
	private final BCryptPasswordEncoder encodePassword;

	// 회원가입 처리
	@PostMapping("/user/signip")
	public ResponseEntity<SignResponse> addmember(@RequestBody UsersDTO usersDTO) {
		log.info("유저DTO:{}:", usersDTO);

		// 비밀번호 암호화
		usersDTO.setPassword(encodePassword.encode(usersDTO.getPassword()));

		// 회원 정보 등록
		SignResponse authInfo = usersService.addUserProcess(usersDTO);

		return ResponseEntity.ok(authInfo);
	} // end addmember()

	@PostMapping(value = "/member/login")
	public ResponseEntity<SignResponse> signin(@RequestBody UsersDTO usersDTO) throws Exception {
		String accessToken = JwtProperties.TOKEN_PREFIX + JwtProvider.createAccessToken(usersDTO.getUserAccountId());
		String refreshToken = JwtProvider.createRefreshToken(usersDTO.getUserAccountId());

		System.out.println("accessToken:" + accessToken);
		System.out.println("refreshToken" + refreshToken);

		// MySQL DB 조회
		UsersDTO udto = usersService.viewUserProcess(usersDTO.getUserAccountId());

		// Redis DB 저장
		tokenService.saveTokens(udto.getUserAccountId(), accessToken, refreshToken);

		SignResponse signResponse = SignResponse.builder().userAccountId(udto.getUserAccountId())
				.userAccountId(udto.getUserAccountId()).accessToken(accessToken).refreshToken(refreshToken).build();

		return ResponseEntity.ok(signResponse);
	}// end signin()

} // end class
