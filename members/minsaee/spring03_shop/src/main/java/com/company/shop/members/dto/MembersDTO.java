package com.company.shop.members.dto;

import com.company.shop.common.exception.WrongEmailPasswordException;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MembersDTO {
	private String memberEmail;
	private String memberPass;
	private String memberName;
	private String memberPhone;
	private int memberType = 1;
	private String authRole;

	public boolean matchPassword(String memberPass) {
		return this.memberPass.equals(memberPass);
	}// end matchPassword()

	public void changePassword(String oldPassword, String newPassword) {
		if (!this.memberPass.equals(oldPassword))
			throw new WrongEmailPasswordException("비밀번호 불일치");
		this.memberPass = newPassword;
	}// end changePassword()

}// end MembersDTO()
