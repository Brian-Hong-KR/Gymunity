package com.company.challenge;

import java.util.HashMap;
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
	private PageDTO pgdto;
	
	private int currentPage;
	
	public ChallengeController() {
	}
	
	@GetMapping("/challenge/list/{currentPage}")
	public ResponseEntity<Map<String, Object>> listExecute(@PathVariable("currentPage") int currentPage) {
		Map<String, Object> map = new HashMap<>();
		int totalRecord = challengeService.countProcess();
		log.info("totalRecord:{}", totalRecord);

		if (totalRecord >= 1) {
			this.currentPage = currentPage;
			this.pgdto=new PageDTO(this.currentPage, totalRecord);
			//-> : 총 페이지 계산 시 사용기 위해 넘김
			
			map.put("challengeList", challengeService.listProcess(pgdto));
			map.put("pv", this.pgdto);
		}
		log.info("challengeList:{}", map.get("challengeList"));
		return ResponseEntity.ok(map);
	}
	
	@PostMapping("/challenge/create")
	public ResponseEntity<String> writeProExecute(@RequestBody ChallengeDTO dto, PageDTO pv) {
		log.info("userid:{}, title:{}", dto.getUser_id(), dto.getTitle());
		
		challengeService.insertProcess(dto);
		return ResponseEntity.ok(String.valueOf(1));
	}
	
	@GetMapping("/challenge/view/{ch_id}")
	public ResponseEntity<ChallengeDTO> viewExecute(@PathVariable("ch_id") int ch_id) {
		ChallengeDTO dto = challengeService.contentProcess(ch_id);
		return ResponseEntity.ok(dto);
	}
	
	@PutMapping("/challenge/update")
	public ResponseEntity<Object> updateExecute(ChallengeDTO dto, HttpServletRequest req) {
		log.info("ch_id:{}, title:{}", dto.getCh_id(), dto.getTitle());
		challengeService.updateProcess(dto);
		return ResponseEntity.ok(null);
	}

	@DeleteMapping("/challenge/delete/{ch_id}")
	public ResponseEntity<Object> deleteExecute(@PathVariable("ch_id") int ch_id) {
		challengeService.deleteProcess(ch_id);
		return ResponseEntity.ok(null);
	}
	

}
