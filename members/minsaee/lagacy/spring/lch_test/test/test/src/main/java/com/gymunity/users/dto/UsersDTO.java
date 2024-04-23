package com.gymunity.users.dto;

import com.gymunity.common.exception.WrongEmailPasswordException;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsersDTO {
	private String userAccountId; // 유저가 직접 사용하는 ID
	private String nickname; // 유저가 직접 사용하는 별명
	private String password; // 유저가 직접 사용하는 비밀번호
	private String userEmail; // 유저의 이메일
	private String userName; // 유저의 이름
	private String admin_yn = "n";
	private int userId;

	// 비밀번호 일치 확인
	public boolean matchPassword(String password) {
		return this.password.equals(password);
	}// end matchPassword()

	public void changePassword(String oldPassword, String newPassword) {
		if (!this.password.equals(oldPassword))
			throw new WrongEmailPasswordException("비밀번호 불일치");
		this.password = newPassword;
	}
}