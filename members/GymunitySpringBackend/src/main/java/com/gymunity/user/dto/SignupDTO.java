package com.gymunity.user.dto;

import com.gymunity.user.entity.Profile;
import com.gymunity.user.entity.Survey;
import com.gymunity.user.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupDTO {
	// User 정보
	private String userAccountId;
	private String nickName;

	// Profile 정보
	private String password;
	private String userEmail;

	// Survey 정보
	private String gender;
	private String age;
	private String goal;
	private String level;
	private String abnormal;

	// toEntity
	public User toUserEntity() {
		User user = new User();

		user.setUserAccountId(this.userAccountId);
		user.setNickName(this.nickName);

		return user;
	}// end toUserEntity()

	public Profile toProfileEntity(int userId) {
		Profile profile = new Profile();

		profile.setUserId(userId);
		profile.setPassword(this.password);
		profile.setUserEmail(this.userEmail);

		return profile;
	}// end toProfileEntity()

	public Survey toSurveyEntity(int userId) {
		Survey survey = new Survey();

		survey.setGender(this.gender);
		survey.setAge(this.age);
		survey.setGoal(this.goal);
		survey.setLevel(this.level);
		survey.setAbnormal(this.abnormal);

		return survey;
	}// end toSurveyEntity()

}// end class
