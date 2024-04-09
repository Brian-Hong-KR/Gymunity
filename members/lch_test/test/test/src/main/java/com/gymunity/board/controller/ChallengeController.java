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
import com.gymunity.board.dto.MemDTO;
import com.gymunity.board.dto.PageDTO;
import com.gymunity.board.dto.PointDTO;
import com.gymunity.board.service.ChallengeService;
import com.gymunity.board.service.MemSerice;
import com.gymunity.board.service.PointService;

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
	private MemSerice memService;
    
    @Autowired
   	private PointService pointService;

    @Autowired
	private PageDTO pdto;
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
			this.pdto = new PageDTO(this.currentPage, totalRecord);
			map.put("boardList", challengeService.listProcess(pdto));
			map.put("pv", this.pdto);
        }
        log.info("challengeList:{}", map.get("challengeList"));
        return ResponseEntity.ok(map);
    }
	
	@PostMapping("/challenge/create")
	public ResponseEntity<String> writeProExecute(@RequestBody ChallengeDTO dto, PageDTO pv, MemDTO mdto, PointDTO pdto) {
		log.info("userid:{}, title:{}", dto.getUser_id(), dto.getTitle());
		pointService.attendProcess(pdto);
		challengeService.insertProcess(dto);
		memService.insertProcess(mdto);
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