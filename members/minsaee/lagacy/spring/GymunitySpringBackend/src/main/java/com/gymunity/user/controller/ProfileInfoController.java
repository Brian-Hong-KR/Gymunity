package com.gymunity.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.user.response.PointDetailResponse;
import com.gymunity.user.response.ProfileInfoResponse;
import com.gymunity.user.service.ProfileInfoService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class ProfileInfoController {

	private final ProfileInfoService profileInfoService;

	// 회원정보호출
	@Operation(summary = "마이페이지")
	@GetMapping("/editinfo")
	public ResponseEntity<ProfileInfoResponse> getMyPage() {
		// Spring Security의 Authentication 객체를 통해 현재 로그인된 사용자의 정보를 가져옴
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal();

		ProfileInfoResponse response = profileInfoService.getProfileInfoProcess(userId);
		return ResponseEntity.ok(response);
	}// end getMyPage()

	// 회원정보호출
	@Operation(summary = "포인트상세페이지")
	@GetMapping("/editinfo/pointdetail")
	public ResponseEntity<PointDetailResponse> getPointDetail() {
		// Spring Security의 Authentication 객체를 통해 현재 로그인된 사용자의 정보를 가져옴
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal();

		PointDetailResponse response = profileInfoService.getPointDetailProcess(userId);
		return ResponseEntity.ok(response);
	}// end getMyPage()

}// end class
