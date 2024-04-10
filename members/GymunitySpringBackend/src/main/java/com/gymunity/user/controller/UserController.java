package com.gymunity.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.point.service.PointService;
import com.gymunity.user.dto.CheckUserIdPassword;
import com.gymunity.user.dto.SignupDTO;
import com.gymunity.user.dto.UserUpdateDTO;
import com.gymunity.user.entity.Profile;
import com.gymunity.user.entity.User;
import com.gymunity.user.response.SigninResponse;
import com.gymunity.user.response.SignupResponse;
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
	private final BCryptPasswordEncoder encodePassword;

	// 회원가입
	@Operation(summary = "회원가입")
	@PostMapping("/user/signup")
	public ResponseEntity<SignupResponse> signupUser(@RequestBody SignupDTO dto) {
		User user = dto.toUserEntity();
		Profile profile = dto.toProfileEntity(user.getUserId());

		// 비밀번호 암호화
		String encodedPassword = encodePassword.encode(profile.getPassword());
		profile.setPassword(encodedPassword);

		// 회원정보등록
		SignupResponse signup = userService.signupProcess(dto);

		// 회원포인트업데이트
		pointService.addOrUpdatePointsAggr(user.getUserId());

		return ResponseEntity.ok(signup);
	}// end signupUser()

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
