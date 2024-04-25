package com.gymunity.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupDTO {
	// User 정보
	private String userAccountId;
	private String nickName;
	private int userId;

	// Profile 정보
	private String password;
	private String userEmail;

	// Survey 정보
	private String gender;
	private String age;
	private String goal;
	private String level;
	private String abnormal;

}// end class
