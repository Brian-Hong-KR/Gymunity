package com.gymunity.challenge.dto;

import java.time.LocalDateTime;

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
	private String preceed;
	private LocalDateTime chStartDate;
	private LocalDateTime chEndDate;
	private int userId;
	
	// Member 정보
	private double archiveRate;
	private String registrant;

}//end class
