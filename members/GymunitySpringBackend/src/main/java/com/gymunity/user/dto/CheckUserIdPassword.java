package com.gymunity.user.dto;

import com.gymunity.user.entity.Profile;
import com.gymunity.user.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckUserIdPassword {

	private String userAccountId;
	private String password;

	// toEntity
	public User toUserEntity() {
		User user = new User();
		user.setUserAccountId(this.userAccountId);
		return user;
	}// end toUserEntity()

	public Profile toProfileEntity() {
		Profile profile = new Profile();
		profile.setPassword(this.password);
		return profile;
	}// end toProfileEntity()
}// end class
