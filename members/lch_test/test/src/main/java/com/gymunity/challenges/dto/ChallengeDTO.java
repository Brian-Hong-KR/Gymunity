package com.gymunity.challenges.dto;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ChallengeDTO {
	private int user_id, ch_id, grade_id, category, 
	batting_point, total_participants, vi_id, vi_user_id, vi_ch_id, count;
	private String title, content, proceed, result;
	private Date regist_date;
	
	private LocalDate ch_start_date, ch_end_date;
	private String upload1,upload2;
	
	//form페이지에서 파일첨부를 받아 처리해주는 멤버변수
	private MultipartFile filename;

	


}