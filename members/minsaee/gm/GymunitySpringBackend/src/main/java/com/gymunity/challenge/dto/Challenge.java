package com.gymunity.challenge.dto;

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
	private String chStartDate;
	private String chEndDate;
	private int challenge_period;
	private int verifyTerm;
	private int count;
	private int userId;
	private String nick_name;
	private String  grade_name;
	private char admin_yn;
	private int totalDate;

}// end class
