package com.gymunity.challenge.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.gymunity.challenge.controller.ChallengeController;
import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.ProfileDTO;
import com.gymunity.challenge.dto.PageDTO;
import com.gymunity.security.config.CustomUserDetails;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin("*")
@Slf4j
@RestController
@RequiredArgsConstructor
public class ChallengeController {

	private final ChallengeService challengeService;
	
	@Autowired
	private PageDTO pdto;
	private int currentPage;

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
	
	int currentUserId = 81;
	// 챌린지 리스트 조회
	@GetMapping("/challenge/list/{currentPage}")
	public ResponseEntity<Map<String, Object>> listExecute(@PathVariable("currentPage") int currentPage) {
		Map<String, Object> map = new HashMap<>();
		int totalRecord = challengeService.countProcess();
		
		log.info("totalRecord:{}", totalRecord);
		
		if (totalRecord >= 1) {
			this.currentPage = currentPage;
			this.pdto = new PageDTO(this.currentPage, totalRecord);
			map.put("pv", this.pdto);
			map.put("challengeList", challengeService.listProcess(pdto));
		}
		map.put("joinList",challengeService.joinListProcess(currentUserId));
    
		log.info("challengeList:{}", map.get("challengeList"));
		log.info("joinList:{}", map.get("joinList"));
		return ResponseEntity.ok(map);
	}

	// 챌린지 참가
	@Operation(summary = "챌린지 참가")
	@PostMapping("/challenge/join")
	public ResponseEntity<ChallengeJoinResponse> joinChallenge(@RequestBody int chId) {
		// Spring Security의 Authentication 객체를 통해 현재 로그인된 사용자의 정보를 가져옴
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출

		ChallengeJoinResponse response = challengeService.joinChallengeProcess(chId, userId);

		return ResponseEntity.ok(response);
	}// end joinChallenge()

	// 챌린지 상세정보
	@Operation(summary = "챌린지 상세")
	@GetMapping("/challenge/detail/{chId}")
	public ResponseEntity<Map<String, Object>> detailChallenge(@PathVariable("chId") int chId) {
		// Spring Security의 Authentication 객체를 통해 현재 로그인된 사용자의 정보를 가져옴
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출
		 Map<String, Object> map = new HashMap<>();
		 
		 // 챌린지 상세 정보 가져오기
		    Challenge challenge = challengeService.detailChallengeProcess(chId);
		    map.put("challengeDetail", challenge);
		    
		    List<ProfileDTO> joinList = challengeService.joinListProcess(currentUserId);
		    map.put("joinList", joinList);
		    
		    return ResponseEntity.ok(map);
		
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
