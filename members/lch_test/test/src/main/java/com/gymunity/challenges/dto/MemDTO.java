package com.gymunity.challenges.dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemDTO {
	private int member_id, reward_point, mem_user_id, mem_grade_id, mem_ch_id, user_id;
	private float archive_rate;
	private char registrant;
	
	 public static MemDTO getMemDTO() {
	        MemDTO memDTO = new MemDTO();
	        // MemDTO를 초기화하는 코드 작성
	        return memDTO;
	    }
	
}
