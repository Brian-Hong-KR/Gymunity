package com.test.users.dto;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.test.common.exception.WrongEmailPasswordException;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsersDTO {
	private String userAccountId; // 유저가 직접 사용하는 ID
	private String nickName; // 유저가 직접 사용하는 별명
	private String password; // 유저가 직접 사용하는 비밀번호
	private String userEmail; // 유저의 이메일
	private String admin_yn = "n";
	private LocalDateTime lastLogin;
	private int userId;

	// 비밀번호 일치 확인
//	public boolean matchPassword(String password) {
//		return this.password.equals(password);
//	}// end matchPassword()

	// 비밀번호 확인 메서드 수정
	public boolean matchPassword(String rawPassword) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder.matches(rawPassword, this.password); // this.password는 암호화된 비밀번호
	}

	public void changePassword(String oldPassword, String newPassword) {
		if (!this.password.equals(oldPassword))
			throw new WrongEmailPasswordException("비밀번호 불일치");
		this.password = newPassword;
	}
}