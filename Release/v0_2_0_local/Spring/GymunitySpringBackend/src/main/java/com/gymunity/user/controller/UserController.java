package com.gymunity.user.controller;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.user.dto.CheckUserIdPassword;
import com.gymunity.user.dto.CustomerDTO;
import com.gymunity.user.dto.SignupDTO;
import com.gymunity.user.dto.UserInfoDTO;
import com.gymunity.user.dto.UserUpdateDTO;
import com.gymunity.user.response.CustomerDetailResponse;
import com.gymunity.user.response.CustomerResponse;
import com.gymunity.user.response.SigninResponse;
import com.gymunity.user.response.SignupResponse;
import com.gymunity.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	
	// 유입자
	@PostMapping("/submissions")
	public void submissions() {
		userService.newVisitProcess();
	}

	// 회원가입
	@Operation(summary = "회원가입")
	@PostMapping("/user/signup")
	public ResponseEntity<SignupResponse> signupUser(@RequestBody SignupDTO dto) {
		SignupResponse signup = userService.signupProcess(dto);
		return ResponseEntity.ok(signup);
	}// end signupUser()

	// 회원정보호출
	@Operation(summary = "회원정보호출")
	@GetMapping("/user/editinfo/{userAccountId}")
	public ResponseEntity<UserInfoDTO> getUser(@PathVariable("userAccountId") String userAccountId) {
		UserInfoDTO userInfoDTO = userService.userInfoProcess(userAccountId);
		return ResponseEntity.ok(userInfoDTO);
	}
	
	@GetMapping("/checkUsername/{userAccountId}")
	 public ResponseEntity<String> checkUsername(@PathVariable("userAccountId")String userAccountId) {
		try {
	        // 아이디 중복 확인을 위해 UserService의 메서드 호출
	        boolean isExists = userService.isUserAccountIdExists(userAccountId);
	        
	        if (isExists) {
	            // 아이디가 이미 존재하는 경우
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디입니다.");
	        } else {
	            // 아이디가 존재하지 않는 경우
	            return ResponseEntity.ok("사용할 수 있는 아이디입니다.");
	        }
	    } catch (Exception e) {
	        // 예외 발생 시
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
	    }
	 
       
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
	
	// 고객 문의
	@Operation(summary = "고객 문의")
	@PostMapping("/user/inquiries")
	public ResponseEntity<CustomerResponse> createCustomer(@RequestBody CustomerDTO dto){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal();
		
		LocalDate now = LocalDate.now();

        // Customer 객체에 현재 시간 설정
        dto.setInquiryDate(now);
        
		CustomerResponse response = userService.insertCustomerProcess(dto, userId);
		return ResponseEntity.ok(response);
	}
	
	@Operation(summary = "고객 문의 리스트")
	@GetMapping("/user/inquirieslist")
	public ResponseEntity<CustomerDetailResponse> getCsList(){
		
		CustomerDetailResponse response = userService.getCustomerProcess();
		
		return ResponseEntity.ok(response);
	}

}// end class