package com.gymunity.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDTO {
	// User 정보
	private String nickName;

	// Profile 정보
	private String userEmail;
	
	private int userId;

}// end class
