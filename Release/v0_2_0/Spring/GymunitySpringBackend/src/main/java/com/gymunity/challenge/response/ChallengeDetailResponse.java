package com.gymunity.challenge.response;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeDetailResponse {
//	private int chId;
	private String title;
	private String content;
	private int category;
	private int bettingPoint;
	private String proceed;
//	private LocalDateTime registDate;
	private String chStartDate;
	private String chEndDate;
	private int count;
//	private int userId;
//	private int grade;
//	private String nickName;

}//end class
