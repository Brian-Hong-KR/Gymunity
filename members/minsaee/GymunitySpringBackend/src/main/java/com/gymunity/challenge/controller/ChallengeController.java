package com.gymunity.challenge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.ChallengeCreateDTO;
import com.gymunity.challenge.response.ChallengeCreateResponse;
import com.gymunity.challenge.response.ChallengeDetailResponse;
import com.gymunity.challenge.response.ChallengeJoinResponse;
import com.gymunity.challenge.service.ChallengeService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class ChallengeController {

	private final ChallengeService challengeService;
	
	// 챌린지 생성
	@Operation(summary = "챌린지 생성")
	@PostMapping("/challenge/create")
	public ResponseEntity<ChallengeCreateResponse> createChallenge(@RequestBody ChallengeCreateDTO challengeDTO) {
		// Spring Security의 Authentication 객체를 통해 현재 로그인된 사용자의 정보를 가져옴
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출

		// 챌린지 생성 로직에 userId를 전달
		ChallengeCreateResponse response = challengeService.createChallengeProcess(challengeDTO, userId);

		return ResponseEntity.ok(response);
	}// end createChallenge()
	
	// 챌린지 참가
	@Operation(summary = "챌린지 참가")
	@PostMapping("/challenge/join")
	public ResponseEntity<ChallengeJoinResponse> joinChallenge(@RequestBody int ch_id) {
		// Spring Security의 Authentication 객체를 통해 현재 로그인된 사용자의 정보를 가져옴
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출

		// 챌린지 생성 로직에 userId를 전달
//		challengeService.isMemberExists(ch_id, userId);
		ChallengeJoinResponse response = challengeService.joinChallengeProcess(ch_id, userId);

		return ResponseEntity.ok(response);
	}// end joinChallenge()

	// 챌린지 상세정보
	@Operation(summary = "챌린지 상세")
	@GetMapping("/challenge/detail/{ch_id}")
	public ResponseEntity<ChallengeDetailResponse> detailChallenge(@PathVariable("ch_id") int ch_id) {
		// Spring Security의 Authentication 객체를 통해 현재 로그인된 사용자의 정보를 가져옴
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출
		ChallengeDetailResponse response = challengeService.detailChallengeProcess(ch_id);
		return ResponseEntity.ok(response);
	}// end detailChallenge()

	// 챌린지 수정
	@Operation(summary = "챌린지 수정")
	@PutMapping("/challenge/update")
	public ResponseEntity<Object> updateChallenge(@RequestBody Challenge dto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출
		challengeService.updateChallengeProcess(dto, userId);

		return ResponseEntity.ok("챌린지가 수정되었습니다.");
	}// end updateChallenge()

	// 챌린지 삭제
	@Operation(summary = "챌린지 삭제")
	@DeleteMapping("/challenge/delete")
	public ResponseEntity<Object> deleteChallenge() {
		// Spring Security의 Authentication 객체를 통해 현재 로그인된 사용자의 정보를 가져옴
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출
		challengeService.deleteChallengeProcess(userId);
		return ResponseEntity.ok("챌린지가 삭제되었습니다.");
	}// end deleteChallenge()

}// end class
