package com.gymunity.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.redis.TokenService;
import com.gymunity.security.jwt.JwtProperties;
import com.gymunity.security.jwt.JwtProvider;
import com.gymunity.user.dto.CheckUserIdPassword;
import com.gymunity.user.dto.User;
import com.gymunity.user.response.SigninResponse;
import com.gymunity.user.service.SigninService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class SigninController {

	private final SigninService signinService;
	private final TokenService tokenService;

	@Operation(summary = "로그인")
	@PostMapping(value = "/user/signin")
	public ResponseEntity<SigninResponse> signin(@RequestBody CheckUserIdPassword checkUserIdPassword) {
		SigninResponse signinResponse = signinService.processSignIn(checkUserIdPassword.getUserAccountId(),
				checkUserIdPassword.getPassword());
		return ResponseEntity.ok(signinResponse);
	}// end signin()

}// end class
