package com.gymunity.user.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.user.dto.Survey;
import com.gymunity.user.response.PlanResponse;
import com.gymunity.user.service.PlanService;
import com.gymunity.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class PlanController {
	private final PlanService planService;

	// 일치하는 설문조사 클라이언트에 반환
	@Operation(summary = "설문조사")
	@PostMapping("/survey")
	public List<PlanResponse> getPlan(@RequestBody Survey formData) throws IOException {
		return planService.findMatchingPlans(formData);
	}// end getPlan()
	
	
}// end class
