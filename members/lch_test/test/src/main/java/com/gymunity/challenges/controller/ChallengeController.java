package com.gymunity.challenges.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.MemDTO;
import com.gymunity.challenges.dto.PageDTO;
import com.gymunity.challenges.dto.PointDTO;
import com.gymunity.challenges.dto.ProfileDTO;
import com.gymunity.challenges.file.FileUpload;
import com.gymunity.challenges.service.ChallengeService;
import com.gymunity.challenges.service.MemSerice;
import com.gymunity.challenges.service.PointService;
import com.gymunity.challenges.service.VerifyService;
import com.gymunity.users.dto.UsersDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin("*")
@Slf4j
@RestController
@RequiredArgsConstructor
public class ChallengeController {

	@Autowired
	private ChallengeService challengeService;

	@Autowired
	private MemSerice memService;

	@Autowired
	private PointService pointService;

	@Autowired
	private PageDTO pdto;
	private int currentPage;
	
//	TODO 추후 인증 정보에서 user_id 받아오기
//public ResponseEntity<Map<String, Object>> listExecute(@PathVariable("currentPage") int currentPage, 
//             @AuthenticationPrincipal Principal principal) {
//// Principal 객체에서 사용자 ID 추출
//String currentUserId = /* Extract user ID from principal */;
	int currentUserId = 81;

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
	
	@GetMapping("/challenge/detail/{ch_id}")
	public ResponseEntity<Map<String, Object>> viewExecute(@PathVariable("ch_id") int ch_id) {
		 Map<String, Object> map = new HashMap<>();
		 
		 // 챌린지 상세 정보 가져오기
		    ChallengeDTO dto = challengeService.contentProcess(ch_id);
		    map.put("challengeDetail", dto);
		    
		    List<ProfileDTO> joinList = challengeService.joinListProcess(currentUserId);
		    map.put("joinList", joinList);
		    
		    return ResponseEntity.ok(map);
		}

	@PostMapping("/challenge/create")
	public ResponseEntity<String> writeProExecute(@RequestBody ChallengeDTO dto, PageDTO pv, MemDTO mdto,
			PointDTO pdto) {
		log.info("userid:{}, title:{}", dto.getUser_id(), dto.getTitle());

		pointService.attendProcess(pdto); // 포인트 차감
		challengeService.insertProcess(dto); // 챌린지 글
		memService.insertProcess(mdto); // 멤버 등록

		return ResponseEntity.ok(String.valueOf(1));
	}

	@PutMapping("/challenge/update")
	public ResponseEntity<Object> updateExecute(ChallengeDTO dto, VerifyService vdto, HttpServletRequest req) {
		log.info("ch_id:{}, title:{}", dto.getCh_id(), dto.getTitle());
		challengeService.updateProcess(dto);		
		return ResponseEntity.ok(null);
	}

	@DeleteMapping("/challenge/delete/{ch_id}")
	public ResponseEntity<Object> deleteExecute(@PathVariable("ch_id") int ch_id) {
		int total_participants = challengeService.totalParticipantsProcess(ch_id);
		
		if (total_participants==1) {
				challengeService.deleteProcess(ch_id);
				return ResponseEntity.ok(null);
		} else {
			String message = "삭제 실패";
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
		} 
	}

}