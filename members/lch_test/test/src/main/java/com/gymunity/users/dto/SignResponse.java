package com.gymunity.users.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignResponse {

	private String userAccountId;
	private String nickName;
	private String userEmail;
	private String accessToken;
	private String refreshToken;

	public SignResponse(String userAccountId, String nickName) {
		super();
		this.userAccountId = userAccountId;
		this.nickName = nickName;
	}
	
//	public SignResponse(String nickName, String userEmail) {
//		super();
//		this.nickName = nickName;
//		this.userEmail = userEmail;
//	}

}
