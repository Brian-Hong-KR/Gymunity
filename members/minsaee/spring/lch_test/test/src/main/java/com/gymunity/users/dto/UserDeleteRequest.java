package com.gymunity.users.dto;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDeleteRequest {

	private String userAccountId; // 사용자 계정 ID
	private String password; // 사용자 비밀번호
}
