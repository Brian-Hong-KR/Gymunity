package com.test.users.dto;

public class AuthInfo {

	private String userAccountId;
	private String nickName;

	public AuthInfo() {
		// TODO Auto-generated constructor stub
	}

	public AuthInfo(String userAccountId, String nickName) {

		super();
		this.userAccountId = userAccountId;
		this.nickName = nickName;
	}

	public String getUserAccountId() {
		return userAccountId;
	}

	public String getNickName() {
		return nickName;
	}

}//end class
