package com.gymunity.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChangePwdCommand {

	// 사용자의 현재 비밀번호를 저장
	private String currentPassword;
	// 사용자가 설정하려는 새로운 비밀번호를 저장
	private String newPassword;

}// end class
