package com.test.users.dto;

// 사용자의 비밀번호 변경 과정에서 사용되는 데이터 전송 객체(Data Transfer Object, DTO)
public class ChangePwdCommand {

	// 사용자의 현재 비밀번호를 저장
	private String currentPassword;

	// 사용자가 설정하려는 새로운 비밀번호를 저장
	private String newPassword;

	// 생성자에서 특별한 초기화 작업을 수행하지 않는 경우에도, Java의 빈 생성자는 객체를 생성하는 데 필요
	public ChangePwdCommand() {

	}

	// 현재 비밀번호를 반환
	public String getCurrentPassword() {
		return currentPassword;
	}

	// 현재 비밀번호를 설정
	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}

	// 새로운 비밀번호를 반환
	public String getNewPassword() {
		return newPassword;
	}

	// 새로운 비밀번호를 설정
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

}
