package com.gymunity.challenge.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.challenge.dto.Challenge;
import com.gymunity.challenge.dto.ChallengeCreateDTO;
import com.gymunity.challenge.response.ChallengeCreateResponse;
import com.gymunity.challenge.service.ChallengeService;
import com.gymunity.security.config.CustomUserDetails;
import com.gymunity.security.jwt.JwtProvider;
import com.gymunity.challenge.controller.ChallengeController;
import com.gymunity.challenge.dto.ProfileDTO;
import com.gymunity.challenge.dto.PageDTO;

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

	// 챌린지 리스트 조회
   @Operation(summary = "챌린지 리스트 조회")
	@GetMapping("/challenge/list/{currentPage}")
	public ResponseEntity<Map<String, Object>> listExecute(@PathVariable("currentPage") int currentPage) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출
		log.info("list_userId :{}", userId);
		
		Map<String, Object> map = new HashMap<>();
		int totalRecord = challengeService.countProcess();
		log.info("totalRecord:{}", totalRecord);

		if (totalRecord >= 1) {
			this.currentPage = currentPage;
			this.pdto = new PageDTO(this.currentPage, totalRecord);
			map.put("pv", this.pdto);
			map.put("challengeList", challengeService.listProcess(pdto));
		}
		
		if (userId != 0) {
			map.put("joinList", challengeService.joinListProcess(userId));
		}
		log.info("challengeList:{}", map.get("challengeList"));
		log.info("joinList:{}", map.get("joinList"));
		return ResponseEntity.ok(map);
	}
	
	// 챌린지 상세정보
	@Operation(summary = "챌린지 상세")
	@GetMapping("/challenge/detail/{chId}")
	public ResponseEntity<Map<String, Object>> detailChallenge(@PathVariable("chId") int chId) {
		Map<String, Object> map = new HashMap<>();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출

		// 챌린지 상세 정보 가져오기
		Challenge challenge = challengeService.detailChallengeProcess(chId);
		map.put("challengeDetail", challenge);

		List<ProfileDTO> joinChIdList = challengeService.joinChIdListProcess(userId);
		map.put("joinChIdList", joinChIdList);

		return ResponseEntity.ok(map);
	}// end detailChallenge()

	// 챌린지 생성
	@Operation(summary = "챌린지 생성")
	@PostMapping("/challenge/create")
	public ResponseEntity<ChallengeCreateResponse> createChallenge(@RequestBody ChallengeCreateDTO challengeDTO) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출
		// 챌린지 생성 로직에 userId를 전달
		ChallengeCreateResponse response = challengeService.createChallengeProcess(challengeDTO, userId);
		
		
		return ResponseEntity.ok(response);
	}// end createChallenge()

	// 챌린지 참가
	@Operation(summary = "챌린지 참가")
	@PostMapping("/challenge/join/{chId}")
//	public ResponseEntity<Object> joinChallenge(@RequestBody int chId) {
	public ResponseEntity<String> joinChallenge(@PathVariable("chId") int chId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출
		challengeService.joinChallengeProcess(chId, userId);
//		log.info("challengeList:{}", map.get("challengeList"));
		return ResponseEntity.ok("챌린지가 참여되었습니다.");
	}// end joinChallenge()

	// 챌린지 삭제
	@Operation(summary = "챌린지 삭제")
	@DeleteMapping("/challenge/delete/{chId}")
	public ResponseEntity<Object> deleteChallenge(@PathVariable("chId") int chId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출
		challengeService.deleteChallengeProcess(chId, userId);
		return ResponseEntity.ok("챌린지가 삭제되었습니다.");
	}// end deleteChallenge()
	
	
	// 챌린지 proceed 상태 업데이트 및 챌린지 종료
    @Scheduled(cron = "0 0 0 * * *") // 매일 자정마다 실행
    public void checkAndUpdateChallengeProceedStatus() {
    	challengeService.updateProceedProcess(); // 챌린지 업데이트
    }

}// end class
