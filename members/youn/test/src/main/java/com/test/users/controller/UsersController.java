package com.test.users.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.test.redis.TokenService;
import com.test.security.jwt.JwtProperties;
import com.test.security.jwt.JwtProvider;
import com.test.users.dto.SignResponse;
import com.test.users.dto.Survey;
import com.test.users.dto.UserDeleteRequest;
import com.test.users.dto.UsersDTO;
import com.test.users.service.PlanService;
import com.test.users.service.UsersService;

import io.swagger.v3.oas.annotations.Operation;
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

	private final PlanService planService;
	

	// 회원가입
	@Operation(summary = "회원가입", description = "회원가입 API")
	@PostMapping("/user/signup")
	public ResponseEntity<SignResponse> addUser(@RequestBody UsersDTO usersDTO) {
		log.info("유저DTO:{}:", usersDTO);

		// 비밀번호 암호화
		usersDTO.setPassword(encodePassword.encode(usersDTO.getPassword()));

		// 회원 정보 등록
		SignResponse authInfo = usersService.addUserProcess(usersDTO);

		return ResponseEntity.ok(authInfo);
	} // end addUser()

	// 로그인
	@Operation(summary = "로그인", description = "로그인 API")
	@PostMapping(value = "/user/login")
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
				.nickName(udto.getNickName()).accessToken(accessToken).refreshToken(refreshToken).build();

		return ResponseEntity.ok(signResponse);
	}// end signin()

	// 회원정보 가져오기
	@GetMapping("/user/editinfo/{userAccountId}")
	public ResponseEntity<UsersDTO> getuser(@PathVariable("userAccountId") String userAccountId) {
		return ResponseEntity.ok(usersService.viewUserProcess(userAccountId));
	}

	// 회원정보 수정
	@Operation(summary = "회원정보 수정", description = "회원정보 수정 API")
	@PutMapping("/user/update")
	public ResponseEntity<SignResponse> updateUser(@RequestBody UsersDTO usersDTO) {
	    // 변경된 비밀번호가 있다면 암호화하여 저장
	    if (usersDTO.getPassword() != null && !usersDTO.getPassword().isEmpty()) {
	        String hashedPassword = encodePassword.encode(usersDTO.getPassword());
	        usersDTO.setPassword(hashedPassword);
	    }
	    
	    return ResponseEntity.ok(usersService.updateMemberProcess(usersDTO));
	}

	// 회원탈퇴
	@Operation(summary = "회원탈퇴", description = "회원탈퇴 API")
	@DeleteMapping("/user/delete")
	public ResponseEntity<?> deleteUser(@RequestBody UserDeleteRequest request) {
		if (usersService.authenticateUser(request)) {
			usersService.deleteUserByAccountId(request.getUserAccountId());
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	// 일치하는 설문조사 클라이언트에 반환        
	@Operation(summary = "설문조사")
	@PostMapping("/survey")
	public List<Survey> getPlan(@RequestBody Survey formData) throws IOException{
		return planService.findMatchingPlans(formData);
	}

} // end class
