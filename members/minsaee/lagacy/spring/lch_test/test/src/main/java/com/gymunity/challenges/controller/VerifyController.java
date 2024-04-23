package com.gymunity.challenges.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gymunity.challenges.dto.ChallengeDTO;
import com.gymunity.challenges.dto.VerifyDTO;
import com.gymunity.challenges.file.FileUpload;
import com.gymunity.challenges.service.VerifyService;

import io.lettuce.core.dynamic.annotation.Param;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin("*")
@Slf4j
@RestController
@RequiredArgsConstructor
public class VerifyController {

	@Autowired
	private VerifyService verifyService;

	@Value("${spring.servlet.multipart.location}")
	private String filePath;

	@PostMapping(value = "/challenge/verify", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> verifyProExecute(VerifyDTO dto,
			@Parameter(description = "첨부파일") @RequestPart(value = "filename", required = false) MultipartFile filename) {
		MultipartFile file = dto.getFilename();
		log.info("file:{}", file.getOriginalFilename());

		if (file != null && !file.isEmpty()) {
			UUID random = FileUpload.saveCopyFile(file, filePath);
			dto.setUpload1(random + "_" + file.getOriginalFilename());
		}

		verifyService.verifyProcess(dto); // 인증
		verifyService.updateMemProcess(dto); // 성공률
		return ResponseEntity.ok(String.valueOf(1));
	}

}
