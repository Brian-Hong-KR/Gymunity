package com.gymunity.challenge.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeCreateResponse {
	private String title;
	private int category;
	private String proceed;
	private String nickName;
	private String gradeName;
}// end class
