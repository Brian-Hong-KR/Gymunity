package com.gymunity.challenges.dto;

import java.sql.Date;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PointDTO {
	private int point_subtract_id, points_subtracted, user_id, points_added, mem_user_id, mem_ch_id, member_id;
	private String reason, added_reason;
	private Date subtracted_at, added_at;
	

	
}