package com.gymunity.challenges.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
		
		pointService.attendProcess(pdto);		// 포인트 차감
		challengeService.insertProcess(dto); // 챌린지 글
		memService.insertProcess(mdto);		// 멤버 등록
		
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