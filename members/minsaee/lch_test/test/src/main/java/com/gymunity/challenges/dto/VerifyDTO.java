package com.gymunity.challenges.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyDTO {
	
	private int vi_id, vi_user_id, vi_ch_id, userId, chId;
	
	private String result;
	
	private String upload1,upload2;
	
	//form페이지에서 파일첨부를 받아 처리해주는 멤버변수
	private MultipartFile filename;
	
	

}
