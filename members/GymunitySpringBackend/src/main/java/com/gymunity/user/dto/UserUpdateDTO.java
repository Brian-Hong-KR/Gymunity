package com.gymunity.user.dto;

import com.gymunity.user.entity.Profile;
import com.gymunity.user.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDTO {
	// User 정보
	private String nickName;

	// Profile 정보
	private String userEmail;

	// toEntity
	public User toUserEntity() {
		User user = new User();
		user.setNickName(this.nickName);
		return user;
	}// end toUserEntity()

	public Profile toProfileEntity(int userId) {
		Profile profile = new Profile();
		profile.setUserEmail(this.userEmail);
		return profile;
	}// end toProfileEntity()

}// end class
