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

	private final ChallengeService challengeService;

//	// 챌린지생성
//	@Operation(summary = "챌린지생성")
//	@PostMapping("/challenges/create")
//	public ResponseEntity<?> createChallenge(@RequestBody ChallengeCreateDTO challengeDTO) {
//
//		challengeService.createChallengeProcess(challengeDTO);
//
//		return ResponseEntity.ok("1");
//
//	}// end createChallenge()

	// 챌린지 생성
	@Operation(summary = "챌린지 생성")
	@PostMapping("/challenges/create")
	public ResponseEntity<?> createChallenge(@RequestBody ChallengeCreateDTO challengeDTO) {
		// Spring Security의 Authentication 객체를 통해 현재 로그인된 사용자의 정보를 가져옴
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출

		// 챌린지 생성 로직에 userId를 전달
		challengeService.createChallengeProcess(challengeDTO, userId);

		return ResponseEntity.ok("챌린지가 생성되었습니다.");
	}

}// end class
