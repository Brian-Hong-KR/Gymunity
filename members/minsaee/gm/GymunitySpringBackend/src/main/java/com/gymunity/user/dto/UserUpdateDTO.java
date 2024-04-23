package com.gymunity.user.dto;

import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDTO {
	// User 정보
	private String nickName;

	// Profile 정보
	private String userEmail;
	private String password;
	
	private int userId;

	 // 비밀번호 암호화 메서드
    public void encryptPassword(String plainPassword, PasswordEncoder passwordEncoder) {
        if (plainPassword != null && !plainPassword.isEmpty()) {
            String hashedPassword = passwordEncoder.encode(plainPassword);
            this.password = hashedPassword;
        }
    }
}// end class
