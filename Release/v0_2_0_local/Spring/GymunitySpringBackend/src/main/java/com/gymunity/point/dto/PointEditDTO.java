package com.gymunity.point.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointEditDTO {
	private int points;
	private String reason;
	private LocalDateTime time;
}
