package com.gymunity.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Survey {
	private String gender;
	private String age;
	private String goal;
	private String level;
	private String abnormal;
	private int userId;

//	// 일치여부확인
//	public boolean matches(Survey formData) {
//		return this.gender.equals(formData.getGender()) && this.age.equals(formData.getAge())
//				&& this.goal.equals(formData.getGoal()) && this.level.equals(formData.getLevel())
//				&& this.abnormal.equals(formData.getAbnormal());
//	}// end matches()

}// end class
