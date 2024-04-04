package com.gymunity.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.board.dto.ChallengeDTO;
import com.gymunity.board.dto.PageDTO;
import com.gymunity.board.service.ChallengeService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin("*")
@Slf4j
@RestController
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @Autowired
	private PageDTO pdto;
	private int currentPage;
	
	public ChallengeController() {
		
	}
	
	@Operation(summary = "챌린지 리스트", description = "챌린지 리스트 API")
    @GetMapping("/challenge/list/{currentPage}")
    public ResponseEntity<Map<String, Object>> listExecute(@PathVariable("currentPage") int currentPage) {
        Map<String, Object> map = new HashMap<>();
        int totalRecord = challengeService.countProcess();
        log.info("totalRecord:{}", totalRecord);

        if (totalRecord >= 1) {
        	
        	this.currentPage = currentPage;
			this.pdto = new PageDTO(this.currentPage, totalRecord);
			map.put("boardList", challengeService.listProcess(pdto));
			map.put("pv", this.pdto);
        }
        log.info("challengeList:{}", map.get("challengeList"));
        return ResponseEntity.ok(map);
    }
	
	@Operation(summary = "챌린지 생성", description = "챌린지 생성 API")
	@PostMapping("/challenge/create")
	public ResponseEntity<String> writeProExecute(@RequestBody ChallengeDTO dto, PageDTO pv) {
		log.info("userid:{}, title:{}", dto.getUser_id(), dto.getTitle());
		
		challengeService.insertProcess(dto);
		return ResponseEntity.ok(String.valueOf(1));
	}
	
	@Operation(summary = "챌린지 상세보기", description = "챌린지 상세보기 API")
	@GetMapping("/challenge/view/{ch_id}")
	public ResponseEntity<ChallengeDTO> viewExecute(@PathVariable("ch_id") int ch_id) {
		ChallengeDTO dto = challengeService.contentProcess(ch_id);
		return ResponseEntity.ok(dto);
	}
	
	@Operation(summary = "챌린지 수정", description = "챌린지 수정 API")
	@PutMapping("/challenge/update")
	public ResponseEntity<Object> updateExecute(ChallengeDTO dto, HttpServletRequest req) {
		log.info("ch_id:{}, title:{}", dto.getCh_id(), dto.getTitle());
		challengeService.updateProcess(dto);
		return ResponseEntity.ok(null);
	}

	@Operation(summary = "챌린지 삭제", description = "챌린지 삭제 API")
	@DeleteMapping("/challenge/delete/{ch_id}")
	public ResponseEntity<Object> deleteExecute(@PathVariable("ch_id") int ch_id) {
		challengeService.deleteProcess(ch_id);
		return ResponseEntity.ok(null);
	}
	

}