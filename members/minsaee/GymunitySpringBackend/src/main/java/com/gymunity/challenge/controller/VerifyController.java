package com.gymunity.challenge.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gymunity.challenge.service.VerifyService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class VerifyController {

	private final VerifyService verifyService;

	// 인증 정보에서 userId 가져오기
	private Integer extractUserId(Authentication authentication) {
		if (authentication != null && authentication.getPrincipal() instanceof Integer) {
			return (Integer) authentication.getPrincipal();
		}
		return null;
	}

	// 인증사진업로드
	@Operation(summary = "인증사진 업로드")
	@PostMapping(value = "/verify/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> verifyUpload(@RequestParam("chId") int chId, @RequestPart("file") MultipartFile file,
			HttpServletRequest req, HttpSession session) {

		if (file.isEmpty()) {
			return ResponseEntity.badRequest().body("No file uploaded.");
		}

		// 인증 정보에서 사용자 ID 추출
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = extractUserId(authentication);

		if (userId == null) {
			return ResponseEntity.badRequest().body("User not authenticated.");
		}

		// 파일 업로드 요청을 서비스 계층으로 위임
		try {
			verifyService.verifyUploadProcess(userId, chId, file);
			return ResponseEntity.ok("File uploaded successfully!");
		} catch (IllegalStateException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		} catch (Exception e) {
			log.error("File upload error", e); // 로깅 추가
			return ResponseEntity.internalServerError().body("Error uploading file.");
		}
	}
}
// end class
