package com.gymunity.user.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResponse {
	// User 정보
	private String userAccountId;
	private String nickName;
	private int userId;
	private String gradeName;

	// Profile 정보
	private String userEmail;

}// end class
