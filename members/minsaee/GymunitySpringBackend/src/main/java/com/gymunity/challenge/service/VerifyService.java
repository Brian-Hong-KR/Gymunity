package com.gymunity.challenge.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.gymunity.challenge.dto.PhotoDTO;

public interface VerifyService {
	
	// 인증이미지저장
	public String verifysaveFileProcess(int userId, int chId, MultipartFile file) throws IOException;
	
	public void verifyUploadProcess(int userId, int chId, MultipartFile file);
	
	public List<PhotoDTO> getPhotosByUserId(int userId);

}// end interface
