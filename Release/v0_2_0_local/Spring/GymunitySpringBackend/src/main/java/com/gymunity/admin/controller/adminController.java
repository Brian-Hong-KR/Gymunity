package com.gymunity.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gymunity.admin.dto.VerifyCheckDTO;
import com.gymunity.admin.service.adminService;
import com.gymunity.challenge.dto.PhotoDTO;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class adminController {

	private final adminService adminService;
	
	// 인증사진 리스트
	@GetMapping("/admin/verify/list")
	public ResponseEntity<List<PhotoDTO>> getPhotosByResultN(){
		List<PhotoDTO> response = adminService.getPhotosByResultNProcess();
		return ResponseEntity.ok(response);
	}// end getPhotosByResultN()

	// 인증사진 확인
	@Operation(summary = "사진확인")
	@PutMapping("/admin/verify/check")
	public ResponseEntity<Object> verifyCheck(@RequestBody VerifyCheckDTO dto) {

		adminService.verifyCheckProcess(dto.getViId(), dto.getResult());
		return ResponseEntity.ok("인증확인 업데이트 되었습니다.");
	}// end verifyCheck()
	
	@GetMapping("/admin/info")
	public Map<String, Map<String, Integer>> getAllDataByWeek() {
        return adminService.getAllDataByWeek();
    }// end getAllDataByWeek()

}// end class
