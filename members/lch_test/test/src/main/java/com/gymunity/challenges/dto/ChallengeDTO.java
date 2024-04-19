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
	private int user_id, ch_id, category, 
	betting_point, count, verify_term, challenge_period;
	private String title, content, proceed, nick_name, grade_name;
	private Date regist_date;
	private LocalDate ch_start_date, ch_end_date;
	private char admin_yn;
	
}