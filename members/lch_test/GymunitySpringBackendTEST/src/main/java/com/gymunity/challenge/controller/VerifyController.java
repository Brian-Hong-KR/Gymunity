package com.gymunity.challenge.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gymunity.challenge.dto.PhotoDTO;
import com.gymunity.challenge.service.VerifyService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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
	}// end extractUserId()

	// 인증사진업로드
	@Operation(summary = "인증사진 업로드")
	@PostMapping(value = "/verify/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//	public ResponseEntity<String> verifyUpload(@RequestParam("chId") int chId, @RequestPart("file") MultipartFile file,
//			HttpServletRequest req, HttpSession session)
	public ResponseEntity<String> verifyUpload(@RequestParam("chId") int chId,
			@RequestParam("file") MultipartFile file) {

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
			return ResponseEntity.internalServerError().body("Error uploading file.");
		}
	}// end verifyUpload()

	@Operation(summary = "사진첩")
	@GetMapping(value = "/photo")
	public ResponseEntity<List<PhotoDTO>> getPhotosByUserId() {
		// 인증 정보에서 사용자 ID 추출
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = extractUserId(authentication);

		List<PhotoDTO> photos = verifyService.getPhotosByUserId(userId);
		return ResponseEntity.ok(photos);
	}// end getPhotosByUserId()

	// 사진첩 삭제
	@Operation(summary = "사진첩 삭제")
	@DeleteMapping("/photo/delete")
	public ResponseEntity<?> deletePhoto(@RequestParam("photoPath") String photoPath) {
		// Spring Security의 Authentication 객체를 통해 현재 로그인된 사용자의 정보를 가져옴
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Integer userId = (Integer) authentication.getPrincipal(); // 사용자 ID 추출
		verifyService.deletePhotoProcess(photoPath, userId);
		return ResponseEntity.ok("사진이 삭제되었습니다.");
	}// end deleteChallenge()
}// end class
