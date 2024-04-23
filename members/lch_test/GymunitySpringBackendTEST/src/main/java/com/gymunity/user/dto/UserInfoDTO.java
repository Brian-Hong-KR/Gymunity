package com.gymunity.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoDTO {
	// User 정보
	private String userAccountId;
	private String nickName;
	private int userId;
	private String gradeName;

	// Profile 정보
	private String userEmail;

}// end class
