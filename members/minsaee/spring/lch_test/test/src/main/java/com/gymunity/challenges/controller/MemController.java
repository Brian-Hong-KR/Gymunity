package com.gymunity.challenges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.MemDTO;
import com.gymunity.challenges.dto.PointDTO;
import com.gymunity.challenges.service.ChallengeService;
import com.gymunity.challenges.service.MemSerice;
import com.gymunity.challenges.service.PointService;
import com.gymunity.users.dto.UsersDTO;

import lombok.extern.slf4j.Slf4j;	

@CrossOrigin("*")
@Slf4j
@RestController
public class MemController {
	
	@Autowired
	private MemSerice memService;
	
	@Autowired
	private PointService pointService;
	
	@Autowired
	private ChallengeService challengeService;
	
	public MemController() {
		
	}
	
	// 챌린지 참가
	@PostMapping("/mem/attend/{ch_id}")
	public ResponseEntity<String> writeProExecute(@RequestBody MemDTO dto, PointDTO pdto, ChallengeDTO cdto){
		log.info("userid:{}, ch_id:{}", dto.getMem_user_id(), dto.getMem_ch_id());
		memService.attendProcess(dto); // 챌린지 참가 멤버 등록
		pointService.attendProcess(pdto);	// 포인트 차감
		challengeService.countChProcess(cdto);
		return ResponseEntity.ok(String.valueOf(1));
	}
	
	// 챌린지 보상 (마감이랑 합쳐야함)
	@PostMapping("/mem/reward/{ch_id}")
	public ResponseEntity<String> rewardExecute(@RequestBody PointDTO pdto){
		log.info("Processing reward for user {} and challenge {}", pdto.getMem_user_id(), pdto.getMem_ch_id());
		log.info("rate {} and total {}", pdto.getArchiveRate(), pdto.getBattingPoint());
		pointService.rewardProcess(pdto);
		return ResponseEntity.ok(String.valueOf(1));
	}
}
