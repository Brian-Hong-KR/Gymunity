package com.gymunity.test.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestListDTO {
	
	// users 정보
	private String nickName;
	private String gradeName;
	
	// challenges 정보
	private String title;
	private int category;
	private int bettingPoint;
	private String proceed;
	private int verifyTerm;
	private int challengePeriod;
	private int count;
	
}// end class
