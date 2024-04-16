package com.gymunity.challenge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.challenge.dto.ChallengeCreateDTO;
import com.gymunity.challenge.service.ChallengeService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class ChallengeController {
	
	// 챌린지생성
	@Operation(summary = "챌린지생성")
	@PostMapping("/challenges/create")
	public ResponseEntity<?> createChallenge(@RequestBody ChallengeCreateDTO challengeDTO) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    if (authentication != null && authentication.isAuthenticated()) {
	    	UserDetails userDetails = (UserDetails) authentication.getPrincipal();
	        String userId = userDetails.getUsername();  // 사용자 ID 가져오기

	        challengeDTO.setUserId(userId);  // DTO에 userId 설정
	        ChallengeService.createChallengeProcess(challengeDTO);  // 서비스 메서드 호출
	        return ResponseEntity.ok("Challenge created successfully");
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
	    }
	}

}//end class
