package com.company.shop.members.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//로그인 성공 후 인증 상태 정보를 세션에 보관할 때 사용

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignResponse {

	private String memberEmail;
	private String memberName;
	private String memberPass;
	private String accessToken;
	private String refreshToken;

	public SignResponse(String memberEmail, String memberPass) {
		super();
		this.memberEmail = memberEmail;

		this.memberPass = memberPass;
	}

	public SignResponse(String memberEmail, String memberName, String memberPass) {
		super();
		this.memberEmail = memberEmail;
		this.memberName = memberName;
		this.memberPass = memberPass;
	}

}
