package com.gymunity.challenge.dto;

import java.time.LocalDate;

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
	private LocalDate chStartDate;
	private LocalDate chEndDate;
	private int count;
	private int userId;
	private int verifyTerm;
	private int totalDate;

}// end class
