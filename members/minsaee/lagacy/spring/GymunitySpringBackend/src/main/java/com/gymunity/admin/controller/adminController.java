package com.gymunity.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.admin.dto.VerifyCheckDTO;
import com.gymunity.admin.service.adminService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class adminController {

	private final adminService adminService;

	// 인증사진 확인
	@Operation(summary = "사진확인")
	@PutMapping("/admin/verify/check")
	public ResponseEntity<Object> verifyCheck(@RequestBody VerifyCheckDTO dto) {

		adminService.verifyCheckProcess(dto.getViId(), dto.getResult());
		return ResponseEntity.ok("인증확인 업데이트 되었습니다.");
	}// end verifyCheck()

}// end class