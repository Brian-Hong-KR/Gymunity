package com.gymunity.user.response;

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
public class SigninResponse {

	private String userAccountId;
	private String nickName;
	private String userEmail;
	private String accessToken;
	private String refreshToken;

	public SigninResponse(String nickName, String userEmail) {
		super();
		this.nickName = nickName;
		this.userEmail = userEmail;
	}

	public SigninResponse(String userAccountId, String nickName, String userEmail) {
		super();
		this.userAccountId = userAccountId;
		this.nickName = nickName;
		this.userEmail = userEmail;
	}// end LoginResponse()

}// end class
