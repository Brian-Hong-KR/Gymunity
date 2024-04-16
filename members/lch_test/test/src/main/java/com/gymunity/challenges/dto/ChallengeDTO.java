package com.gymunity.challenges.dto;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.gymunity.challenges.repository.ChallengeRepository;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ChallengeDTO {
	private int user_id, ch_id, grade_id, category, 
	betting_point, total_participants, count, userId;
	private String title, content, proceed;
	private Date regist_date;
	
	private LocalDate ch_start_date, ch_end_date;

	


}