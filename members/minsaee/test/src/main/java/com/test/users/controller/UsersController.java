package com.test.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
	private UsersService usersService;
	
//	private TokenService tokenService;
	
	@Autowired
	private BCryptPasswordEncoder encodePassword;
	
	
	// 회원가입 처리
	@PostMapping("/user/signip")
	public ResponseEntity<SignResponse> addmember(@RequestBody UsersDTO usersDTO){
		log.info("유저DTO:{}:", usersDTO);
		
		// 비밀번호 암호화
		usersDTO.setPassword(encodePassword.encode(usersDTO.getPassword()));
		
		// 회원 정보 등록
		SignResponse authInfo = usersService.addUserProcess(usersDTO);
		
		return ResponseEntity.ok(authInfo);
	}

}
