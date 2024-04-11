package com.gymunity.challenges.dto;

import java.sql.Date;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointDTO {
	private int point_subtract_id, points_subtracted, user_id;
	private String reason;
	private Date subtracted_at;
	

	
}