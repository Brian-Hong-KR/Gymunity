package com.gymunity.challenges.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.challenges.dto.PointDTO;
import com.gymunity.challenges.service.TestService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class TestController {
 
	private final TestService testService;
	// 리워드업데이트
		@Operation(summary = "리워드")
		@PutMapping("/challenge/reward/{mem_id}")
		public ResponseEntity<PointDTO> test(@PathVariable("mem_id") int mem_id) {
			PointDTO test = testService.testprocess(mem_id);
			return ResponseEntity.ok(test);
		}// end updateUser()
}
