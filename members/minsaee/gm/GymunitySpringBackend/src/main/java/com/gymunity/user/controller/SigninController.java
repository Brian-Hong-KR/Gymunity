package com.gymunity.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.common.exception.AccountInactiveException;
import com.gymunity.user.dto.CheckUserIdPassword;
import com.gymunity.user.response.SigninResponse;
import com.gymunity.user.service.SigninService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class SigninController {

	private final SigninService signinService;

	@Operation(summary = "로그인")
	@PostMapping(value = "/user/signin")
	public ResponseEntity<?> signin(@RequestBody CheckUserIdPassword checkUserIdPassword) {
		try {
			SigninResponse signinResponse = signinService.processSignIn(checkUserIdPassword.getUserAccountId(),
					checkUserIdPassword.getPassword());
			return ResponseEntity.ok(signinResponse);
		} catch (AccountInactiveException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		} catch (UsernameNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
		}
	}// end signin()
}// end class
