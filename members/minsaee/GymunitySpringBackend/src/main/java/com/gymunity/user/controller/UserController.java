package com.gymunity.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.point.service.PointService;
import com.gymunity.user.dto.CheckUserIdPassword;
import com.gymunity.user.dto.Profile;
import com.gymunity.user.dto.SignupDTO;
import com.gymunity.user.dto.User;
import com.gymunity.user.dto.UserUpdateDTO;
import com.gymunity.user.response.SigninResponse;
import com.gymunity.user.response.SignupResponse;
import com.gymunity.user.service.SigninService;
import com.gymunity.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final PointService pointService;
	private final SigninService signinService;
	private final BCryptPasswordEncoder encodePassword;

	// 회원가입
	@Operation(summary = "회원가입")
	@PostMapping("/user/signup")
	public ResponseEntity<SignupResponse> signupUser(@RequestBody SignupDTO dto) {
		SignupResponse signup = userService.signupProcess(dto);
		return ResponseEntity.ok(signup);
	}// end signupUser()

	// 회원정보호출
	@GetMapping("/user/editinfo/{userAccountId}")
	public ResponseEntity<User> getUser(@PathVariable("userAccountId") String userAccountId) {
		return ResponseEntity.ok(signinService.processSignIn(userAccountId));
	}

	// 회원정보수정
	@Operation(summary = "회원정보수정")
	@PutMapping("/user/update")
	public ResponseEntity<SigninResponse> updateUser(@RequestBody UserUpdateDTO dto) {
		SigninResponse update = userService.updateUserProcess(dto);
		return ResponseEntity.ok(update);
	}// end updateUser()

	// 회원탈퇴
	@Operation(summary = "회원탈퇴")
	@DeleteMapping("/user/delete")
	public ResponseEntity<?> deleteUser(@RequestBody CheckUserIdPassword dto) {

		if (userService.validateUserIdPassword(dto)) {
			userService.deleteUserProcess(dto.getUserAccountId());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}// end deleteUser()

}// end class
