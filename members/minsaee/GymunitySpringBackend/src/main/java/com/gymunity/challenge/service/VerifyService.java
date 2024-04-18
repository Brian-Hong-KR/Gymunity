package com.gymunity.challenge.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface VerifyService {
	
	// 인증이미지저장
	public String verifysaveFileProcess(int userId, int chId, MultipartFile file) throws IOException;
	
	public void verifyUploadProcess(int userId, int chId, MultipartFile file);

}
