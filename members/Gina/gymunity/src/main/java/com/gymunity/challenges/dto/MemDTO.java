package com.gymunity.challenges.dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemDTO {
	private int member_id, reward_point, mem_user_id, mem_grade_id, mem_ch_id;
	private float archive_rate;
	private char registrant;
	
	
	
}