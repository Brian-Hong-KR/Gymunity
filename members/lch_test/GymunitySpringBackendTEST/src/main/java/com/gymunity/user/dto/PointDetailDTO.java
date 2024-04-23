package com.gymunity.user.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointDetailDTO {
	
	private String type;
	private int points;
	private String reason;
	private LocalDateTime time;

}// end class
