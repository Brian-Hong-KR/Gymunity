package com.gymunity.challenge.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeCreateDTO {
	// Challenge 정보
	private String title;
	private String content;
	private int category;
	private int bettingPoint;
	private String chStartDate;
	private String chEndDate;

}//end class
