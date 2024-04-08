package com.test.users.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Survey {

	private int userId;
	private String gender;
	private String age;
	private String goal;
	private String level;
	private String abnormal;

	@JsonProperty("plan_name")
	private String planName;

	@JsonProperty("plan_desc")
	private String planDesc;

	// 일치 여부를 확인하는 메서드
	public boolean matches(Survey formData) {
		return this.gender.equals(formData.getGender()) && this.age.equals(formData.getAge())
				&& this.goal.equals(formData.getGoal()) && this.level.equals(formData.getLevel())
				&& this.abnormal.equals(formData.getAbnormal());
	}

}
