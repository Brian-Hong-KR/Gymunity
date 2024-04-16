package com.gymunity.challenge.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Challenge {
	private int chId;
	private String title;
	private String content;
	private int category;
	private int bettingPoint;
	private String proceed;
//	private LocalDateTime registDate;
	private LocalDateTime chStartDate;
	private LocalDateTime chEndDate;
//	private int count;
	private int userId;
//	private int grade;
//	private String nickName;

}//end class
