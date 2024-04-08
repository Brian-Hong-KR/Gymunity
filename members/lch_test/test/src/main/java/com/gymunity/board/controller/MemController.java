package com.gymunity.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.board.dto.MemDTO;
import com.gymunity.board.dto.PointDTO;
import com.gymunity.board.service.MemSerice;
import com.gymunity.board.service.PointService;

import lombok.extern.slf4j.Slf4j;	

@CrossOrigin("*")
@Slf4j
@RestController
public class MemController {
	
	@Autowired
	private MemSerice memService;
	
	@Autowired
	private PointService pointService;
	
	public MemController() {
		
	}
	
	// 챌린지 참가
	@PostMapping("/mem/attend")
	public ResponseEntity<String> writeProExecute(@RequestBody MemDTO dto, PointDTO pdto){
		log.info("userid:{}, ch_id:{}", dto.getMem_user_id(), dto.getMem_ch_id());
		memService.attendProcess(dto);
		pointService.attendProcess(pdto);
		return ResponseEntity.ok(String.valueOf(1));
	}
	

}
